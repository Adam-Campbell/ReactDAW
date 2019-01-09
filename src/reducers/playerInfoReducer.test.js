import * as actionTypes from '../actionTypes';
import reducer from './playerInfoReducer';

test('returns default state', () => {
    const expectedResult = {
        volume: 0,
        bpm: 120
    };
    expect(reducer(undefined, {})).toEqual(expectedResult);
});

test('handles SET_MASTER_VOLUME', () => {
    const action = {
        type: actionTypes.SET_MASTER_VOLUME,
        payload: {
            volume: -10
        }
    };
    const expectedResult = {
        volume: -10,
        bpm: 120
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles SET_BPM', () => {
    const action = {
        type: actionTypes.SET_BPM,
        payload: {
            bpm: 135
        }
    };
    const expectedResult = {
        volume: 0,
        bpm: 135
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles LOAD_STATE_SUCCESS', () => {
    const action = {
        type: actionTypes.LOAD_STATE_SUCCESS,
        payload: {
            loadedState: {
                main: {
                    playerInfo: {
                        volume: -5,
                        bpm: 130
                    }
                }
            }
        }
    };
    const expectedResult = {
        volume: -5,
        bpm: 130
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});