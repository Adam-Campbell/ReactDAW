import * as actionTypes from '../actionTypes';
import reducer from './modalsReducer';
import { modalTypes } from '../constants';

const defaultState = {
    modalType: null,
    optionalModalProps: {}
};

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
});

test('handles OPEN_MODAL', () => {
    const action = {
        type: actionTypes.OPEN_MODAL,
        payload: {
            modalType: modalTypes.open,
            optionalModalProps: {
                arbitraryKey: 'arbitrary value'
            }
        }
    };
    const expectedResult = {
        modalType: modalTypes.open,
        optionalModalProps: {
            arbitraryKey: 'arbitrary value'
        }
    };
    expect(reducer(undefined, action)).toEqual(expectedResult);
});

test('handles CLOSE_MODAL', () => {
    const action = {
        type: actionTypes.CLOSE_MODAL
    };
    expect(reducer(undefined, action)).toEqual(defaultState);
});

test('handles LOAD_STATE_SUCCESS', () => {
    const action = {
        type: actionTypes.LOAD_STATE_SUCCESS
    };
    expect(reducer(undefined, action)).toEqual(defaultState);
});

test('handles OPEN_NEW_PROJECT', () => {
    const action = {
        type: actionTypes.OPEN_NEW_PROJECT
    };
    expect(reducer(undefined, action)).toEqual(defaultState);
});