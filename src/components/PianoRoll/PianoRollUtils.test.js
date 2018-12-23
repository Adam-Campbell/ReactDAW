import Tone from 'tone';
import {
    createSelectedAndUnselectedNoteArrays,
    getTransportLineAttrs,
    createPitchesArray,
    createGridLinesArray,
    isValidNote,
    calculateNoteInfo,
    createTransportBarNumbersArray,
    swapSelectedNoteIds,
    shiftPitchUp,
    shiftPitchDown,
    shiftTimeBackwards,
    shiftTimeForwards,
    getNoteIdsForSelectionRange,
    getNoteDurationFromPencilOperation,
    generateNoteObjectForPasting,
    getSortedNoteDataStructs,
    getFirstAvailablePitchInChord
} from './PianoRollUtils';

import { transportPositionStringToSixteenths } from '../../sharedUtils';

jest.mock('tone');


describe('createSelectedAndUnselectedNoteArrays', () => {
    const arrayOfNoteIds = ['15769432', '96532156', '46132489'];
    const note1 = { 
        pitch: 'G4', 
        time: '0:0:0', 
        duration: '0:0:1', 
        velocity: 1,
        _id: '15769432',
        x: 0,
        y: 48,
        width: 16
    };
    const note2 = {
        pitch: 'C#4',
        time: '0:0:3',
        duration: '0:1:0',
        velocity: 1,
        _id: '51137446',
        x: 96,
        y: 160,
        width: 48
    };
    const note3 = {
        pitch: 'E5',
        time: '0:3:3',
        duration: '1:1:2',
        velocity: 0.75,
        _id: '96532156',
        x: 160,
        y: 82,
        width: 60
    };
    const note4 = {
        pitch: 'F3',
        time: '1:0:1',
        duration: '0:2:0',
        velocity: 0.85,
        _id: '64329316',
        x: 120,
        y: 16,
        width: 80
    };
    const note5 = {
        pitch: 'A7',
        time: '0:2:3',
        duration: '0:0:3',
        velocity: 0.4,
        _id: '46132489',
        x: 182,
        y: 32,
        width: 96
    };
    const arrayOfNoteObjects = [ note1, note2, note3, note4, note5 ];

    test('correctly sorts the note objects according to the array of note ids supplied', () => {
        const result = createSelectedAndUnselectedNoteArrays({
            currentlySelectedNotes: arrayOfNoteIds,
            allSectionNotes: arrayOfNoteObjects
        });
        expect(result.selectedNotes).toHaveLength(3);
        expect(result.selectedNotes).toContainEqual(note1);
        expect(result.selectedNotes).toContainEqual(note3);
        expect(result.selectedNotes).toContainEqual(note5);

        expect(result.unselectedNotes).toHaveLength(2);
        expect(result.unselectedNotes).toContainEqual(note2);
        expect(result.unselectedNotes).toContainEqual(note4);
    });
    test('sorts correctly even if called with an empty note id array', () => {
        const result = createSelectedAndUnselectedNoteArrays({
            currentlySelectedNotes: [],
            allSectionNotes: arrayOfNoteObjects
        });
        expect(result.selectedNotes).toHaveLength(0);
        expect(result.unselectedNotes).toHaveLength(5);
        expect(result.unselectedNotes).toContainEqual(note1);
        expect(result.unselectedNotes).toContainEqual(note2);
        expect(result.unselectedNotes).toContainEqual(note3);
        expect(result.unselectedNotes).toContainEqual(note4);
        expect(result.unselectedNotes).toContainEqual(note5);
    });
});

describe('getTransportLineAttrs', () => {
    test('returns expected output when the current transport position is outside of section', () => {
        const result = getTransportLineAttrs({
            sectionStart: '4:0:0',
            sectionBars: 2,
            currentTransportPosition: '3:1:2.164'
        });
        expect(result).toEqual({ xPos: -96, strokeWidth: 0 });
    });
    test('returns the correct value when current transport position is within section', () => {
        const result = getTransportLineAttrs({
            sectionStart: '2:0:0',
            sectionBars: 4,
            currentTransportPosition: '2:3:1'
        });
        expect(result).toEqual({ xPos: 312, strokeWidth: 2 });
    });
});

