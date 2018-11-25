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
            return state.filter(channel => channel.id !== action.payload.channelId)

        default:
            return state;
    }
};

export default channels;