import { formatTransportPosition } from './transportUtils';

describe('formatTransportPosition', () => {
    test('correctly formats the given string when 16th value is floating point num', () => {
        const result = formatTransportPosition('1:2:3.823');
        expect(result).toBe('1:2:3');
    });
    test('if the 16th value was already a whole value, just returns value it received as input', () => {
        const result = formatTransportPosition('2:3:2');
        expect(result).toBe('2:3:2');
    });
});

