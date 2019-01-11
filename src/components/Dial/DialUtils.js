/**
 * Calculate the midpoint of a DOM element, based off of its x (left) and y (top) positions, and its width
 * and height. The names used within the function are the same as the names provided by getBoundingClientRect, 
 * so you can either pass in a manually constructed object with these properties, or simply pass in the result
 * of calling getBoundingClientRect on the element. 
 * @param {number} top - the top offset of the element
 * @param {number} left - the left offset of the element
 * @param {number} width - the width of the element
 * @param {number} height - the height of the element
 * @returns {object} - an object with midX and midY properties, describing the x and y coords of the midpoint of
 * the element.
 */
export const calculateMidPointOfElement = (optionsObject) => {
    const {
        top,
        left,
        width,
        height
    } = optionsObject;
    const midX = left + (width/2);
    const midY = top + (height/2);
    return {
        midX,
        midY
    };
};

/**
 * Given the coordinates of the midpoint of an element, and the coordinates of some event, works out the angle
 * of the point described by the event coordinates, in relation to the positive x axis. 
 * @param {number} eventX - the x coord of the event
 * @param {number} eventY - the y coord of the event
 * @param {number} midX - the x coord of the midpoint of the dial element
 * @param {number} midY - the y coord of the midpoint of the dial element
 * @returns {number} - an angle relative to the positive x axis. 
 */
export const calculateAngleRelativeToPositiveXAxis = (optionsObject) => {
    const {
        eventX,
        eventY,
        midX,
        midY
    } = optionsObject;
    const deltaX = eventX - midX;
    const deltaY = midY - eventY;
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    //return angle;
    return angle < 0 ? 360 + angle : angle;
}

/**
 * Takes the starting degree of the sliders range, and the total degrees covered by the range, and returns
 * an object with start and end degrees of the range. 
 * @param {number} start - the starting degree of the sliders range
 * @param {number} range - the distance covered by the range
 * @returns {object} - and object with start and end degrees for the range.
 */
function getStartAndEnd(optionsObject) {
    const { start, range } = optionsObject;
    const end = start - range >= 0 ?
                start - range :
                360 + (start - range);
    return {
  	    start,
        end
    };
}

/**
 * Given the start and end degrees of a range, adjust it so that the end is 0, and the start is some degree
 * between 0 and 360 such that the distance between the start and end is the same as it was before the 
 * adjustment took place. 
 * @param {number} start - the starting degree of the range
 * @param {number} end - the ending degree of the range
 * @returns {object} - an object with the adjusted start and end degrees, and also the diff - that is, the
 * amount that the degrees had to be altered by. 
 */
function getAdjustedStartAndEnd(optionsObject) {
    const { start, end } = optionsObject;
    const adjustedStart = start - end >= 0 ?
  	                      start - end :
                          360 + (start - end);
    return {
  	    start: adjustedStart,
        end: 0,
        diff: end
    };
}

/**
 * Takes a degree subtracts a diff from it. If this results in a figure less than 0 it carries on descending 
 * from 360 instead. 
 * @param {number} degree - the degree to be altered
 * @param {number} diff - the diff to alter the degree by
 * @returns {number} - the altered degree
 */
function adjustDegree(optionsObject) {
    const { degree, diff } = optionsObject
    return degree - diff >= 0 ?
  		   degree - diff :
           360 + (degree - diff);
};


function adjustFigures(angle, startOffset, range) {
    const { start, end, diff } = getAdjustedStartAndEnd(
        getStartAndEnd({ start: startOffset, range })
    );
    const adjustedAngle = adjustDegree({ degree: angle, diff });
    return {
        adjustedStart: start,
        adjustedEnd: end,
        adjustedAngle
    }
};

export const checkIfAngleAllowed = (angle, startOffset, range) => {
    if (range === 360) return true;
    const {
        adjustedStart, 
        adjustedEnd,
        adjustedAngle
    } = adjustFigures(angle, startOffset, range);
    return adjustedAngle <= adjustedStart && adjustedAngle >= adjustedEnd;
}

export const getProgressWithinRangeAsDecimal = (angle, startOffset, range) => {
    const {
        adjustedStart, 
        adjustedEnd,
        adjustedAngle
    } = adjustFigures(angle, startOffset, range);
    return (adjustedStart - adjustedAngle) / adjustedStart;
}

export const mapProgressDecimalToDataRange = (progressDecimal, dataMin, dataMax) => {
    const dataRange = dataMax - dataMin;
    return dataMin + (dataRange * progressDecimal);
}

export const convertIncomingValueToDialPosition = (optionsObject) => {
    const {
        value,
        dataMin,
        dataMax,
        dialRangeOffset,
        dialRange
    } = optionsObject;
    const dataRange = dataMax - dataMin;
    const valueAsDecimal = value / dataRange;

    const progressWithinDialRange = dialRange * valueAsDecimal;
    const dialPosition = dialRangeOffset - progressWithinDialRange >= 0 ?
                         dialRangeOffset - progressWithinDialRange :
                         360 + (dialRangeOffset - progressWithinDialRange);
    return dialPosition;
}

/*

Break the outgoing process down into stages:

1. Use the event details to determine the raw angle.

2. Ensure that the angle is within the accepted range, as specified by props.

3. Convert its position within the range to a decimal. 

4. Map that decimal to a point within the data range. 

5. Dispatch action / call callback func with new value.


*/