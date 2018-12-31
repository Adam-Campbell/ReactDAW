import * as actionTypes from '../actionTypes';
import { deepCopy, updatePropAtPath } from '../sharedUtils';

const defaultState = {};

/*

effect object schema:

{
    id: {string} - id for effect
    type: {enum} - type of effect 
    channelId: {string} - the channel this effect is currently being used with
    effectData: {object} - the data/settings for this effect.
}

*/

const effects = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.ADD_EFFECT:
            return {
                ...state, 
                [action.payload.effectId]: {
                    id: action.payload.effectId,
                    type: action.payload.type,
                    channelId: action.payload.channelId,
                    effectData: action.payload.effectData
                }
            };

        case actionTypes.REMOVE_EFFECT:
            {
                let newState = { ...state };
                delete newState[action.payload.effectId];
                return newState;
            }

        case actionTypes.UPDATE_EFFECT_SETTINGS:
            return {
                ...state,
                [action.payload.effectId]: {
                    ...state[action.payload.effectId],
                    effectData: action.payload.effectData
                }
            };

        case actionTypes.UPDATE_ONE_EFFECT_SETTING:
            return {
                ...state, 
                [action.payload.effectId]: {
                    ...state[action.payload.effectId],
                    effectData: updatePropAtPath(
                        deepCopy(state[action.payload.effectId].effectData),
                        action.payload.propertyPathArray,
                        action.payload.newValue
                    )
                }
            };

        // removes the effects that were associated with the channel being removed
        case actionTypes.REMOVE_CHANNEL:
            {
                let nextState = {};
                for (let key in state) {
                    if (state[key].channelId !== action.payload.channelId) {
                        nextState[key] = { ...state[key] };
                    }
                }
                return nextState;
            }

        case actionTypes.LOAD_STATE_SUCCESS:
            return action.payload.loadedState.effects;

        default: 
            return state;
    }
}

export default effects;