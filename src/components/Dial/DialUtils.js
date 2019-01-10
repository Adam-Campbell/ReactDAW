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
    return Math.atan2(deltaY, deltaX) * 180 / Math.PI;
}

