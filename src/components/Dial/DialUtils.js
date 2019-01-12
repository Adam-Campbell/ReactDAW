/**
 * Calculate an angle based off of the x and y coords of the midpoint of the dial and the x and y coords
 * of an event. 
 * @param {Object} optionsObject 
 * @param {Number} optionsObject.clientX - the x coord of the event that fired
 * @param {Number} optionsObject.clientY - the y coord of the event that fired
 * @param {Object} optionsObject.dialNodeRect - the bounding client rect of the dial node in the DOM.
 * @returns {Number} - the calculated angle.
 */
export const calculateAngle = (optionsObject) => {
    const {
        clientX, 
        clientY, 
        dialNodeRect
    } = optionsObject;
    // Destructure the boundingClientRect to get the necessary properties.
    const { top, left, width, height } = dialNodeRect;
    // Use the client rect informatin to determine x and y coords for midpoint of dial node.
    const midX = left + (width/2);
    const midY = top + (height/2);
    // Determine the length of opposite and adjacent sides and use inverse tan to determine the angle,
    // convert from radians to degrees.
    const deltaX = clientX - midX;
    const deltaY = midY - clientY;
    const angleAs180 = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    // Math.atan2 only uses 180deg, both negative and positive. Convert this into standard 360 degrees and
    // return the result.
    const angleAs360 = angleAs180 < 0 ? 360 + angleAs180 : angleAs180;
    return angleAs360;
}

/**
 * Subtracts subtrahend from minuend, but constrains result of the subtraction to the 0 - 360 range. If the
 * subtraction operation results in a figure less than 0, instead of becoming negative it starts subtracting 
 * from 360 instead. So subtracting 70 from 60 will give a result of 350.
 * @param {number} minuend - the number being subtracted from
 * @param {number} subtrahend - the number that is being subtracted
 * @returns {number} - the result of subtracting subtrahend from minuend and constraining to the 0-360 range.
 */
export const subtractWith360Constraint = (minuend, subtrahend) => {
    return minuend - subtrahend >= 0 ?
           minuend - subtrahend :
           360 + (minuend - subtrahend);
};

/**
 * Takes the dials current angle, its start offset and its range, and adjusts them such that the end of the 
 * dials range is 0 (the positive x axis), the start of the dials range is some positive number > 0 && < 360,
 * and the dials angle is adjusted such that it remains the same in proportion to the new adjusted range.
 * @param {Number} angle - the current dial angle 
 * @param {Number} startOffset - the dials start offset
 * @param {Number} range - the dials total range
 */
export const adjustFigures = (angle, startOffset, range) => {
    const end = subtractWith360Constraint(startOffset, range);
    const adjustedStartOffset = subtractWith360Constraint(startOffset, end);
    const adjustedAngle = subtractWith360Constraint(angle, end);
    return {
        adjustedStart: adjustedStartOffset,
        adjustedEnd: 0,
        adjustedAngle
    };
};

/**
 * Returns true if the supplied angle falls within the allowed range of the dial, else returns false.
 * @param {Number} angle - the dials angle
 * @param {Number} startOffset - the start offset
 * @param {Number} range - the dials total range
 */
export const checkIfAngleAllowed = (angle, startOffset, range) => {
    if (range === 360) return true;
    const {
        adjustedStart, 
        adjustedEnd,
        adjustedAngle
    } = adjustFigures(angle, startOffset, range);
    return adjustedAngle <= adjustedStart && adjustedAngle >= adjustedEnd;
}

/**
 * Takes the current angle of the dial, and maps that to a point within the data range controlled by the 
 * dial.
 * @param {Object} optionsObject 
 * @param {Number} optionsObject.dialAngle - the current angle of the dial.
 * @param {Number} optionsObject.dialStartOffset - the start offset of the dial.
 * @param {Number} optionsObject.dialRange - the total range of allowed movement for the dial.
 * @param {Number} optionsObject.dataMin - the minimum value in the data range controlled by the dial.
 * @param {Number} optionsObject.dataMax - the maximum value in the data range controlled by the dial.
 */
export const mapAngleToPointInDataRange = (optionsObject) => {
    const { 
        dialAngle, 
        dialStartOffset, 
        dialRange, 
        dataMin, 
        dataMax 
    } = optionsObject;
    const { 
        adjustedStart, 
        adjustedEnd, 
        adjustedAngle 
    } = adjustFigures(dialAngle, dialStartOffset, dialRange);
    // Convert the dials angle to a decimal representing its location within the dials range.
    const dialProgressDecimal = (adjustedStart - adjustedAngle) / adjustedStart;
    // Determine the data range.
    const dataRange = dataMax - dataMin;
    // Map the decimal value to a point within the data range.
    return dataMin + (dataRange * dialProgressDecimal);
};

/**
 * Takes an incoming value and converts it into a position for the dial to render. 
 * @param {Object} optionsObject 
 * @param {Number} optionsObject.value - current value of the datapoint that the dial controls.
 * @param {Number} optionsObject.dataMin - the minimum value of the datarange
 * @param {Number} optionsObject.dataMax - the maximum value of the datarange
 * @param {Number} optionsObject.dialStartOffset - the offset value for the start of the dial controls range
 * of movement.
 * @param {Number} optionsObject.dialRange - the dial controls range of movement
 * @returns {Number} - a new position for the dial to be rendered at. 
 */
export const convertIncomingValueToDialPosition = (optionsObject) => {
    const {
        value,
        dataMin,
        dataMax,
        dialStartOffset,
        dialRange
    } = optionsObject;

    // Derive data range from the max and min points, and get values position within that range
    // as a decimal.
    const dataRange = dataMax - dataMin;
    const valueAsDecimal = value / dataRange;
    // Map the decimal value to a point within the dials range, and using the dials start offset, 
    // determine the correct position for the dial.
    const progressWithinDialRange = dialRange * valueAsDecimal;
    const dialPosition = subtractWith360Constraint(dialStartOffset, progressWithinDialRange);
    return dialPosition;
};

/**
 * Takes a value and 'snaps' it to steps of a specified size.
 * @param {Object} optionsObject 
 * @param {Number} optionsObject.value - the value to adjust.
 * @param {Number} optionsObject.stepSize - the size of the steps to snap the value to.
 * @param {Number} optionsObject.dataMin - the minimum value of the data range controlled by the dial.
 * @param {Number} optionsObject.dataMax - the maximum value of the data range controlled by the dial.
 * @returns {Number} - the adjusted value.
 */
export const snapValueToSteps = (optionsObject) => {
    const { 
        value, 
        stepSize, 
        dataMin, 
        dataMax
     } = optionsObject;
     const numberOfSteps = Math.round(value / stepSize);
     const adjustedValue = stepSize * numberOfSteps;
     return Math.max(Math.min(dataMax, adjustedValue), dataMin);
};