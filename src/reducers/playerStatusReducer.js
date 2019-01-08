import * as actionTypes from '../actionTypes';

const defaultState = {
    isPlaying: false,
    isPaused: false,
    isMuted: false,
};

const playerStatus = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.PLAY_TRACK:
            return {
                ...state,
                isPlaying: true, 
                isPaused: false
            };

        case actionTypes.STOP_TRACK:
            return {
                ...state, 
                isPlaying: false,
                isPaused: false
            };

        case actionTypes.PAUSE_TRACK:
            return {
                ...state, 
                isPlaying: false,
                isPaused: true
            };

        case actionTypes.MUTE_MASTER:
            return {
                ...state, 
                isMuted: true
            };

        case actionTypes.UNMUTE_MASTER:
            return {
                ...state,
                isMuted: false
            };

        case actionTypes.LOAD_STATE_SUCCESS:
            return {
                ...action.payload.loadedState.playerInfo,
                isPlaying: false,
                isPaused: false
            };

        default:
            return state;

    }
}

export default playerStatus;