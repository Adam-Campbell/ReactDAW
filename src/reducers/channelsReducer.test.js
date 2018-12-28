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
            instrumentType: instrumentTypes.default
        }
    };
    const expectedResult = [{
        id: '3425612432675942',
        name: 'Channel 1',
        color: UIColors.pink,
        instrumentId: '4135926573495216',
        effectIds: [],
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: []
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
        sectionIds: ['4931623764958634']
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
        sectionIds: ['4931623764958634']
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
        sectionIds: []
    }];
    expect(reducer(state, action)).toEqual(expectedResult);
});