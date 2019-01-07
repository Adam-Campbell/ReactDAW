import * as actionTypes from '../actionTypes';

const defaultState = {
    saveName: ''
}

const composition = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.SET_COMPOSITION_SAVE_NAME:
            return {
                ...state,
                saveName: action.payload.newSaveName
            };

        case actionTypes.LOAD_STATE_SUCCESS:
            return action.payload.loadedState.composition;

        default:
            return state;
    }
}

export default composition;