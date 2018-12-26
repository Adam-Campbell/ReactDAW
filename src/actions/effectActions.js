import * as actionTypes from '../actionTypes';

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
