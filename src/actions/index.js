import * as actionTypes from '../actionTypes';


// export const addNote = noteObject => ({
//     type: actionTypes.ADD_NOTE,
//     payload: noteObject
// });

// export const removeNote = (pitch, time) => ({
//     type: actionTypes.REMOVE_NOTE,
//     payload: {
//         pitch,
//         time
//     }
// });

export const addNote = (sectionId, noteObject) => ({
    type: actionTypes.ADD_NOTE,
    payload: {
        sectionId,
        noteObject
    }
});

export const removeNote = (sectionId, pitch, time) => ({
    type: actionTypes.REMOVE_NOTE,
    payload: {
        sectionId,
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

export const addInstrument = (instrumentId, channelId, type, synthData) => ({
    type: actionTypes.ADD_INSTRUMENT,
    payload: {
        instrumentId,
        channelId,
        type, 
        synthData
    }
});

export const updateInstrumentSettings = (instrumentId, instrumentSettings) => ({
    type: actionTypes.UPDATE_INSTRUMENT_SETTINGS,
    payload: {
        instrumentId,
        instrumentSettings
    }
});

export const addEffect = (effectId, channelId, type, effectData, ) => ({
    type: actionTypes.ADD_EFFECT,
    payload: {
        effectId, 
        channelId,
        type,
        effectData
    }
});

export const removeEffect = (effectId, channelId) => ({
    type: actionTypes.REMOVE_EFFECT,
    payload: {
        effectId,
        channelId
    }
});

export const updateEffectSettings = (effectId, effectSettings) => ({
    type: actionTypes.UPDATE_EFFECT_SETTINGS,
    payload: {
        effectId, 
        effectSettings
    }
})