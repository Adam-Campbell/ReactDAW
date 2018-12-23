import { 
    findOverlapAlongAxis,
    addOrRemoveElementFromSelection,
    getWholeBarsFromString,
    transportPositionStringToSixteenths,
    adjustForScroll
} from './sharedUtils';

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

describe('adjustForScroll', () => {
    test('correctly subtracts a scroll value from a raw coord value', () => {
        const result = adjustForScroll({ raw: 80, scroll: 50 });
        expect(result).toBe(30);
    });
    test('treats an undefined scroll value as 0 returns the correct value', () => {
        const result = adjustForScroll({ raw: 25, scroll: undefined });
        expect(result).toBe(25);
    });
});