import * as actionTypes from '../actionTypes';

export const playTrack = () => ({
    type: actionTypes.PLAY_TRACK
});

export const stopTrack = () => ({
    type: actionTypes.STOP_TRACK
});

export const pauseTrack = () => ({
    type: actionTypes.PAUSE_TRACK
});

export const muteMaster = () => ({
    type: actionTypes.MUTE_MASTER
});

export const unmuteMaster = () => ({
    type: actionTypes.UNMUTE_MASTER
});

export const setMasterVolume = (volume) => ({
    type: actionTypes.SET_MASTER_VOLUME,
    payload: {
        volume
    }
});

export const setBPM = (bpm) => ({
    type: actionTypes.SET_BPM,
    payload: {
        bpm
    }
});