import * as actionTypes from '../actionTypes';
import reducer from './effectsReducer';
import { 
    effectTypes, 
    effectData 
} from '../constants';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles ADD_EFFECT', () => {
    const action = {
        type: actionTypes.ADD_EFFECT,
        payload: {
            effectId: '6432674962574359',
            channelId: '9943264853126754',
            type: effectTypes.chorus,
            effectData: effectData.chorus
        }
    };
    const expectedResult = {
        '6432674962574359': {
            id: '6432674962574359',
            channelId: '9943264853126754',
            type: effectTypes.chorus,
            effectData: effectData.chorus
        }
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles REMOVE_EFFECT', () => {
    const state = {
        '6432674962574359': {
            id: '6432674962574359',
            channelId: '9943264853126754',
            type: effectTypes.chorus,
            effectData: effectData.chorus
        }
    }; 
    const action = {
        type: actionTypes.REMOVE_EFFECT,
        payload: {
            effectId: '6432674962574359',
            channelId: '9943264853126754'
        }
    };
    expect(reducer(state, action)).toEqual({});
});

test('handles UPDATE_EFFECT_SETTINGS', () => {
    const state = {
        '6432674962574359': {
            id: '6432674962574359',
            channelId: '9943264853126754',
            type: effectTypes.chorus,
            effectData: effectData.chorus
        }
    }; 
    const action = {
        type: actionTypes.UPDATE_EFFECT_SETTINGS,
        payload: {
            effectId: '6432674962574359',
            effectData: {
                delayTime: 4.8,
                depth: 0.85,
                frequency: 1.8,
                spread: 180,
                type: 'sine',
                wet: 0.8
            }
        }
    };
    const expectedResult = {
        '6432674962574359': {
            id: '6432674962574359',
            channelId: '9943264853126754',
            type: effectTypes.chorus,
            effectData: {
                delayTime: 4.8,
                depth: 0.85,
                frequency: 1.8,
                spread: 180,
                type: 'sine',
                wet: 0.8
            }
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult); 
});

test('handles UPDATE_ONE_EFFECT_SETTING', () => {
    const state = {
        '6432674962574359': {
            id: '6432674962574359',
            channelId: '9943264853126754',
            type: effectTypes.chorus,
            effectData: effectData.chorus
        }
    };
    const action = {
        type: actionTypes.UPDATE_ONE_EFFECT_SETTING,
        payload: {
            effectId: '6432674962574359',
            propertyPathArray: ['delayTime'],
            newValue: 4.2
        }
    };
    const expectedResult = {
        '6432674962574359': {
            id: '6432674962574359',
            channelId: '9943264853126754',
            type: effectTypes.chorus,
            effectData: {
                delayTime: 4.2,
                depth: 0.7,
                frequency: 1.5,
                spread: 180,
                type: 'sine',
                wet: 1
            }
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});
