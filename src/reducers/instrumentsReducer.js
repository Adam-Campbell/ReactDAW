import * as actionTypes from '../actionTypes';
import { synthTypes, defaultSynthData } from '../constants';

const defaultState = {};


/*
Default synth settings:
{
    envelope: {
        attack: 0.005,
        attackCurve: 'linear',
        decay: 0.1,
        release: 1,
        releaseCurve: 'exponential',
        sustain: 0.3
    },
    oscillator: {
        detune: 0,
        frequency: 440,
        mute: false,
        phase: 0,
        type: 'triangle',
        volume: 0
    },
    portamento: 0,
    volume: 0
}

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
                    type: synthTypes.default,
                    synthData: {
                        ...defaultSynthData
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
                    synthData: action.payload.synthData
                }
            }

        case actionTypes.UPDATE_INSTRUMENT_SETTINGS:
            return {
                ...state,
                [action.payload.instrumentId]: {
                    ...state[action.payload.instrumentId],
                    synthData: action.payload.instrumentSettings
                }
            };

        default:
            return state;

    }
};

export default instruments;
