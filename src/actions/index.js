import * as actionTypes from '../actionTypes';
//import { sectionRef } from '../index.js';

export const addNote = noteObject => ({
    type: actionTypes.ADD_NOTE,
    payload: noteObject
});

export const removeNote = (pitch, time) => ({
    type: actionTypes.REMOVE_NOTE,
    payload: {
        pitch,
        time
    }
});

export const addNoteThunk = noteObject => async dispatch => {
    const adaptedNoteObject = {
        note: noteObject.pitch,
        time: noteObject.time,
        duration: noteObject.duration
    };
    
    try {
        //await sectionRef.addNote(adaptedNoteObject);
        dispatch(addNote(noteObject));
    } catch (err) {

    }
}

export const removeNoteThunk = (pitch, time) => async dispatch => {
    try {
        //await sectionRef.removeNote(pitch, time);
        dispatch(removeNote(pitch, time));
    } catch (err) {

    }
}

export const addEventToQueue = event => ({
    type: actionTypes.ADD_EVENT_TO_QUEUE,
    payload: event
});

export const removeEventFromQueue = () => ({
    type: actionTypes.REMOVE_EVENT_FROM_QUEUE
});

export const playTrack = () => ({
    type: actionTypes.PLAY_TRACK
});

export const stopTrack = () => ({
    type: actionTypes.STOP_TRACK
});

