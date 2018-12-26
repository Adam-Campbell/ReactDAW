import * as actionTypes from '../actionTypes';

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
