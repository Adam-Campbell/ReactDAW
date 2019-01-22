import * as actionTypes from '../actionTypes';
import reducer from './settingsReducer';
import { toolTypes, snapSettings, noteDurationSettings } from '../constants';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({
        toolType: toolTypes.cursor,
        snap: snapSettings._16n,
        noteDuration: noteDurationSettings._16n
    });
});

test('handles SET_TOOL_TYPE', () => {
    expect(reducer(undefined, {
        type: actionTypes.SET_TOOL_TYPE,
        payload: {
            newToolType: toolTypes.pencil
        }
    })).toEqual({
      toolType: toolTypes.pencil,
      snap: snapSettings._16n,
      noteDuration: noteDurationSettings._16n  
    });
});

test('handles SET_SNAP', () => {
    expect(reducer(undefined, {
        type: actionTypes.SET_SNAP,
        payload: {
            newSnapValue: snapSettings._8n
        }
    })).toEqual({
        toolType: toolTypes.cursor,
        snap: snapSettings._8n,
        noteDuration: noteDurationSettings._16n
    });
});

test('handles SET_NOTE_DURATION', () => {
    expect(reducer(undefined, {
        type: actionTypes.SET_NOTE_DURATION,
        payload: {
            newNoteDurationValue: noteDurationSettings._8n
        }
    })).toEqual({
        toolType: toolTypes.cursor,
        snap: snapSettings._16n,
        noteDuration: noteDurationSettings._8n
    });
});

