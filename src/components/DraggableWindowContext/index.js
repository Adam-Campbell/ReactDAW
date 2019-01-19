import React, { Component } from 'react';

const DraggableWindowContext = React.createContext();

/*
Needs to keep in state - 
mouseIsDown - whether the mouse is currently down 
mouseDownX - the x coord from the last mouseDown event
mouseDownY - the y coord from the last mouseDown event
updatePositionCallbacks - an array of objects, with an id property denoting which window the object belongs to,
and a callback property which holds the callback function to call
makeInactiveCallbacks - same as above, these are called when the mouseUp event occurs and mouseIsDown is set to 
false, they ensure that every window is set to inactive. 


Actually, combine the two callbacks arrays into one array;
[
    {
        windowId: id of window,
        updatePositionCallback: callback to update window position,
        makeInactiveCallback: callback to make window inactive
    }
]

On mouseMove, it will cycle through the array and call each callback with the current event object. Crucially, 
these callbacks will do nothing if that window is not active, so calling all callbacks will still be cheap when
only one window will ever be active at a time. 

Will need subscribeWindow and unsubscribeWindow methods that will be made available via context to every window. 
They are called by the window, subscribeWindow needs the window id, and a reference to the relevant functions,
but unsubscribeWindow only needs the window id. These methods are responsible for adding and removing windows 
from the callbacks arrays. 

*/

export class DraggableWindowContextProvider extends Component {

    state = {
        mouseIsDown: false,
        mouseDownX: null,
        mouseDownY: null,
        windows: []
    }

    subscribeWindow = (windowId, updatePositionCallback, makeInactiveCallback) => {
        this.setState(prevState => {
            return {
                windows: [
                    ...prevState.windows,
                    {
                        windowId, 
                        updatePositionCallback,
                        makeInactiveCallback
                    }
                ]
            }
        });
    }

    unsubscribeWindow = (windowId) => {
        this.setState(prevState => {
            return {
                windows: prevState.windows.filter(window => window.windowId !== windowId) 
            }  
        });
    }

    enterMouseDownState = ({ clientX, clientY }) => {
        this.setState({
            mouseIsDown: true,
            mouseDownX: clientX,
            mouseDownY: clientY
        });
    }

    exitMouseDownState = () => {
        this.setState({
            mouseIsDown: false,
            mouseDownX: null,
            mouseDownY: null
        });
        this.makeWindowsInactive();
    }

    updateWindowPositions = (e) => {
        if (!this.state.mouseIsDown) return;
        this.state.windows.forEach(window => window.updatePositionCallback(e))
    }

    makeWindowsInactive = () => {
        this.state.windows.forEach(window => window.makeInactiveCallback());
    }

    render() {
        return (
            <DraggableWindowContext.Provider value={{
                mouseDownX: this.state.mouseDownX,
                mouseDownY: this.state.mouseDownY,
                mouseIsDown: this.state.mouseIsDown,
                subscribeWindow: this.subscribeWindow,
                unsubscribeWindow: this.unsubscribeWindow,
                enterMouseDownState: this.enterMouseDownState,
                exitMouseDownState: this.exitMouseDownState,
                updateWindowPositions: this.updateWindowPositions
            }}>
                { this.props.children }
            </DraggableWindowContext.Provider>
        );
    }
}

export const DraggableWindowContextConsumer = DraggableWindowContext.Consumer;