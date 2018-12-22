/**
 * Given the upper and lower bounds of two elements across some axis, determines whether there is 
 * any overlap between the two elements on the axis in question. Either the x or y axis can be used,
 * as long as the same axis is used for each argument supplied. 
 * @param {number} elementALowerBound - the lower boundary of the first element to compare
 * @param {number} elementAUpperBound - the upperf boundary of the first element to compare
 * @param {number} elementBLowerBound - the lower boundary of the second element to compare
 * @param {number} elementBUpperBound - the upper boundary of the second element to compare
 * @returns {boolean} - true if overlap exists, false if not.
 */
export const findOverlapAlongAxis = (optionsObject) => {
    const { 
        elementALowerBound,
        elementAUpperBound,
        elementBLowerBound,
        elementBUpperBound
    } = optionsObject;
    
    // If there is any overlap at all between the two elements then at least one of these logical statements
    // must be true, conversely if none of the statements are true we can say conclusively that there is
    // absolutely no overlap.
    return (elementALowerBound >= elementBLowerBound && elementALowerBound <= elementBUpperBound) ||
           (elementAUpperBound >= elementBLowerBound && elementAUpperBound <= elementBUpperBound) ||
           (elementBLowerBound >= elementALowerBound && elementBLowerBound <= elementAUpperBound) ||
           (elementBUpperBound >= elementALowerBound && elementBUpperBound <= elementAUpperBound);
};


/**
 * Given a selection state and an element, either add the element to the selection if it is not already there,
 * or remove it from the selection if it is already there. If shouldPreserveSelection is true then all other
 * elements in the selection will be preserved, if false then all other elements will be discarded. 
 * @param {array} currentSelectionState - the current selection state
 * @param {string} element - the element to either add or remove from the selection
 * @param {boolean} shouldPreserveSelection - If true, all other elements in the selection are preserved,
 * but if false then all other elements in the selection are removed. 
 */
export const addOrRemoveElementFromSelection = (optionsObject) => {
    const { 
        currentSelectionState,
        element, 
        shouldPreserveSelection
    } = optionsObject;

    const elementIsInSelection = currentSelectionState.includes(element);
    if (shouldPreserveSelection) {
        return elementIsInSelection ? currentSelectionState.filter(el => el !== element) :
                                      [ ...currentSelectionState, element ];
    } else {
        return elementIsInSelection ? [] : [ element ];
    }
};

/**
 * Given a BBS string, determine the amount of whole bars present in the time described by the string
 * and return this value as an integer.
 * @param {string} transportPositionString - the BBS string to query
 * @return {number} - the whole bars as an integer.
 */
export const getWholeBarsFromString = (transportPositionString) => {
    const splitString= transportPositionString.split(':');
    return parseInt(splitString[0]);
};

/**
 * A simple utility function that takes a raw coordinate, a scroll value, and subtracts the scroll value from
 * the raw coordinate to get an adjusted coordinate. If scroll is undefined it will assume a default value of 0.
 * Whilst this function might seem superflous, the process of adjusting a mouse event coord for a scroll value is
 * something done many times in the rest of the code, this provides a slightly more terse way of writing it
 * compared to creating local variables for everything everytime, whilst being more readable and understandable
 * than the alternative of just performing calculations with the raw numbers from the event objects. 
 * @param {number} raw - the raw coord value from the event object
 * @param {number} scroll - the current scroll value 
 */
export const adjustForScroll = (optionsObject) => {
    const { raw } = optionsObject;
    const scroll = optionsObject.scroll || 0;
    return raw - scroll;
}

/**
 * Given a BBS string, reduce the string down on floating point number which is the total value of the 
 * bars, beats and sixteenths, all in terms of sixteenths. 
 * @param {string} transportPositionString - the BBS string to query.
 * @return {number} - the amount of sixteenths as a floating point number - if it doesn't come to a
 * discrete amount of sixteenths it will return parts of sixteenths as well.
 */
export const transportPositionStringToSixteenths = (transportPositionString) => {
    const splitString= transportPositionString.split(':');
    const asSixteenths = parseInt(splitString[0])*16 + 
                        parseInt(splitString[1])*4 +
                        parseFloat(splitString[2]);
    return asSixteenths;
};