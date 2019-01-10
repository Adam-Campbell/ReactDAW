/**
 * Given x and y coords for a mouseDown event, and x and y coords for the current mouse position, determines
 * the x, y, width and height parameters needed to create a rectangle matching the selection described by the
 * coordinates, and returns those parameters as an object. 
 * @param {number} mouseDownPosX - the x coord of the last mouseDown event
 * @param {number} mouseDownPosY - the y coord of the last mouseDown event
 * @param {number} currentMousePosX - the x coord of the current mouse position
 * @param {number} currentMousePosY - the y coord of the current mouse position
 * @returns {object} - an object with x, y, width and height properties to render a rectangle with. 
 */
export const getOverlayPosition = (optionsObject) => {
    const {
        mouseDownPosX,
        mouseDownPosY,
        currentMousePosX,
        currentMousePosY
    } = optionsObject;
    
    const leftBound = Math.min(mouseDownPosX, currentMousePosX);
    const rightBound = Math.max(mouseDownPosX, currentMousePosX);
    const topBound = Math.min(mouseDownPosY, currentMousePosY);
    const bottomBound = Math.max(mouseDownPosY, currentMousePosY);
    const width = rightBound - leftBound;
    const height = bottomBound - topBound;
    return {
        x: leftBound,
        y: topBound,
        width,
        height
    };
};
