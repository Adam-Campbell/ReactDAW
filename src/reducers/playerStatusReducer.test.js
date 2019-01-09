import * as actionTypes from '../actionTypes';
import reducer from './playerStatusReducer';

test('returns the default state', () => {
    const expectedResult = {
        isPlaying: false,
        isPaused: false,
        isMuted: false,
    };
    expect(reducer(undefined, {})).toEqual(expectedResult);
});

test('handles PLAY_TRACK', () => {
    const action = {
        type: actionTypes.PLAY_TRACK,
    };
    const expectedResult = {
        isPlaying: true,
        isPaused: false,
        isMuted: false,
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles STOP_TRACK', () => {
    const state = {
        isPlaying: true,
        isPaused: false,
        isMuted: false,
    };
    const action = {
        type: actionTypes.STOP_TRACK,
    };
    const expectedResult = {
        isPlaying: false,
        isPaused: false,
        isMuted: false,
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles LOAD_STATE_SUCCESS', () => {
    const playerState = {
        isPlaying: false,
        isPaused: false,
        isMuted: false,
    };
    const action = {
        type: actionTypes.LOAD_STATE_SUCCESS,
        payload: {
            loadedState: { 
                playerStatus: playerState 
            }
        }
    };
    expect(reducer(undefined, action)).toEqual(playerState);
});