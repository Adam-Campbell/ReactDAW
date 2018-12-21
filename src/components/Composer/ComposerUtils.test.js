import { addOrRemoveElementFromSelection } from './ComposerUtils';

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