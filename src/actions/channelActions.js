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
