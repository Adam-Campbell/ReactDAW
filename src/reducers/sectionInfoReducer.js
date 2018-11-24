import * as actionTypes from '../actionTypes';

const defaultState = {
    notes: []
};

const sectionInfo = (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            };

        case actionTypes.REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => {
                    return note.pitch !== action.payload.pitch || note.time !== action.payload.time
                })
            };

        default:
            return state;

    }
}

export default sectionInfo;