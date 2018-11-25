import * as actionTypes from '../actionTypes';


export const addNote = noteObject => ({
    type: actionTypes.ADD_NOTE,
    payload: noteObject
});

export const removeNote = (pitch, time) => ({
    type: actionTypes.REMOVE_NOTE,
    payload: {
        pitch,
        time
    }
});


export const playTrack = () => ({
    type: actionTypes.PLAY_TRACK
});

export const stopTrack = () => ({
    type: actionTypes.STOP_TRACK
});

export const addChannel = (channelId, instrumentId) => ({
    type: actionTypes.ADD_CHANNEL,
    payload: {
        channelId,
        instrumentId
    }
});

export const removeChannel = (channelId) => ({
    type: actionTypes.REMOVE_CHANNEL,
    payload: {
        channelId
    }
});

export const addSection = (sectionId, channelId, sectionStart, sectionLength) => ({
    type: actionTypes.ADD_SECTION,
    payload: {
        sectionId,
        channelId,
        sectionStart,
        sectionLength
    }
});

export const removeSection = (sectionId) => ({
    type: actionTypes.REMOVE_SECTION,
    payload: {
        sectionId
    }
});

