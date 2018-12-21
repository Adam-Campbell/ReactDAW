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

export const removeNote = (sectionId, noteId) => ({
    type: actionTypes.REMOVE_NOTE,
    payload: {
        sectionId,
        noteId
    }
});

export const addNotes = (sectionId, noteObjects) => ({
    type: actionTypes.ADD_NOTES,
    payload: {
        sectionId,
        noteObjects
    }
});

export const removeNotes = (sectionId, noteIds) => ({
    type: actionTypes.REMOVE_NOTES,
    payload: {
        sectionId,
        noteIds
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

export const setBPM = (bpm) => ({
    type: actionTypes.SET_BPM,
    payload: {
        bpm
    }
});

export const addChannel = (channelId, channelName, channelColor, instrumentId, instrumentType) => ({
    type: actionTypes.ADD_CHANNEL,
    payload: {
        channelId,
        channelName,
        channelColor,
        instrumentId,
        instrumentType
    }
});

export const removeChannel = (channelId) => ({
    type: actionTypes.REMOVE_CHANNEL,
    payload: {
        channelId
    }
});

export const updateChannelName = (channelId, newChannelName) => ({
    type: actionTypes.UPDATE_CHANNEL_NAME,
    payload: {
        channelId,
        newChannelName
    }
});

export const updateChannelColor = (channelId, newChannelColor) => ({
    type: actionTypes.UPDATE_CHANNEL_COLOR,
    payload: {
        channelId,
        newChannelColor
    }
});

export const addSection = (sectionObject, sectionId, channelId) => ({
    type: actionTypes.ADD_SECTION,
    payload: {
        sectionObject,
        sectionId,
        channelId
    }
});

export const removeSection = (sectionId, channelId) => ({
    type: actionTypes.REMOVE_SECTION,
    payload: {
        sectionId,
        channelId
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

export const removeInstrument = (instrumentId) => ({
    type: actionTypes.REMOVE_INSTRUMENT,
        payload: {
            instrumentId
        }
});

export const updateInstrumentSettings = (instrumentId, instrumentSettings) => ({
    type: actionTypes.UPDATE_INSTRUMENT_SETTINGS,
    payload: {
        instrumentId,
        instrumentSettings
    }
});

export const updateOneInstrumentSetting = (instrumentId, propertyPathArray, newValue) => ({
    type: actionTypes.UPDATE_ONE_INSTRUMENT_SETTING,
    payload: {
        instrumentId,
        propertyPathArray,
        newValue
    }
});

export const addEffect = (effectId, channelId, type, effectData) => ({
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
});

export const updateOneEffectSetting = (effectId, propertyPathArray, newValue) => ({
    type: actionTypes.UPDATE_ONE_EFFECT_SETTING,
    payload: {
        effectId,
        propertyPathArray,
        newValue
    }
});

export const openWindow = (windowId, windowType) => ({
    type: actionTypes.OPEN_WINDOW,
    payload: {
        windowId,
        windowType
    }
});

export const closeWindow = (windowId) => ({
    type: actionTypes.CLOSE_WINDOW,
    payload: {
        windowId
    }
})