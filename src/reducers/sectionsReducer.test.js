import * as actionTypes from '../actionTypes';
import reducer from './sectionsReducer';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles ADD_SECTION', () => {
    const action = {
        type: actionTypes.ADD_SECTION,
        payload: {
            sectionId: '9431642546267546',
            channelId: '1643246346597842',
            sectionObject: {
                id: '9431642546267546',
                channelId: '1643246346597842',
                notes: [],
                start: '0:0:0',
                numberOfBars: 4
            }
        }
    };
    const expectedResult = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles REMOVE_SECTION', () => {
    const state = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    const action = {
        type: actionTypes.REMOVE_SECTION,
        payload: {
            sectionId: '9431642546267546',
            channelId: '1643246346597842'
        }
    };
    expect(reducer(state, action)).toEqual({});
});

test('handles REMOVE_CHANNEL', () => {
    const state = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    const action = {
        type: actionTypes.REMOVE_CHANNEL, 
        payload: {
            channelId: '1643246346597842'
        } 
    };
    expect(reducer(state, action)).toEqual({});
});

test('handles ADD_NOTE', () => {
    const state = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    const action = {
        type: actionTypes.ADD_NOTE,
        payload: {
            sectionId: '9431642546267546',
            noteObject: {
                pitch: 'D#4',
                time: '0:0:0',
                duration: '0:0:1',
                velocity: 1,
                _id: '5975168716123022',
                x: 0,
                y: 896,
                width: 24
            }
        }
    };
    const expectedResult = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [
                {
                    pitch: 'D#4',
                    time: '0:0:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '5975168716123022',
                    x: 0,
                    y: 896,
                    width: 24
                }
            ],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles REMOVE_NOTE', () => {
    const state = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [
                {
                    pitch: 'D#4',
                    time: '0:0:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '5975168716123022',
                    x: 0,
                    y: 896,
                    width: 24
                }
            ],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    const action = {
        type: actionTypes.REMOVE_NOTE,
        payload: {
            sectionId: '9431642546267546',
            noteId: '5975168716123022'
        }
    };
    const expectedResult = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles ADD_NOTES', () => {
    const state = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    const action = {
        type: actionTypes.ADD_NOTES,
        payload: {
            sectionId: '9431642546267546',
            noteObjects: [
                {
                    pitch: 'D#4',
                    time: '0:0:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '5975168716123022',
                    x: 0,
                    y: 896,
                    width: 24
                },
                {
                    pitch: 'F4',
                    time: '0:2:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '0150869415495689',
                    x: 192,
                    y: 864,
                    width: 24
                }
            ]
        }
    };
    const expectedResult = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [
                {
                    pitch: 'D#4',
                    time: '0:0:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '5975168716123022',
                    x: 0,
                    y: 896,
                    width: 24
                },
                {
                    pitch: 'F4',
                    time: '0:2:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '0150869415495689',
                    x: 192,
                    y: 864,
                    width: 24
                  }
            ],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles REMOVE_NOTES', () => {
    const state = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [
                {
                    pitch: 'D#4',
                    time: '0:0:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '5975168716123022',
                    x: 0,
                    y: 896,
                    width: 24
                },
                {
                    pitch: 'F4',
                    time: '0:2:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '0150869415495689',
                    x: 192,
                    y: 864,
                    width: 24
                  }
            ],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    const action = {
        type: actionTypes.REMOVE_NOTES,
        payload: {
            sectionId: '9431642546267546',
            noteIds: ['5975168716123022', '0150869415495689']
        }
    };
    const expectedResult = {
        '9431642546267546': {
            id: '9431642546267546',
            channelId: '1643246346597842',
            notes: [],
            start: '0:0:0',
            numberOfBars: 4
        }
    };
    expect(reducer(state, action)).toEqual(expectedResult);
});

test('handles LOAD_STATE_SUCCESS', () => {
    const sectionsState = {
        '1949453727736409': {
            id: '1949453727736409',
            channelId: '1898891519900540',
            notes: [
                {
                    pitch: 'E4',
                    time: '0:0:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '3830917555872945',
                    x: 0,
                    y: 880,
                    width: 24
                },
                {
                    pitch: 'F#4',
                    time: '0:1:0',
                    duration: '0:0:1',
                    velocity: 1,
                    _id: '8929406947762571',
                    x: 96,
                    y: 848,
                    width: 24
                }
            ],
            start: '0:0:0',
            numberOfBars: 1
        },
        '5300333925119662': {
            id: '5300333925119662',
            channelId: '1898891519900540',
            notes: [],
            start: '2:0:0',
            numberOfBars: 1
        },
        '6301818151930923': {
            id: '6301818151930923',
            channelId: '1898891519900540',
            notes: [],
            start: '4:0:0',
            numberOfBars: 1
        },
        '9236418249395768': {
            id: '9236418249395768',
            channelId: '1898891519900540',
            notes: [],
            start: '6:0:0',
            numberOfBars: 1
        }
    };
    const action = {
        type: actionTypes.LOAD_STATE_SUCCESS,
        payload: {
            loadedState: { 
                sections: sectionsState 
            }
        }
    }
    expect(reducer(undefined, action)).toEqual(sectionsState);
});