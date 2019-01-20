import * as actionTypes from '../actionTypes';

const defaultState = [];

/*
active window object schema:
{
    id: {string} - the id of this window
    type: {enum} - the type of component that needs to be rendered for this window
}
*/


const activeWindows = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.OPEN_WINDOW:
            return [ ...state, {
                id: action.payload.windowId,
                type: action.payload.windowType
            }];

        case actionTypes.CLOSE_WINDOW:
            return state.filter(window => window.id !== action.payload.windowId);

        case actionTypes.FOCUS_WINDOW: 
            {
                const windowIndex = state.findIndex(el => el.id === action.payload.windowId);
                return [
                    ...state.slice(0, windowIndex),
                    ...state.slice(windowIndex+1),
                    { ...state[windowIndex] }
                ]
            }

        case actionTypes.LOAD_STATE_SUCCESS:
            return defaultState;

        case actionTypes.OPEN_NEW_PROJECT:
            return defaultState;

        default: 
            return state;
    }
}

export default activeWindows;