import { combineReducers } from 'redux';
import playerInfo from './playerInfoReducer';
import playerStatus from './playerStatusReducer';
import channels from './channelsReducer';
import activeWindows from './activeWindowsReducer';
import sections from './sectionsReducer';
import instruments from './instrumentsReducer';
import effects from './effectsReducer';
import modals from './modalsReducer';
import composition from './compositionReducer';
import * as actionTypes from '../actionTypes';
import undoable, {  
    excludeAction,
    groupByActionTypes 
} from 'redux-undo';
import { updateEffectSettings } from '../actions/index';

const customGroupingLogic = (action, currentState, previousHistory) => {
    /*
        For certain actionTypes, repeated actions may or may not need to be grouped together, depending
        on the actions payload. 

        For example, UPDATE_CHANNEL_VOLUME should group together all subsequent actions that are for the
        same channel, but as soon as another channels volume is edited that should no longer be grouped
        together. So instead of just returning action.type as the group name, it returns a string composed
        of action.type and the channelId from the actions payload.

        UPDATE_ONE_INSTRUMENT_SETTING and UPDATE_ONE_EFFECT_SETTING have similar constraints, they should 
        stop grouping together as soon as the instrumentId / effectId changes, or as soon as the 
        propertyPathArray changes. So this time the string returned for grouping purposes is composed of the
        action.type, the instrumentId/effectId, and the propertyPathArray converted to a string. 
    */
    switch (action.type) {

        case actionTypes.UPDATE_CHANNEL_VOLUME:
            return action.type + ', ' + action.payload.channelId;

        case actionTypes.UPDATE_CHANNEL_PAN:
            return action.type + ', ' + action.payload.channelId

        case actionTypes.UPDATE_EFFECT_SETTINGS:
            return action.type;

        case actionTypes.UPDATE_ONE_EFFECT_SETTING:
            return action.type + ', ' + action.payload.effectId + ', ' + action.payload.propertyPathArray.toString();

        case actionTypes.UPDATE_INSTRUMENT_SETTINGS:
            return action.type;

        case actionTypes.UPDATE_ONE_INSTRUMENT_SETTING:
            return action.type + ', ' + action.payload.instrumentId + ',' + action.payload.propertyPathArray.toString();
            

        case actionTypes.SET_MASTER_VOLUME:
            return action.type;

        default: 
            return null;
    }
}

const undoableSlice = combineReducers({
    playerInfo,
    composition,
    activeWindows,
    channels,
    sections,
    instruments,
    effects,
    modals
});

const main = undoable(
    undoableSlice,
    {
        filter: excludeAction([
            actionTypes.OPEN_MODAL, 
            actionTypes.CLOSE_MODAL,
            actionTypes.SAVE_STATE_ATTEMPT,
            actionTypes.SAVE_STATE_SUCCESS,
            actionTypes.SAVE_STATE_FAILED,
            actionTypes.LOAD_STATE_ATTEMPT,
            actionTypes.LOAD_STATE_SUCCESS,
            actionTypes.LOAD_STATE_FAILED,
            actionTypes.PLAY_TRACK,
            actionTypes.PAUSE_TRACK,
            actionTypes.STOP_TRACK
        ]),
        // groupBy: groupByActionTypes([
        //     actionTypes.UPDATE_CHANNEL_VOLUME,
        //     actionTypes.UPDATE_CHANNEL_PAN,
        //     actionTypes.UPDATE_EFFECT_SETTINGS,
        //     actionTypes.UPDATE_ONE_EFFECT_SETTING,
        //     actionTypes.UPDATE_INSTRUMENT_SETTINGS,
        //     actionTypes.UPDATE_ONE_INSTRUMENT_SETTING,
        //     actionTypes.SET_MASTER_VOLUME
        // ])
        groupBy: customGroupingLogic
    }
);

const combinedState = combineReducers({
    playerStatus, 
    main
});

export default combinedState;


