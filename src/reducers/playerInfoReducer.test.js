import * as actionTypes from '../actionTypes';
import reducer from './playerInfoReducer';

test('returns the default state', () => {
    const expectedResult = {
        isPlaying: false,
        isPaused: false,
        isMuted: false,
        volume: 0,
        bpm: 120
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
        volume: 0,
        bpm: 120
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles STOP_TRACK', () => {
    const state = {
        isPlaying: true,
        isPaused: false,
        isMuted: false,
        volume: 0,
        bpm: 120
    };
    const action = {
        type: actionTypes.STOP_TRACK,
    };
    const expectedResult = {
        isPlaying: false,
        isPaused: false,
        isMuted: false,
        volume: 0,
        bpm: 120
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles MUTE_MASTER', () => {
    const action = {
        type: actionTypes.MUTE_MASTER,
    };
    const expectedResult = {
        isPlaying: false,
        isPaused: false,
        isMuted: true,
        volume: 0,
        bpm: 120
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles UNMUTE_MASTER', () => {
    const state = {
        isPlaying: false,
        isPaused: false,
        isMuted: true,
        volume: 0,
        bpm: 120
    };
    const action = {
        type: actionTypes.UNMUTE_MASTER,
    };
    const expectedResult = {
        isPlaying: false,
        isPaused: false,
        isMuted: false,
        volume: 0,
        bpm: 120
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles SET_MASTER_VOLUME', () => {
    const action = {
        type: actionTypes.SET_MASTER_VOLUME,
        payload: {
            volume: -10
        }
    };
    const expectedResult = {
        isPlaying: false,
        isPaused: false,
        isMuted: false,
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
        isPlaying: false,
        isPaused: false,
        isMuted: false,
        volume: 0,
        bpm: 135
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});