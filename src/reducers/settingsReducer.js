import * as actionTypes from '../actionTypes';
import { toolTypes, snapSettings, noteDurationSettings } from '../constants';

const defaultState = {
    toolType: toolTypes.cursor,
    snap: snapSettings._16n,
    noteDuration: noteDurationSettings._16n
};

const settings = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.SET_TOOL_TYPE:
            return {
                ...state,
                toolType: action.payload.newToolType
            };

        case actionTypes.SET_SNAP:
            return {
                ...state,
                snap: action.payload.newSnapValue
            };

        case actionTypes.SET_NOTE_DURATION:
            return {
                ...state,
                noteDuration: action.payload.newNoteDurationValue
            };

        default:
            return state;
    }
}

export default settings;