describe('createPitchesArray', () => {
    test('correctly creates the pitches array', () => {
        const result = createPitchesArray();
        expect(result).toHaveLength(108);
        expect(result).toMatchSnapshot();
    });
});

describe('createGridLinesArray', () => {
    Tone.Ticks.mockImplementation((input) => {
        switch (input) {
            case '16n':
                return 48;
            case '8n':
                return 96;
            default:
                return 48;
        }
    });
    test('correctly creates the array of grid lines data objects', () => {
        const result = createGridLinesArray({
            sectionBars: 4,
            canvasWidth: 1536,
            canvasGridHeight: 1728,
            currentQuantizeValue: '16n',
        });
        expect(result).toHaveLength(174);
    });
    test('alters its output correctly for different quantize values supplied', () => {
        const result = createGridLinesArray({
            sectionBars: 4,
            canvasWidth: 1536,
            canvasGridHeight: 1728,
            currentQuantizeValue: '8n',
        });
        expect(result).toHaveLength(142);
    });
});

describe('isValidNote', () => {
    Tone.Time.mockImplementation(input => {
        const toBBS = transportPositionStringToSixteenths(input);
        return {
            BBSValue: toBBS,
            toTicks: function() {
                return this.BBSValue * 48
            }
        }
    });
    const allSectionNotes = [
        {
            pitch: 'G5',
            time: '0:1:0',
            duration: '0:1:0',
            velocity: 1,
            _id: '3026759361591377',
            x: 96,
            y: 640,
            width: 96
        },
        {
            pitch: 'A5',
            time: '0:2:0',
            duration: '0:1:0',
            velocity: 1,
            _id: '0982452036643140',
            x: 192,
            y: 608,
            width: 96
        }
    ]
    test('correctly identifies that a note is valid', () => {
        const noteToCheck = {
            pitch: 'A5',
            time: '0:1:0',
            duration: '0:1:0',
            velocity: 1,
            _id: '2636642221506882',
            x: 96,
            y: 608,
            width: 96
        };
        const result = isValidNote({ noteToCheck, allSectionNotes });
        expect(result).toBe(true);
    }); 
    test('correctly identifies that a note is invalid', () => {
        const noteToCheck = {
            pitch: 'A5',
            time: '0:1:2',
            duration: '0:1:0',
            velocity: 1,
            _id: '9637057747336235',
            x: 144,
            y: 608,
            width: 96
        };
        const result = isValidNote({ noteToCheck, allSectionNotes });
        expect(result).toBe(false);
    });
});

describe('createTransportBarNumbersArray', () => {
    test('correctly creates the transport bar numbers array', () => {
        const result = createTransportBarNumbersArray({
            sectionStart: '0:0:0',
            sectionBars: 4
        });
        expect(result).toHaveLength(4);
        expect(result).toMatchSnapshot();
    });
    test('correctly adjusts for different sectionStart values', () => {
        const result = createTransportBarNumbersArray({
            sectionStart: '2:0:0',
            sectionBars: 4
        });
        expect(result).toHaveLength(4);
        expect(result).toMatchSnapshot();
    });
    test('correctly adjusts for different sectionBars values', () => {
        const result = createTransportBarNumbersArray({
            sectionStart: '0:0:0',
            sectionBars: 2
        });
        expect(result).toHaveLength(2);
        expect(result).toMatchSnapshot();
    });
});

describe('swapSelectedNoteIds', () => {
    test('correctly adds and removes note ids', () => {
        const result = swapSelectedNoteIds({
            selectedNotesState: ['16439462', '64831564', '16432765', '43867951', '53294613'],
            newNoteIds: ['82643715', '76231462'],
            oldNoteIds: ['64831564', '16432765', '53294613']
        });
        expect(result).toHaveLength(4);
        expect(result).toContain('16439462');
        expect(result).toContain('43867951');
        expect(result).toContain('82643715');
        expect(result).toContain('76231462');
    });
});

