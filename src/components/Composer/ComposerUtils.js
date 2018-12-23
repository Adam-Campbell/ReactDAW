import Tone from 'tone';
import { generateId } from '../../helpers';
import { getWholeBarsFromString } from '../../sharedUtils';


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


/**
 * Given an array of section objects, it compares the start property of each object and returns the 
 * earliest start found. 
 * @param {array} sectionObjects - an array of section objects. 
 * @returns {string} - the earliest start time found, in a BBS string format '0:0:0' 
 */
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

/**
 * Creates and returns an array containing all of the data for generating the grid lines on the composer canvas, 
 * such that the returned array can be mapped over in the render function to render the lines on the canvas.
 * @param {number} canvasHeight - the height of the composer canvas
 * @param {number} canvasWidth - the width of the composer canvas
 * @param {number} channelsArrayLength - the length of the array holding all of the channels in the app state
 * @returns {array} - the constructed array
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
 * @returns {array} - the constructed array
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
                x: getWholeBarsFromString(section.start) * 48,
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

