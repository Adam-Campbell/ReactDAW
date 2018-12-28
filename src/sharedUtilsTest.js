import { 
    findOverlapAlongAxis,
    addOrRemoveElementFromSelection,
    getWholeBarsFromString,
    transportPositionStringToSixteenths,
    adjustForScroll,
    generateId, 
    deepCopy,
    updatePropAtPath,
    deletePropFromObject,
    createPitchesArray
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

describe('generateId', () => {
    test('returns a string', () => {
        const result = generateId();
        expect(typeof result).toBe('string');
    });
    test('returned string is 16 characters long', () => {
        const result = generateId();
        expect(result.length).toBe(16);
    });
    test('each character in the string is a number between 0 and 9', () => {
        const result = generateId();
        expect(result).toMatch(/^\d{16}$/);
    });
});

describe('deepCopy', () => {
    const object = {
        propA: 'val A',
        propB: {
            propC: 'val C',
            propD: 'val D'
        }
    };
    test('returns a new object', () => {
        const result = deepCopy(object);
        expect(result).not.toBe(object);
    });
    test('the new object has all of the same properties and values as the original object', () => {
        const result = deepCopy(object);
        expect(result).toEqual(object);
    });
});

describe('updatePropAtPath', () => {
    const object = {
        propA: 'old value',
        propB: {
            propA: 'old value'
        }
    };
    test('updates the value of a property at a specified path', () => {
        const result = updatePropAtPath(object, ['propB', 'propA'], 'new value');
        expect(result).toEqual({
            propA: 'old value',
            propB: {
                propA: 'new value'
            }
        });
    });
    test("doesn't affect any other props even if they have the same name", () => {
        const result = updatePropAtPath(object, ['propB', 'propA'], 'new value');
        expect(result).toEqual({
            propA: 'old value',
            propB: {
                propA: 'new value'
            }
        });
    });
});

describe('deletePropFromObject', () => {
    const object = {
        propA: 'val A',
        propB: 'val B',
        propC: 'val C'
    };
    test('returns a new object', () => {
        const result = deletePropFromObject(object, 'propB');
        expect(result).not.toBe(object);
    });
    test('new object has all of the same props and values as the original, except for the one that was deleted', 
    () => {
        const result = deletePropFromObject(object, 'propB');
        expect(result).toEqual({
            propA: 'val A',
            propC: 'val C'
        });
    });
});

describe('createPitchesArray', () => {
    test('correctly creates the pitches array', () => {
        const result = createPitchesArray();
        expect(result).toHaveLength(108);
        expect(result).toMatchSnapshot();
    });
});