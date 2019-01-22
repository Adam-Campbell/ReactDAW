import * as actionTypes from '../actionTypes';

export const setToolType = (newToolType) => ({
    type: actionTypes.SET_TOOL_TYPE,
    payload: {
        newToolType
    }
});

export const setSnap = (newSnapValue) => ({
    type: actionTypes.SET_SNAP,
    payload: {
        newSnapValue
    }
});

export const setNoteDuration = (newNoteDurationValue) => ({
    type: actionTypes.SET_NOTE_DURATION,
    payload: {
        newNoteDurationValue
    }
});
