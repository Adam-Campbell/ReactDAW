import * as actionTypes from '../actionTypes';
import reducer from './instrumentsReducer';
import { 
    instrumentTypes, 
    instrumentData,
    UIColors 
} from '../constants';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles ADD_INSTRUMENT', () => {
    const action = {
        type: actionTypes.ADD_INSTRUMENT,
        payload: {
            instrumentId: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: instrumentData.synth
        }
    };
    const expectedResult = {
        '6432676162483295': {
            id: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: instrumentData.synth
        }
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles REMOVE_INSTRUMENT', () => {
    const state = {
        '6432676162483295': {
            id: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: instrumentData.synth
        }
    };
    const action = {
        type: actionTypes.REMOVE_INSTRUMENT,
        payload: {
            instrumentId: '6432676162483295'
        }
    };
    expect(reducer(state, action)).toEqual({});
});

test('handles UPDATE_INSTRUMENT_SETTINGS', () => {
    const state = {
        '6432676162483295': {
            id: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: instrumentData.synth
        }
    };
    const action = {
        type: actionTypes.UPDATE_INSTRUMENT_SETTINGS,
        payload: {
            instrumentId: '6432676162483295',
            instrumentData: {
                envelope: {
                    attack: 0.005,
                    attackCurve: 'linear',
                    decay: 0.1,
                    release: 1,
                    releaseCurve: 'exponential',
                    sustain: 0.3
                },
                oscillator: {
                    detune: 0,
                    mute: false,
                    phase: 0,
                    type: 'sawtooth',
                    volume: -10
                },
                portamento: 0,
                volume: 0
            } 
        }
    };
    const expectedResult = {
        '6432676162483295': {
            id: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: {
                envelope: {
                    attack: 0.005,
                    attackCurve: 'linear',
                    decay: 0.1,
                    release: 1,
                    releaseCurve: 'exponential',
                    sustain: 0.3
                },
                oscillator: {
                    detune: 0,
                    mute: false,
                    phase: 0,
                    type: 'sawtooth',
                    volume: -10
                },
                portamento: 0,
                volume: 0
            }
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles UPDATE_ONE_INSTRUMENT_SETTING', () => {
    const state = {
        '6432676162483295': {
            id: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: instrumentData.synth
        }
    };
    const action = {
        type: actionTypes.UPDATE_ONE_INSTRUMENT_SETTING,
        payload: {
            instrumentId: '6432676162483295',
            propertyPathArray: ['oscillator', 'type'],
            newValue: 'sawtooth'
        }
    };
    const expectedResult = {
        '6432676162483295': {
            id: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: {
                envelope: {
                    attack: 0.005,
                    attackCurve: 'linear',
                    decay: 0.1,
                    release: 1,
                    releaseCurve: 'exponential',
                    sustain: 0.3
                },
                oscillator: {
                    detune: 0,
                    mute: false,
                    phase: 0,
                    type: 'sawtooth',
                    volume: 0
                },
                portamento: 0,
                volume: 0
            }
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles ADD_CHANNEL', () => {
    const action = {
        type: actionTypes.ADD_CHANNEL,
        payload: {
            channelId: '7613264953265135',
            channelName: 'New channel',
            channelColor: UIColors.brightRed,
            instrumentId: '6432676162483295',
            instrumentType: instrumentTypes.default
        }
    };
    const expectedResult = {
        '6432676162483295': {
            id: '6432676162483295',
            channelId: '7613264953265135',
            type: instrumentTypes.default,
            instrumentData: instrumentData.synth
        }
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles LOAD_STATE_SUCCESS', () => {
    const instrumentsState = {
        '9773290972781630': {
            id: '9773290972781630',
            channelId: '1898891519900540',
            type: 'synth',
            instrumentData: {
                envelope: {
                    attack: 0.005,
                    attackCurve: 'linear',
                    decay: 0.1,
                    release: 1,
                    releaseCurve: 'exponential',
                    sustain: 0.3
                },
                oscillator: {
                    detune: 0,
                    mute: false,
                    phase: 0,
                    type: 'triangle',
                    volume: 0
                },
                portamento: 0,
                volume: 0
            }
        },
        '3804682348295230': {
            id: '3804682348295230',
            channelId: '6632170021501903',
            type: 'fmSynth',
            instrumentData: {
                detune: 0,
                envelope: {
                    attack: 0.01,
                    attackCurve: 'linear',
                    decay: 0.01,
                    release: 0.5,
                    releaseCurve: 'exponential',
                    sustain: 1
                },
                harmonicity: 3,
                modulation: {
                    detune: 0,
                    mute: false,
                    phase: 0,
                    type: 'square',
                    volume: 0
                },
                modulationEnvelope: {
                    attack: 0.5,
                    attackCurve: 'linear',
                    decay: 0,
                    release: 0.5,
                    releaseCurve: 'exponential',
                    sustain: 1
                },
                modulationIndex: 10,
                oscillator: {
                    detune: 0,
                    mute: false,
                    phase: 0,
                    type: 'triangle',
                    volume: 0
                },
                portamento: 0,
                volume: 0
            }
        }
    };
    const action = {
        type: actionTypes.LOAD_STATE_SUCCESS,
        payload: {
            loadedState: { 
                main: {
                    instruments: instrumentsState 
                }
            }
        }
    };
    expect(reducer(undefined, action)).toEqual(instrumentsState);
}); 