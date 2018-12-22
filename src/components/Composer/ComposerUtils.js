import Tone from 'tone';
import { generateId } from '../../helpers';
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
 * Given a selection state, and and an app state, creates the data structure required for pasting later.
 * @param {array} currentSelectionState - an array of the ids of the currently selected sections
 * @param {object} allSections - the complete sections state from the store
 * @param {array} allChannels - the complete channels state from the store  
 * @return {object} - data structure that can be used later to paste the selection. 
 */
export const createCopiedSectionsDataStructure = (optionsObject) => {
    const { 
        currentSelectionState,
        allSections,
        allChannels 
    } = optionsObject;
    // Declare variable to keep track of lowest index encountered
    let lowestIndex = null;
    // Map over the selection state array and create an array of section objects, with the channelId being
    // replaced by that channels index position within the channels array
    const sectionObjects = currentSelectionState.map(sectionId => {
        const section = { ...allSections[sectionId] };
        const index = allChannels.findIndex(channel => channel.id === section.channelId);
        if (index < lowestIndex || lowestIndex === null) {
            lowestIndex = index;
        }
        delete section.channelId;
        section.channelIndex = index;
        return section;
    });
    // return the array of section objects, and the lowest index that was encountered. 
    return {
        sectionObjects,
        lowestIndex
    };
}

export const getWholeBarsFromString = (transportPositionString) => {
    const splitString= transportPositionString.split(':');
    return parseInt(splitString[0]);
};

export const findEarliestStartTime = (sectionObjects) => {
    let earliestSectionStart = null;
    for (let section of sectionObjects) {
        if (earliestSectionStart === null) {
            earliestSectionStart = section.start;
        } else {
            let a = getWholeBarsFromString(earliestSectionStart);
            let b = getWholeBarsFromString(section.start);
            if (b < a) {
                earliestSectionStart = section.start;
            }
        }
    }
    return earliestSectionStart;
};

export const getBarNumberFromBBSString = (barsString) => {
    let subStr = barsString.split(':')[0];
    return parseInt(subStr);
}

/**
 * Creates and returns an array containing all of the data for generating the grid lines on the composer canvas, 
 * such that the returned array can be mapped over in the render function to render the lines on the canvas.
 * @param {number} canvasHeight - the height of the composer canvas
 * @param {number} canvasWidth - the width of the composer canvas
 * @param {number} channelsArrayLength - the length of the array holding all of the channels in the app state
 */
export const createGridLinesArray = (optionsObject) => {
    const { 
        canvasHeight,
        canvasWidth,
        channelsArrayLength
     } = optionsObject;
    let linesArray = [];
    // create vertical lines
    for (let i = 0; i <= 200;  i++) {
        linesArray.push([i*48 , 40, i*48, canvasHeight]);
    }
    // create horizontal lines
    let verticalBound = Math.max(4, channelsArrayLength);
    for (let j = 0; j <= verticalBound; j++) {
        linesArray.push([0, j*70+40, canvasWidth, j*70+40]);
    }
    return linesArray;
}

/**
 * Create an array of objects containing all of the data needed to render the visual representations of
 * the sections on the canvas, such that this array can be mapped over in the main render function to
 * render the necessary elements on the canvas.
 * @param {array} allChannels - the array holding all of the channels data in the apps state
 * @param {object} allSections - the object holding all of the sections data in the apps state
 */
export const createSectionRectsArray = (optionsObject) => {
    const { 
        allChannels,
        allSections
    } = optionsObject;
    let arr = [];
    for (let i = 0; i < allChannels.length; i++) {
        let channel = allChannels[i];
        for (let sectionId of channel.sectionIds) {
            let section = allSections[sectionId];
            let rectObject = {
                x: getBarNumberFromBBSString(section.start) * 48,
                y: (i * 70) + 40,
                width: section.numberOfBars * 48,
                height: 70,
                color: channel.color,
                sectionId: section.id
            }
            arr.push(rectObject);
        }
    }
    return arr;
}

/**
 * Contains the logic for creating section objects, including verifying that the object is valid. If it is
 * then the object is returned, and if not then null is returned.
 * @param {number} x - the x position used to calculate the section info, comes from a mouse event. Should 
 * already be adjusted for any scrolling before being passed to this function.
 * @param {number} y - the y position used to calculate the section info, comes from a mouse event. Should 
 * already be adjusted for any scrolling before being passed to this function.
 * @param {array} allChannels - array of all of the channels currently in the app state.
 * @param {number} numberOfBars - the number of bars the section will last for.
 * @returns {object} - a section object, or null if the section was invalid and couldn't be created.
 */
export const createSectionObject = (optionsObject) => {
    const { 
        x, 
        y,
        allChannels,
        numberOfBars
    } = optionsObject;

    if (y > allChannels.length * 70 + 40) {
        return null;
    }

    const channelIndex = Math.floor((y-40)/70);
    const channelId = allChannels[channelIndex].id;
    const startAsNumber = Math.floor(x/48);
    const sectionStartAsBBS = `${startAsNumber}:0:0`;
    const newSectionObject = {
        id: generateId(),
        channelId,
        notes: [],
        start: sectionStartAsBBS,
        numberOfBars,
    };
    return newSectionObject;
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


export const transportPositionStringToSixteenths = (transportPositionString) => {
    const splitString= transportPositionString.split(':');
    const asSixteenths = parseInt(splitString[0])*16 + 
                        parseInt(splitString[1])*4 +
                        parseFloat(splitString[2]);
    return asSixteenths;
};