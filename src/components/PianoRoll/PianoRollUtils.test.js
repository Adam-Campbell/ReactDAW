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