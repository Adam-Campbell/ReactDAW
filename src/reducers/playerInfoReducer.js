import * as actionTypes from '../actionTypes';

const defaultState = {
    volume: 0,
    bpm: 120
};

const playerInfo = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.SET_MASTER_VOLUME:
            return {
                ...state,
                volume: action.payload.volume
            };

        case actionTypes.SET_BPM:
            return {
                ...state,
                bpm: action.payload.bpm
            };

        case actionTypes.LOAD_STATE_SUCCESS:
            return {
                ...action.payload.loadedState.main.playerInfo,
            };

        case actionTypes.OPEN_NEW_PROJECT:
            return defaultState;

        default:
            return state;

    }
}

export default playerInfo;