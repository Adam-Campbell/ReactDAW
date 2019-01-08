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
        groupBy: groupByActionTypes([
            actionTypes.UPDATE_CHANNEL_VOLUME,
            actionTypes.UPDATE_CHANNEL_PAN,
            actionTypes.UPDATE_EFFECT_SETTINGS,
            actionTypes.UPDATE_ONE_EFFECT_SETTING,
            actionTypes.UPDATE_INSTRUMENT_SETTINGS,
            actionTypes.UPDATE_ONE_INSTRUMENT_SETTING,
            actionTypes.SET_MASTER_VOLUME
        ])
    }
);

const combinedState = combineReducers({
    playerStatus, 
    main
});

export default combinedState;


