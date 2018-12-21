import { 
    addOrRemoveElementFromSelection,
    createCopiedSectionsDataStructure
} from './ComposerUtils';

describe('addOrRemoveElementFromSelection', () => {
    test('adds an element without preserving the other elements', () => {
        const result = addOrRemoveElementFromSelection({
            currentSelectionState: ['6210905950202024', '1776722049097450', '7295761306399754'],
            element: '5332123161005391',
            shouldPreserveSelection: false
        });
        expect(result).toEqual(['5332123161005391']);
    });
    test('removes an element without preserving the other elements', () => {
        const result = addOrRemoveElementFromSelection({
            currentSelectionState: ['6210905950202024', '1776722049097450', '7295761306399754'],
            element: '7295761306399754',
            shouldPreserveSelection: false
        });
        expect(result).toEqual([]);
    });
    test('adds an element whilst preserving the other elements', () => {
        const result = addOrRemoveElementFromSelection({
            currentSelectionState: ['6210905950202024', '1776722049097450', '7295761306399754'],
            element: '5332123161005391',
            shouldPreserveSelection: true
        });
        expect(result).toEqual([
            '6210905950202024', 
            '1776722049097450', 
            '7295761306399754',
            '5332123161005391'
        ]);
    });
    test('removes an element whilst preserving the other elements', () => {
        const result = addOrRemoveElementFromSelection({
            currentSelectionState: ['6210905950202024', '1776722049097450', '7295761306399754'],
            element: '7295761306399754',
            shouldPreserveSelection: true
        });
        expect(result).toEqual(['6210905950202024', '1776722049097450']);
    });
});

describe('createCopiedSectionsDataStructure', () => {
    test('correctly creates and returns the desired data structure', () => {
        const channelsState = [
            {
              id: '1146587645959972',
              name: 'Channel 1',
              color: '#00bff3',
              instrumentId: '4670010528826357',
              effectIds: [],
              sectionIds: [
                '3873914619840634',
                '5586134390473357',
                '4928704574589138'
              ]
            },
            {
              id: '2532017111888654',
              name: 'Channel 2',
              color: '#f4ab54',
              instrumentId: '7909979211308588',
              effectIds: [],
              sectionIds: [
                '5208036813028087',
                '6955590810822236',
                '9199138957540981'
              ]
            },
            {
              id: '8988686808971398',
              name: 'Channel 3',
              color: '#d86597',
              instrumentId: '9916153873524561',
              effectIds: [],
              sectionIds: []
            }
        ];
        const sectionsState = {
            '5208036813028087': {
              id: '5208036813028087',
              channelId: '2532017111888654',
              notes: [],
              start: '0:0:0',
              numberOfBars: 4
            },
            '6955590810822236': {
              id: '6955590810822236',
              channelId: '2532017111888654',
              notes: [],
              start: '4:0:0',
              numberOfBars: 4
            },
            '3873914619840634': {
              id: '3873914619840634',
              channelId: '1146587645959972',
              notes: [],
              start: '4:0:0',
              numberOfBars: 1
            },
            '5586134390473357': {
              id: '5586134390473357',
              channelId: '1146587645959972',
              notes: [],
              start: '6:0:0',
              numberOfBars: 1
            },
            '4928704574589138': {
              id: '4928704574589138',
              channelId: '1146587645959972',
              notes: [],
              start: '8:0:0',
              numberOfBars: 2
            },
            '9199138957540981': {
              id: '9199138957540981',
              channelId: '2532017111888654',
              notes: [],
              start: '10:0:0',
              numberOfBars: 2
            }
        };
        const selectionState = [
            '5208036813028087', 
            '3873914619840634',
            '5586134390473357',
            '9199138957540981',
        ];
        const expectedResult = {
            lowestIndex: 0,
            sectionObjects: [
                {
                    id: '5208036813028087',
                    channelIndex: 1,
                    notes: [],
                    start: '0:0:0',
                    numberOfBars: 4
                },
                {
                    id: '3873914619840634',
                    channelIndex: 0,
                    notes: [],
                    start: '4:0:0',
                    numberOfBars: 1
                },
                {
                    id: '5586134390473357',
                    channelIndex: 0,
                    notes: [],
                    start: '6:0:0',
                    numberOfBars: 1
                },
                {
                    id: '9199138957540981',
                    channelIndex: 1,
                    notes: [],
                    start: '10:0:0',
                    numberOfBars: 2
                }
            ]
        };
        const result = createCopiedSectionsDataStructure({
            currentSelectionState: selectionState,
            allSections: sectionsState,
            allChannels: channelsState
        });
        expect(result).toEqual(expectedResult);
    });
});





