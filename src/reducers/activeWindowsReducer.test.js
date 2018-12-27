import * as actionTypes from '../actionTypes';
import reducer from './activeWindowsReducer';


test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual([]);
});

test('handles OPEN_WINDOW', () => {
    const action = {
        type: actionTypes.OPEN_WINDOW,
        payload: {
            windowId: '9134625317652315',
            windowType: 'synth'
        }
    };
    const expectedResult = [
        {
            id: '9134625317652315',
            type: 'synth'
        }
    ];
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles CLOSE_WINDOW', () => {
    const state = [
        {
            id: '9134625317652315',
            type: 'synth'
        }
    ];
    const action = {
        type: actionTypes.CLOSE_WINDOW,
        payload: {
            windowId: '9134625317652315'
        }
    }
    expect(reducer(state, action)).toEqual([]);
});
