import * as actionTypes from '../actionTypes';

export const openModal = (modalType, optionalProps={}) => ({
    type: actionTypes.OPEN_MODAL,
    payload: {
        modalType,
        optionalProps
    }
});

export const closeModal = () => ({
    type: actionTypes.CLOSE_MODAL
});

