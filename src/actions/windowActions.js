import * as actionTypes from '../actionTypes';

export const openWindow = (windowId, windowType) => ({
    type: actionTypes.OPEN_WINDOW,
    payload: {
        windowId,
        windowType
    }
});

export const closeWindow = (windowId) => ({
    type: actionTypes.CLOSE_WINDOW,
    payload: {
        windowId
    }
});