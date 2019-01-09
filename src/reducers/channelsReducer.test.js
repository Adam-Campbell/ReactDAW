import * as actionTypes from '../actionTypes';
import reducer from './channelsReducer';
import { 
    UIColors, 
    instrumentTypes, 
    instrumentData,
    effectTypes,
    effectData
} from '../constants';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual([]);
});

test('handles ADD_CHANNEL', () => {
    const action = {
        type: actionTypes.ADD_CHANNEL,
        payload: {
            channelId: '3425612432675942',
            channelName: 'Channel 1',
            channelColor: UIColors.pink,
            instrumentId: '4135926573495216',
            instrumentType: instrumentTypes.default,
            volume: 0,
            isMuted: false, 
            isSolo: false,
            pan: 0
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles REMOVE_CHANNEL', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.REMOVE_CHANNEL,
        payload: {
            channelId: '3425612432675942'
        }
    };
    expect(reducer(state, action)).toEqual([]);
});

test('handles UPDATE_CHANNEL_NAME', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.UPDATE_CHANNEL_NAME,
        payload: {
            channelId: '3425612432675942',
            newChannelName: 'New name'
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'New name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles UPDATE_CHANNEL_COLOR', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.UPDATE_CHANNEL_COLOR,
        payload: {
            channelId: '3425612432675942',
            newChannelColor: UIColors.brightBlue
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.brightBlue,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles ADD_INSTRUMENT', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.ADD_INSTRUMENT,
        payload: {
            instrumentId: '9432673249567328',
            channelId: '3425612432675942',
            type: instrumentTypes.fm,
            instrumentData: instrumentData.fmSynth
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '9432673249567328',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles ADD_EFFECT', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.ADD_EFFECT,
        payload: {
            effectId: '7623194623512496',
            channelId: '3425612432675942',
            type: effectTypes.feedbackDelay,
            effectData: effectData.feedbackDelay
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: ['7623194623512496'],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles REMOVE_EFFECT', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: ['7623194623512496'],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.REMOVE_EFFECT,
        payload: {
            effectId: '7623194623512496',
            channelId: '3425612432675942'
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles ADD_SECTION', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.ADD_SECTION,
        payload: {
            sectionId: '4931623764958634',
            channelId: '3425612432675942',
            sectionObject: {
                id: '4931623764958634',
                channelId: '3425612432675942',
                notes: [],
                start: '0:0:0',
                numberOfBars: 4
            }
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: ['4931623764958634'],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles REMOVE_SECTION', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: ['4931623764958634'],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.REMOVE_SECTION,
        payload: {
            sectionId: '4931623764958634',
            channelId: '3425612432675942'
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Old name',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles UPDATE_CHANNEL_VOLUME', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.UPDATE_CHANNEL_VOLUME,
        payload: {
            channelId: '3425612432675942',
            newChannelVolume: -10
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: -10,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles MUTE_CHANNEL', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.MUTE_CHANNEL,
        payload: {
            channelId: '3425612432675942'
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: true, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles UNMUTE_CHANNEL', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: true, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.UNMUTE_CHANNEL,
        payload: {
            channelId: '3425612432675942'
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles SOLO_CHANNEL', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.SOLO_CHANNEL,
        payload: {
            channelId: '3425612432675942'
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: true,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles UNSOLO_CHANNEL', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: true,
        pan: 0
    }];
    const action = {
        type: actionTypes.UNSOLO_CHANNEL,
        payload: {
            channelId: '3425612432675942'
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles UPDATE_CHANNEL_PAN', () => {
    const state = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0
    }];
    const action = {
        type: actionTypes.UPDATE_CHANNEL_PAN,
        payload: {
            channelId: '3425612432675942',
            newChannelPan: 0.4
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false, 
        isSolo: false,
        pan: 0.4
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles LOAD_STATE_SUCCESS', () => {

    const channelsState =  [
        {
          id: '1898891519900540',
          name: 'Channel 1',
          color: '#00bff3',
          instrumentId: '9773290972781630',
          effectIds: [],
          sectionIds: [
            '1949453727736409',
            '5300333925119662',
            '6301818151930923',
            '9236418249395768'
          ],
          volume: 0,
          isMuted: false,
          isSolo: false,
          pan: 0
        },
        {
          id: '6632170021501903',
          name: 'Channel 2',
          color: '#25e452',
          instrumentId: '3804682348295230',
          effectIds: [],
          sectionIds: [
            '4831517505540843',
            '5619513673121502',
            '3088420498783539',
            '7268086317608197'
          ],
          volume: 0,
          isMuted: false,
          isSolo: false,
          pan: 0
        }
    ];
    const action = {
        type: actionTypes.LOAD_STATE_SUCCESS,
        payload: {
            loadedState: { 
                main: {
                    channels: channelsState
                } 
            }
        }
    }
    expect(reducer(undefined, action)).toEqual(channelsState);
});