import * as actionTypes from '../actionTypes';

const saveStateAttempt = (saveName) => ({
    type: actionTypes.SAVE_STATE_ATTEMPT,
    payload: {
        saveName
    }
});

const saveStateSuccess = (saveName) => ({
    type: actionTypes.SAVE_STATE_SUCCESS,
    payload: {
        saveName
    }
});

const saveStateFailed = (saveName, error) => ({
    type: actionTypes.SAVE_STATE_FAILED,
    payload: {
        saveName,
        error
    }
});

export const saveState = (saveName) => (dispatch, getState) => {
    dispatch(saveStateAttempt(saveName))
    const currentState = getState();
    try {
        const trimmedState = {
            playerStatus: currentState.playerStatus,
            main: currentState.main.present
        };
        const serializedState = JSON.stringify(trimmedState);
        window.localStorage.setItem(saveName, serializedState);
        dispatch(saveStateSuccess(saveName));
    } catch (error) {
        dispatch(saveStateFailed(error));
    }
};

const loadStateAttempt = (saveName) => ({
    type: actionTypes.LOAD_STATE_ATTEMPT,
    payload: {
        saveName
    }
});

export const loadStateSuccess = (saveName, loadedState) => ({
    type: actionTypes.LOAD_STATE_SUCCESS,
    payload: {
        saveName, 
        loadedState
    }
});

const loadStateFailed = (saveName, error) => ({
    type: actionTypes.LOAD_STATE_FAILED,
    payload: {
        saveName,
        error
    }
})

export const loadState = (saveName) => (dispatch) => {
    dispatch(loadStateAttempt(saveName));
    try {
        const serializedState = window.localStorage.getItem(saveName);
        const deserializedState = JSON.parse(serializedState);
        if (deserializedState === null) {
            throw new Error("Attempted to load from a save name that doesn't exist.");
        }
        dispatch(loadStateSuccess(saveName, deserializedState));
    } catch (error) {
        dispatch(loadStateFailed(saveName, error));
    }
}

export const openNewProject = () => ({
    type: actionTypes.OPEN_NEW_PROJECT
});