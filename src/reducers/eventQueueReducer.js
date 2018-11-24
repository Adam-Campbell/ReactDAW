import * as actionTypes from '../actionTypes';

const defaultState = [];

const eventQueue = (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EVENT_TO_QUEUE:
            return [...state, action.payload];

        case actionTypes.REMOVE_EVENT_FROM_QUEUE:
            return state.slice(1);

        default:
            return state;
    }
}

export default eventQueue;