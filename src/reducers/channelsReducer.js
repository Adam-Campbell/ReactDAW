import * as actionTypes from '../actionTypes';

const defaultState = [];

/*
Channel schema:
{
    id {string} - the id for this channel
    instrumentId {string} - the id for the instrument currently associated with this channel
    effectIds [ {string} ] - array of ids for the effects currently being applied to this channel (in order)
    sectionIds: [ {string} ] - array of ids for the sections currently residing on this channel
}
*/

const channels = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.ADD_CHANNEL:
            return [
                ...state,
                {
                    id: action.payload.channelId,
                    instrumentId: action.payload.instrumentId,
                    effectIds: [],
                    sectionIds: []
                }
            ];

        case actionTypes.REMOVE_CHANNEL:
            return state.filter(channel => channel.id !== action.payload.channelId);

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

        default:
            return state;
    }
};

export default channels;