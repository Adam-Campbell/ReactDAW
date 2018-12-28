import * as actionTypes from '../actionTypes';

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

export const updateChannelVolume = (channelId, newChannelVolume) => ({
    type: actionTypes.UPDATE_CHANNEL_VOLUME,
    payload: {
        channelId,
        newChannelVolume
    }
});

export const muteChannel = (channelId) => ({
    type: actionTypes.MUTE_CHANNEL,
    payload: {
        channelId
    }
});

export const unmuteChannel = (channelId) => ({
    type: actionTypes.UNMUTE_CHANNEL,
    payload: {
        channelId
    }
});

export const soloChannel = (channelId) => ({
    type: actionTypes.SOLO_CHANNEL,
    payload:{
        channelId
    }
});

export const unsoloChannel = (channelId) => ({
    type: actionTypes.UNSOLO_CHANNEL,
    payload: {
        channelId
    }
});

export const updateChannelPan = (channelId, newChannelPan) => ({
    type: actionTypes.UPDATE_CHANNEL_PAN,
    payload: {
        channelId,
        newChannelPan
    }
});

