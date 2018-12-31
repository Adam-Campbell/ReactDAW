import * as actionTypes from '../actionTypes';

const defaultState = [];

/*
Channel schema:
{
    id {string} - the id for this channel
    name {string} - the name of the channel
    instrumentId {string} - the id for the instrument currently associated with this channel
    effectIds [ {string} ] - array of ids for the effects currently being applied to this channel (in order)
    sectionIds: [ {string} ] - array of ids for the sections currently residing on this channel,
    volume: {number} - the volume of the channel
    isMuted: {boolean} - whether or not the channel is muted
    isSolo: {boolean} - whether the channel is being solo'd
    pan: {number} - the current panning value for the channel
}
*/

const channels = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.ADD_CHANNEL:
            return [
                ...state,
                {
                    id: action.payload.channelId,
                    name: action.payload.channelName,
                    color: action.payload.channelColor,
                    instrumentId: action.payload.instrumentId,
                    effectIds: [],
                    sectionIds: [],
                    volume: 0,
                    isMuted: false,
                    isSolo: false,
                    pan: 0
                }
            ];

        case actionTypes.REMOVE_CHANNEL:
            return state.filter(channel => channel.id !== action.payload.channelId);

        case actionTypes.UPDATE_CHANNEL_NAME:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        name: action.payload.newChannelName
                    }
                } else {
                    return channel;
                }
            });

        case actionTypes.UPDATE_CHANNEL_COLOR:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        color: action.payload.newChannelColor
                    }
                } else {
                    return channel;
                }
            });

        case actionTypes.ADD_INSTRUMENT:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        instrumentId: action.payload.instrumentId
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.ADD_EFFECT:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel, 
                        effectIds: [...channel.effectIds, action.payload.effectId]
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.REMOVE_EFFECT:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel, 
                        effectIds: channel.effectIds.filter(id => id !== action.payload.effectId)
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.ADD_SECTION:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel, 
                        sectionIds: [...channel.sectionIds, action.payload.sectionId]
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.REMOVE_SECTION:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel, 
                        sectionIds: channel.sectionIds.filter(id => id !== action.payload.sectionId)
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.UPDATE_CHANNEL_VOLUME:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel, 
                        volume: action.payload.newChannelVolume
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.MUTE_CHANNEL:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        isMuted: true
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.UNMUTE_CHANNEL:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        isMuted: false
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.SOLO_CHANNEL:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        isSolo: true
                    };
                } else {
                    return channel;
                }
            });

        case actionTypes.UNSOLO_CHANNEL:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        isSolo: false
                    };
                } else {
                    return channel;
                }
            });
        
        case actionTypes.UPDATE_CHANNEL_PAN:
            return state.map(channel => {
                if (channel.id === action.payload.channelId) {
                    return {
                        ...channel,
                        pan: action.payload.newChannelPan
                    };
                } else {
                    return channel;
                }
            });
        
        case actionTypes.LOAD_STATE_SUCCESS:
            return action.payload.loadedState.channels;

        default:
            return state;
    }
};

export default channels;