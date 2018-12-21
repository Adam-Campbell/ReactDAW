import Tone from 'tone';

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

export const getTransportPositionStringFromBarNumber = (barNumber) => {
    return `${barNumber}:0:0`;
}