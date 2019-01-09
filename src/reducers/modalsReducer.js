import * as actionTypes from '../actionTypes';
import { modalTypes } from '../constants';

const defaultState = {
    modalType: null,
    optionalModalProps: {}
};

const modals = (state=defaultState, action) => {
    switch(action.type) {

        case actionTypes.OPEN_MODAL:
            return {
                modalType: action.payload.modalType,
                optionalModalProps: action.payload.optionalModalProps
            };

        case actionTypes.CLOSE_MODAL:
            return defaultState;

        case actionTypes.LOAD_STATE_SUCCESS:
            return defaultState;

        case actionTypes.OPEN_NEW_PROJECT:
            return defaultState;

        default:
            return state;
    }
}

export default modals;