describe('shiftPitchUp', () => {
    const pitchesArray = createPitchesArray();
    test('returns new note object with necessary properties updated, the others left intact', () => {
        const result = shiftPitchUp(pitchesArray)({
            pitch: 'D#7',
            time: '0:0:1',
            duration: '0:0:1',
            velocity: 1,
            _id: '8553388042343549',
            x: 24,
            y: 320,
            width: 24
        });
        expect(result.pitch).toBe('E7');
        expect(result.time).toBe('0:0:1');
        expect(result.duration).toBe('0:0:1');
        expect(result.velocity).toBe(1);
        expect(result._id).not.toBe('8553388042343549');
        expect(result.x).toBe(24);
        expect(result.y).toBe(304);
        expect(result.width).toBe(24);
    });
    test('will not allow the note to be raised above the maximum pitch', () => {
        const result = shiftPitchUp(pitchesArray)({
            pitch: 'B8',
            time: '0:0:0',
            duration: '0:1:0',
            velocity: 1,
            _id: '8262620059497713',
            x: 0,
            y: 0,
            width: 96
        });
        expect(result.pitch).toBe('B8');
        expect(result.time).toBe('0:0:0');
        expect(result.duration).toBe('0:1:0');
        expect(result.velocity).toBe(1);
        expect(result._id).not.toBe('8262620059497713');
        expect(result.x).toBe(0);
        expect(result.y).toBe(0);
        expect(result.width).toBe(96);
    });
});

describe('shiftPitchDown', () => {
    const pitchesArray = createPitchesArray();
    test('returns new note object with necessary properties updated, the others left intact', () => {
        const result = shiftPitchDown(pitchesArray)({
            pitch: 'C5',
            time: '0:2:0',
            duration: '0:2:0',
            velocity: 1,
            _id: '1478393552612657',
            x: 192,
            y: 752,
            width: 192
        });
        expect(result.pitch).toBe('B4');
        expect(result.time).toBe('0:2:0');
        expect(result.duration).toBe('0:2:0');
        expect(result.velocity).toBe(1);
        expect(result._id).not.toBe('1478393552612657');
        expect(result.x).toBe(192);
        expect(result.y).toBe(768);
        expect(result.width).toBe(192);
    });
    test('will not allow the note to be lowered below the minimum pitch', () => {
        const result = shiftPitchDown(pitchesArray)({
            pitch: 'C0',
            time: '0:0:0',
            duration: '0:0:2',
            velocity: 1,
            _id: '8174600351307522',
            x: 0,
            y: 1712,
            width: 48
        });
        expect(result.pitch).toBe('C0');
        expect(result.time).toBe('0:0:0');
        expect(result.duration).toBe('0:0:2');
        expect(result.velocity).toBe(1);
        expect(result._id).not.toBe('8174600351307522');
        expect(result.x).toBe(0);
        expect(result.y).toBe(1712);
        expect(result.width).toBe(48);
    });
});

describe('getNoteIdsForSelectionRange', () => {
    const note1 = {
        pitch: 'C#8',
        time: '0:1:0',
        duration: '0:1:0',
        velocity: 1,
        _id: '6585516842245423',
        x: 96,
        y: 160,
        width: 96
    };
    const note2 = {
        pitch: 'B7',
        time: '0:2:0',
        duration: '0:1:0',
        velocity: 1,
        _id: '2967216659318915',
        x: 192,
        y: 192,
        width: 96
    };
    const note3 = {
        pitch: 'A7',
        time: '1:0:0',
        duration: '0:1:0',
        velocity: 1,
        _id: '9380965318265948',
        x: 384,
        y: 224,
        width: 96
    };
    const allNotes = [note1, note2, note3];

    test('correctly captures notes that are within the selection range', () => {
        const result = getNoteIdsForSelectionRange({
            verticalSelectionBound1: 155,
            verticalSelectionBound2: 223,
            horizontalSelectionBound1: 73,
            horizontalSelectionBound2: 293,
            allNotes
        });
        expect(result).toHaveLength(2);
        expect(result).toContain('6585516842245423');
        expect(result).toContainEqual('2967216659318915');
    });
    test('still captures notes even if they are only partly in range', () => {
        const result = getNoteIdsForSelectionRange({
            verticalSelectionBound1: 155,
            verticalSelectionBound2: 223,
            horizontalSelectionBound1: 128,
            horizontalSelectionBound2: 293,
            allNotes
        });
        expect(result).toHaveLength(2);
        expect(result).toContain('6585516842245423');
        expect(result).toContainEqual('2967216659318915');
    });
});

