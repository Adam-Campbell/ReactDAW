import * as actionTypes from '../actionTypes';

const defaultState = [];

/*
active window object schema:
{
    id: {string} - the id of this window
    type: {enum} - the type of component that needs to be rendered for this window
}
*/


const activeWindows = (state=defaultState, action) => {
    switch (action.type) {
        default: 
            return state;
    }
}

export default activeWindows;