// {
//     sectionInfo: {
//       notes: []
//     },
//     playerInfo: {
//       isPlaying: false,
//       isMuted: false,
//       volume: 0,
//       bpm: 120
//     },
//     activeWindows: [],
//     channels: [
//       {
//         id: '1146587645959972',
//         name: 'Channel 1',
//         color: '#00bff3',
//         instrumentId: '4670010528826357',
//         effectIds: [],
//         sectionIds: [
//           '3873914619840634',
//           '5586134390473357',
//           '4928704574589138'
//         ]
//       },
//       {
//         id: '2532017111888654',
//         name: 'Channel 2',
//         color: '#f4ab54',
//         instrumentId: '7909979211308588',
//         effectIds: [],
//         sectionIds: [
//           '5208036813028087',
//           '6955590810822236',
//           '9199138957540981'
//         ]
//       },
//       {
//         id: '8988686808971398',
//         name: 'Channel 3',
//         color: '#d86597',
//         instrumentId: '9916153873524561',
//         effectIds: [],
//         sectionIds: []
//       }
//     ],
//     sections: {
//       '5208036813028087': {
//         id: '5208036813028087',
//         channelId: '2532017111888654',
//         notes: [],
//         start: '0:0:0',
//         numberOfBars: 4
//       },
//       '6955590810822236': {
//         id: '6955590810822236',
//         channelId: '2532017111888654',
//         notes: [],
//         start: '4:0:0',
//         numberOfBars: 4
//       },
//       '3873914619840634': {
//         id: '3873914619840634',
//         channelId: '1146587645959972',
//         notes: [],
//         start: '4:0:0',
//         numberOfBars: 1
//       },
//       '5586134390473357': {
//         id: '5586134390473357',
//         channelId: '1146587645959972',
//         notes: [],
//         start: '6:0:0',
//         numberOfBars: 1
//       },
//       '4928704574589138': {
//         id: '4928704574589138',
//         channelId: '1146587645959972',
//         notes: [],
//         start: '8:0:0',
//         numberOfBars: 2
//       },
//       '9199138957540981': {
//         id: '9199138957540981',
//         channelId: '2532017111888654',
//         notes: [],
//         start: '10:0:0',
//         numberOfBars: 2
//       }
//     },
//     instruments: {
//       '4670010528826357': {
//         id: '4670010528826357',
//         channelId: '1146587645959972',
//         type: 'synth',
//         synthData: {
//           envelope: {
//             attack: 0.005,
//             attackCurve: 'linear',
//             decay: 0.1,
//             release: 1,
//             releaseCurve: 'exponential',
//             sustain: 0.3
//           },
//           oscillator: {
//             detune: 0,
//             mute: false,
//             phase: 0,
//             type: 'triangle',
//             volume: 0
//           },
//           portamento: 0,
//           volume: 0
//         }
//       },
//       '7909979211308588': {
//         id: '7909979211308588',
//         channelId: '2532017111888654',
//         type: 'fmSynth',
//         synthData: {
//           detune: 0,
//           envelope: {
//             attack: 0.01,
//             attackCurve: 'linear',
//             decay: 0.01,
//             release: 0.5,
//             releaseCurve: 'exponential',
//             sustain: 1
//           },
//           harmonicity: 3,
//           modulation: {
//             detune: 0,
//             mute: false,
//             phase: 0,
//             type: 'square',
//             volume: 0
//           },
//           modulationEnvelope: {
//             attack: 0.5,
//             attackCurve: 'linear',
//             decay: 0,
//             release: 0.5,
//             releaseCurve: 'exponential',
//             sustain: 1
//           },
//           modulationIndex: 10,
//           oscillator: {
//             detune: 0,
//             mute: false,
//             phase: 0,
//             type: 'triangle',
//             volume: 0
//           },
//           portamento: 0,
//           volume: 0
//         }
//       },
//       '9916153873524561': {
//         id: '9916153873524561',
//         channelId: '8988686808971398',
//         type: 'monoSynth',
//         synthData: {
//           detune: 0,
//           envelope: {
//             attack: 0.005,
//             attackCurve: 'linear',
//             decay: 0.1,
//             release: 1,
//             releaseCurve: 'exponential',
//             sustain: 0.9
//           },
//           filter: {
//             Q: 6,
//             frequency: 350,
//             gain: 0,
//             rolloff: -24,
//             type: 'lowpass'
//           },
//           filterEnvelope: {
//             attack: 0.06,
//             attackCurve: 'linear',
//             baseFrequency: 200,
//             decay: 0.2,
//             exponent: 2,
//             octaves: 7,
//             release: 2,
//             releaseCurve: 'exponential',
//             sustain: 0.5
//           },
//           oscillator: {
//             detune: 0,
//             mute: false,
//             phase: 0,
//             type: 'square',
//             volume: 0
//           },
//           portamento: 0,
//           volume: 0
//         }
//       }
//     },
//     effects: {}
//   }