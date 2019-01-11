import * as actionTypes from '../actionTypes';

const defaultState = {
    value: 0
};

const dial = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.UPDATE_DIAL:
            return {
                value: action.payload.newValue
            }

        default:
            return state;
    }
}

export default dial;