describe('getSortedNoteDataStructs', () => {
    const note1 = {
        pitch: 'A4',
        time: '0:0:0',
        duration: '0:2:0',
        velocity: 1,
        _id: '5072905086469833',
        x: 0,
        y: 800,
        width: 192
    };
    const note2 = {
        pitch: 'C5',
        time: '0:0:0',
        duration: '0:2:0',
        velocity: 1,
        _id: '1807958398091216',
        x: 0,
        y: 752,
        width: 192
    };
    const note3 = {
        pitch: 'E5',
        time: '0:0:0',
        duration: '0:2:0',
        velocity: 1,
        _id: '9036298122368111',
        x: 0,
        y: 688,
        width: 192
    };
    const allNotes = [ note1, note2, note3 ];
    const pitchesArray = createPitchesArray();
    test('correctly converts the input into the desired data stucture', () => {
        const result = getSortedNoteDataStructs({
            currentlySelectedNotes: [ note1._id, note2._id, note3._id ],
            allNotes,
            pitchesArray,
            shouldSortPitchesAscending: true
        });
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({ noteObject: note1, pitchIndex: 50 });
        expect(result[1]).toEqual({ noteObject: note2, pitchIndex: 47 });
        expect(result[2]).toEqual({ noteObject: note3, pitchIndex: 43 });
    });
    test('correctly sorts in ascending order when requested', () => {
        const result = getSortedNoteDataStructs({
            currentlySelectedNotes: [ note1._id, note2._id, note3._id ],
            allNotes,
            pitchesArray,
            shouldSortPitchesAscending: true
        });
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({ noteObject: note1, pitchIndex: 50 });
        expect(result[1]).toEqual({ noteObject: note2, pitchIndex: 47 });
        expect(result[2]).toEqual({ noteObject: note3, pitchIndex: 43 });
    });
    test('correctly sorts in descending order when requested', () => {
        const result = getSortedNoteDataStructs({
            currentlySelectedNotes: [ note1._id, note2._id, note3._id ],
            allNotes,
            pitchesArray,
            shouldSortPitchesAscending: false
        });
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual({ noteObject: note3, pitchIndex: 43 });
        expect(result[1]).toEqual({ noteObject: note2, pitchIndex: 47 });
        expect(result[2]).toEqual({ noteObject: note1, pitchIndex: 50 });
    });
});

describe('getFirstAvailablePitchInChord', () => {
    const struct1 = {
        noteObject: {
            pitch: 'A4',
            time: '0:0:0',
            duration: '0:2:0',
            velocity: 1,
            _id: '5072905086469833',
            x: 0,
            y: 800,
            width: 192
        },
        pitchIndex: 50
    };
    const struct2 = {
        noteObject: {
            pitch: 'C5',
            time: '0:0:0',
            duration: '0:2:0',
            velocity: 1,
            _id: '1807958398091216',
            x: 0,
            y: 752,
            width: 192
        },
        pitchIndex: 47
    };
    const struct3 = {
        noteObject: {
            pitch: 'E5',
            time: '0:0:0',
            duration: '0:2:0',
            velocity: 1,
            _id: '9036298122368111',
            x: 0,
            y: 688,
            width: 192
        },
        pitchIndex: 43
    };
    test('finds the correct pitch index when ascending traversal is requested', () => {
        const result = getFirstAvailablePitchInChord({
            orderedSelection: [ struct1, struct2, struct3 ],
            shouldTraversePitchesAscending: true,
            pitchesArrayLength: 108
        });
        expect(result).toBe(38);
    });
    test('finds the correct pitch index when descending traversal is requested', () => {
        const result = getFirstAvailablePitchInChord({
            orderedSelection: [ struct3, struct2, struct1 ],
            shouldTraversePitchesAscending: false,
            pitchesArrayLength: 108
        });
        expect(result).toBe(55);
    });
});
