import React from 'react';
import { shallow } from 'enzyme';
import { LoadModalContainer, getSavedTracks } from './';
import LoadModal from './LoadModal';

beforeEach(() => {
    window.localStorage.clear();
});

describe('getSavedTracks', () => {
    test('returns an empty array if local storage is empty', () => {
        expect(getSavedTracks()).toEqual([]);
    });
    test('returns an empty array if none of the items in local storage match the criteria', () => {
        window.localStorage.setItem('Non matching key', {});
        expect(getSavedTracks()).toEqual([]);
    });
    test(`if there are items in local storage matching the criteria, returns an array of their keys, 
    formatted to remove namespacing`, () => {
        window.localStorage.setItem('Non matching key', {});
        window.localStorage.setItem('[track_name] Track One', {});
        window.localStorage.setItem('[track_name] Track Two', {});
        const result = getSavedTracks();
        expect(result).toHaveLength(2);
        expect(result).toEqual(
            expect.arrayContaining(['Track One', 'Track Two'])
        );
    });
});

describe('LoadModalContainer', () => {
    test('renders the presentational component', () => {
        const wrapper = shallow(
            <LoadModalContainer 
                loadState={jest.fn()}
                closeModal={jest.fn()}
            />
        );
        expect(wrapper.find(LoadModal)).toHaveLength(1);
    });
    test('passes the track names from local storage to the presentational component', () => {
        window.localStorage.setItem('Non matching key', {});
        window.localStorage.setItem('[track_name] Track One', {});
        window.localStorage.setItem('[track_name] Track Two', {});
        const wrapper = shallow(
            <LoadModalContainer 
                loadState={jest.fn()}
                closeModal={jest.fn()}
            />
        );
        expect(wrapper.find(LoadModal).first().prop('savedTracks')).toHaveLength(2);
        expect(wrapper.find(LoadModal).first().prop('savedTracks')).toEqual(
            expect.arrayContaining([
                'Track One',
                'Track Two'
            ])
        );
    });
    test('handleLoad method calls the loadState and closeModal functions with the correct arguments', () => {

    });
});