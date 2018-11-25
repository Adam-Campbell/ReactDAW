import * as actionTypes from '../actionTypes';

const defaultState = {
    isPlaying: false,
    isMuted: false,
    volume: 0
};

const playerInfo = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.PLAY_TRACK:
            return {
                ...state,
                isPlaying: true
            };

        case actionTypes.STOP_TRACK:
            return {
                ...state, 
                isPlaying: false
            };

        default:
            return state;

    }
}

export default playerInfo;