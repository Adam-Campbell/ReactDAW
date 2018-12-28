import * as actionTypes from '../actionTypes';

export const addInstrument = (instrumentId, channelId, type, instrumentData) => ({
    type: actionTypes.ADD_INSTRUMENT,
    payload: {
        instrumentId,
        channelId,
        type, 
        instrumentData
    }
});

export const removeInstrument = (instrumentId) => ({
    type: actionTypes.REMOVE_INSTRUMENT,
        payload: {
            instrumentId
        }
});

export const updateInstrumentSettings = (instrumentId, instrumentData) => ({
    type: actionTypes.UPDATE_INSTRUMENT_SETTINGS,
    payload: {
        instrumentId,
        instrumentData
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
