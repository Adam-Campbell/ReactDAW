import { getOverlayPosition } from './utils';

describe('getOverlayPosition', () => {
    test('returns the correct attrs when current pos is greater than starting pos', () => {
        const result = getOverlayPosition({
            mouseDownPosX: 16,
            mouseDownPosY: 24,
            currentMousePosX: 32,
            currentMousePosY: 48
        });
        const expectedResult = {
            x: 16,
            y: 24,
            width: 16,
            height: 24
        };
        expect(result).toEqual(expectedResult);
    });
    test('returns the correct attrs when current pos is less than starting pos', () => {
        const result = getOverlayPosition({
            mouseDownPosX: 28,
            mouseDownPosY: 46,
            currentMousePosX: 18,
            currentMousePosY: 22
        });
        const expectedResult = {
            x: 18,
            y: 22,
            width: 10,
            height: 24
        };
        expect(result).toEqual(expectedResult);
    });
});