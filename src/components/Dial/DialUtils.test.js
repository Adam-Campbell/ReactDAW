import {
    calculateAngle,
    subtractWith360Constraint,
    adjustFigures,
    mapAngleToPointInDataRange,
    convertIncomingValueToDialPosition,
    snapValueToSteps
} from './DialUtils';

describe('calculateAngle', () => {
    test('takes a set of inputs and converts them into an angle', () => {
        expect(calculateAngle({
            clientX: 50,
            clientY: 30,
            dialNodeRect: { top: 30, left: 30, width: 40, height: 40 }
        })).toBe(90);
    });
    test(`an event occuring along the positive x-axis relative to the center of the dial 
          will yield an angle of 0 degrees`, 
        () => {
            expect(calculateAngle({
                clientX: 60,
                clientY: 50,
                dialNodeRect: { top: 30, left: 30, width: 40, height: 40 }
            })).toBe(0);
    });
    test(`events that occur beyond the 180 degree point will return results in the 180 - 360 degree 
          range, rather than 0 to negative 180 as would normally be expected with Math.atan2`, 
        () => {
            expect(calculateAngle({
                clientX: 50,
                clientY: 60,
                dialNodeRect: { top: 30, left: 30, width: 40, height: 40 }
            })).toBe(270);
    });
});

describe('subtractWith360Constraint', () => {
    test('if the subtraction results in a non negative number, it just returns the result', () => {
        expect(subtractWith360Constraint(180, 90)).toBe(90);
        expect(subtractWith360Constraint(45, 45)).toBe(0);
    });
    test(`if the subtraction goes below 0, the absolute value of the remainder that is left after 0 is 
          reached is subtracted from 360 degrees and the result is returned`, 
        () => {
            expect(subtractWith360Constraint(45, 90)).toBe(315);
    });
});

describe('adjustFigures', () => {
    test('the adjustedEnd will always be 0', () => {
        expect(adjustFigures(135, 180, 90).adjustedEnd).toBe(0);
    });
    test(`if the end of the range will hit 0 (the positive x-axis) before the start of the range will hit 0,
          when moving the points clockwise, adjust all points by the amount required to move the end of the 
          range to 0`, 
        () => {
            expect(adjustFigures(135, 180, 90)).toEqual({
                adjustedStart: 90,
                adjustedEnd: 0,
                adjustedAngle: 45
            });
    });
    test(`even if the start of the range will hit 0 before the end of the range does, when moving the points
          clockwise, all points will still be adjusted by the amount required to move the end of the range to
          0, not the start of the range`, 
        () => {
            expect(adjustFigures(180, 225, 270)).toEqual({
                adjustedStart: 270,
                adjustedEnd: 0,
                adjustedAngle: 225
            });
    });
});

describe('mapAngleToPointInDataRange', () => {
    test(`if the angle falls outside of the dials range, but is closer to the start of the dials range
          than the end, then the function returns the minimum value from the data range`,
        () => {
            expect(mapAngleToPointInDataRange({
                dialAngle: 190,
                dialStartOffset: 180,
                dialRange: 180,
                dataMin: 0,
                dataMax: 100
            })).toBe(0);
    });
    test(`if the angle falls outside of the dials range, but is closer to the end of the dials range
          than the start, then the function returns the maximum value from the data range`,
        () => {
            expect(mapAngleToPointInDataRange({
                dialAngle: 350,
                dialStartOffset: 180,
                dialRange: 180,
                dataMin: 0,
                dataMax: 100
            })).toBe(100)
    });
    test(`if the angle falls within the dials range, then the function returns a value from the data
          range that is proportional to the angles position within the dials range`, 
        () => {
            expect(mapAngleToPointInDataRange({
                dialAngle: 90,
                dialStartOffset: 180,
                dialRange: 180,
                dataMin: 0,
                dataMax: 100
            })).toBe(50)
    });
});

describe('convertIncomingValueToDialPosition', () => {
    test(`calculates the current values position with the data range as a decimal, and returns
          an angle from the dials range corresponding with that decimal`, 
        () => {
            expect(convertIncomingValueToDialPosition({
                value: 50,
                dataMin: 0,
                dataMax: 100,
                dialStartOffset: 180,
                dialRange: 180
            })).toBe(90)
    });
});

describe('snapValueToSteps', () => {
    test(`snaps the value to some multiple of a predefined step value, either rounding up or
          down depending on which is closer`, 
        () => {
            expect(snapValueToSteps({
                value: 12,
                stepSize: 5,
                dataMin: 0,
                dataMax: 25
            })).toBe(10)
            expect(snapValueToSteps({
                value: 13,
                stepSize: 5,
                dataMin: 0,
                dataMax: 25
            })).toBe(15)
    });
    test(`if the rounding would cause a value to be returned that is higher than the accepted value
          range, then the maximum value from the accepted range is returned instead`, 
        () => {
            expect(snapValueToSteps({
                value: 56,
                stepSize: 10,
                dataMin: 27,
                dataMax: 57
            })).toBe(57)
    });
    test(`if the rounding would cause a value to be returned that is lower than the accepted value
          range, then the minimum value from the accepted range is returned instead`, 
        () => {
            expect(snapValueToSteps({
                value: 23,
                stepSize: 10,
                dataMin: 22,
                dataMax: 52
            })).toBe(22)
    });
});