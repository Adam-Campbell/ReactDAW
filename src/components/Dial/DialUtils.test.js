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