import * as actionTypes from '../actionTypes';

export const addSection = (sectionObject, sectionId, channelId) => ({
    type: actionTypes.ADD_SECTION,
    payload: {
        sectionObject,
        sectionId,
        channelId
    }
});

export const removeSection = (sectionId, channelId) => ({
    type: actionTypes.REMOVE_SECTION,
    payload: {
        sectionId,
        channelId
    }
});

export const addNote = (sectionId, noteObject) => ({
    type: actionTypes.ADD_NOTE,
    payload: {
        sectionId,
        noteObject
    }
});

export const removeNote = (sectionId, noteId) => ({
    type: actionTypes.REMOVE_NOTE,
    payload: {
        sectionId,
        noteId
    }
});

export const addNotes = (sectionId, noteObjects) => ({
    type: actionTypes.ADD_NOTES,
    payload: {
        sectionId,
        noteObjects
    }
});

export const removeNotes = (sectionId, noteIds) => ({
    type: actionTypes.REMOVE_NOTES,
    payload: {
        sectionId,
        noteIds
    }
});