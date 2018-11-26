import * as actionTypes from '../actionTypes';

const defaultState = {}; // use dictionary or array?


/*
Section object schema
{
    id: {string} - the id for the section
    channelId: {string} - the id for the channel this section belongs to
    notes: [ {object} ] - array of note objects for this section
    start: {string} - the start time for this section, in "0:0:0" format.
    numberOfBars: {number} - number of bars the section lasts for
}
*/

function deletePropFromObject(obj, prop) {
    let newObj = { ...obj };
    delete newObj[prop];
    return newObj;
}

function removePropsWithId(obj, id) {
    let newObj = {};
    for (let key in obj) {
        if (obj[key].channelId !== id) {
            newObj[key] = { ...obj[key] };
        }
    }
    return newObj;
}

const sections = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.ADD_SECTION:
            return {
                ...state,
                [action.payload.sectionId]: {
                    id: action.payload.sectionId,
                    channelId: action.payload.channelId,
                    notes: [],
                    start: action.payload.sectionStart,
                    numberOfBars: action.payload.sectionLength
                }
            };

        case actionTypes.REMOVE_SECTION:
            return deletePropFromObject(state, action.payload.sectionId);

        case actionTypes.REMOVE_CHANNEL:
            return removePropsWithId(state, action.payload.channelId);
            

        default:
            return state;

    }
}

export default sections;