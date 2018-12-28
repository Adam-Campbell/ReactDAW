import * as actionTypes from '../actionTypes';
import { instrumentData } from '../constants';
import { deepCopy, updatePropAtPath, deletePropFromObject } from '../sharedUtils';

const defaultState = {};


/*

synth object schema:

{
    id: {string} - the id for the synth
    channelId: {string} - the id for the channel the synth resides on
    type: {enum} - the type of synth, uses synthTypes constant
    synthData: {object} - the complete settings of the synth, default settings are outlined above
}

*/

const instruments = (state=defaultState, action) => {
    switch (action.type) {
        // adds the instrument that is associated with the new channel being added
        case actionTypes.ADD_CHANNEL:
            return {
                ...state,
                [action.payload.instrumentId]: {
                    id: action.payload.instrumentId,
                    channelId: action.payload.channelId,
                    type: action.payload.instrumentType,
                    instrumentData: {
                        ...instrumentData[action.payload.instrumentType]
                    }
                }
            }

        case actionTypes.ADD_INSTRUMENT:
            return {
                ...state,
                [action.payload.instrumentId]: {
                    id: action.payload.instrumentId,
                    channelId: action.payload.channelId,
                    type: action.payload.type,
                    instrumentData: action.payload.instrumentData
                }
            }
        
        case actionTypes.REMOVE_INSTRUMENT:
            return deletePropFromObject(state, action.payload.instrumentId);

        case actionTypes.UPDATE_INSTRUMENT_SETTINGS:
            return {
                ...state,
                [action.payload.instrumentId]: {
                    ...state[action.payload.instrumentId],
                    instrumentData: action.payload.instrumentData
                }
            };

        case actionTypes.UPDATE_ONE_INSTRUMENT_SETTING:
            return {
                ...state, 
                [action.payload.instrumentId]: {
                    ...state[action.payload.instrumentId],
                    instrumentData: updatePropAtPath(
                        deepCopy(state[action.payload.instrumentId].instrumentData),
                        action.payload.propertyPathArray,
                        action.payload.newValue
                    )
                }
            };

        default:
            return state;

    }
};

export default instruments;
