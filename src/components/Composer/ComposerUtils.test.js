import { 
    createCopiedSectionsDataStructure,
    findEarliestStartTime,
    createGridLinesArray,
    createSectionRectsArray,
    createSectionObject
} from './ComposerUtils';

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

describe('createCopiedSectionsDataStructure', () => {
    test('correctly creates and returns the desired data structure', () => {
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


describe('findEarliestStartTime', () => {
    test('correctly identifies the earliest start time from the provided section objects', () => {
        const sectionObjects = [
            {
                id: '5586134390473357',
                channelIndex: 0,
                notes: [],
                start: '6:0:0',
                numberOfBars: 1
            },
            {
                id: '3873914619840634',
                channelIndex: 0,
                notes: [],
                start: '4:0:0',
                numberOfBars: 1
            },
            {
                id: '5208036813028087',
                channelIndex: 1,
                notes: [],
                start: '1:0:0',
                numberOfBars: 4
            },
            {
                id: '9199138957540981',
                channelIndex: 1,
                notes: [],
                start: '10:0:0',
                numberOfBars: 2
            }
        ];
        const result = findEarliestStartTime(sectionObjects);
        expect(result).toBe('1:0:0');
    });
    test('returns null if called with an empty array', () => {
        const result = findEarliestStartTime([]);
        expect(result).toBe(null);
    });
});

describe('createGridLinesArray', () => {
    test('correctly creates and returns the array', () => {
        const result1 = createGridLinesArray({
            canvasHeight: 320,
            canvasWidth: 9600,
            channelsArrayLength: 0 
        });
        expect(result1).toMatchSnapshot();
        const result2 = createGridLinesArray({
            canvasHeight: 530,
            canvasWidth: 12000,
            channelsArrayLength: 7
        });
        expect(result2).toMatchSnapshot();
    });
});

describe('createSectionRectsArray', () => {
    test('correctly creates and returns the array', () => {
        const result = createSectionRectsArray({
            allChannels: channelsState,
            allSections: sectionsState
        });
        expect(result).toMatchSnapshot();
    });
});

describe('createSectionObject', () => {
    test('correctly creates and returns the section object if the inputs are valid', () => {
        const result = createSectionObject({
            x: 96,
            y: 220,
            allChannels: channelsState,
            numberOfBars: 2
        });
        expect(result.channelId).toBe('8988686808971398');
        expect(result.numberOfBars).toBe(2);
        expect(result.start).toBe('2:0:0');
    });
    test('returns null if the inputs are not valid', () => {
        const result = createSectionObject({
            x: 48,
            y: 350,
            allChannels: channelsState,
            numberOfBars: 6
        });
        expect(result).toBe(null);
    });
});
