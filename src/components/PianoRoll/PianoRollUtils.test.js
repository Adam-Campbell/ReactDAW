import {
    createSelectedAndUnselectedNoteArrays,
    getWholeBarsFromString,
    transportPositionStringToSixteenths,
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
    findOverlapAlongAxis,
    getNoteIdsForSelectionRange,
    getNoteDurationFromPencilOperation,
    generateNoteObjectForPasting,
    getSortedNoteDataStructs,
    getFirstAvailablePitchInChord
} from './PianoRollUtils';

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

describe('getWholeBarsFromString', () => {
    test('correctly returns the bar as a number', () => {
        expect(getWholeBarsFromString('4:2:3')).toBe(4);
    });
});

describe('transportPositionStringToSixteenths', () => {
    test('correctly converts the string to the desired numeric value', () => {
        expect(transportPositionStringToSixteenths('2:3:1')).toBe(45)
    });
    test('converts correctly even when the sixteenths value is a floating point number', () => {
        expect(transportPositionStringToSixteenths('1:2:3.5461')).toBeCloseTo(27.5461);
    });
});

describe('findOverlapAlongAxis', () => {
    test('correctly identifies an overlap between the elements', () => {
        expect(findOverlapAlongAxis({
           elementALowerBound: 48,
           elementAUpperBound: 632,
           elementBLowerBound: 24,
           elementBUpperBound: 128 
        })).toBe(true);
    });
    test('correctly identifies the absence of an overlap between the elements', () => {
        expect(findOverlapAlongAxis({
            elementALowerBound: 16,
            elementAUpperBound: 128,
            elementBLowerBound: 256,
            elementBUpperBound: 512 
        })).toBe(false);
    });
});
