import * as actionTypes from '../actionTypes';

export const setCompositionTitle = (newTitle) => ({
    type: actionTypes.SET_COMPOSITION_TITLE,
    payload: {
        newTitle
    }
});

export const setCompositionSaveName = (newSaveName) => ({
    type: actionTypes.SET_COMPOSITION_SAVE_NAME,
    payload: {
        newSaveName
    }
});

