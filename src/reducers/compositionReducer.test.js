import * as actionTypes from '../actionTypes';
import reducer from './compositionReducer';

test('returns default state', () => {
    const expectedResult = {
        saveName: ''
    };
    expect(reducer(undefined, {})).toEqual(expectedResult);
});

test('handles SET_COMPOSITION_SAVE_NAME', () => {
    const action = {
        type: actionTypes.SET_COMPOSITION_SAVE_NAME,
        payload: {
            newSaveName: 'New name'
        }
    };
    const expectedResult = {
        saveName: 'New name'
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles LOAD_STATE_SUCCESS', () => {
    const action = {
        type: actionTypes.LOAD_STATE_SUCCESS,
        payload: {
            loadedState: {
                main: {
                    composition: {
                        saveName: 'Loaded track'
                    }
                }
            }
        }
    };
    const expectedResult = {
        saveName: 'Loaded track'
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles OPEN_NEW_PROJECT', () => {
    const action = {
        type: actionTypes.OPEN_NEW_PROJECT
    };
    const expectedResult = {
        saveName: ''
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});