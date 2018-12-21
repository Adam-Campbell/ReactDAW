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