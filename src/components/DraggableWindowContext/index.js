import React, { Component } from 'react';

const DraggableWindowContext = React.createContext();

/*

Provides a central way to control the dragging of windows within the app. Maintains state covering whether the
mouse is currently down, the x and y coords of the mouse at the start of the mouseDown event, and an array of 
subscribed windows. 

Provides methods for the windows themselves to subscribe and unsubscribe (all windows subscribe when mounted
in the DOM and then unsubscribe when unmounting).

Provides methods for the top level of the app to track whether the mouse is down, the x and y coord of the 
mouseDown event, and also a callback to fire whenever a mouseMove event occurs within the app.

*/

export class DraggableWindowContextProvider extends Component {

    state = {
        mouseIsDown: false,
        mouseDownX: null,
        mouseDownY: null,
        windows: []
    }

    /**
     * A method made available to the rest of the app that allows windows within the app to subscribe themselves
     * to the context, such that when relevant events occur a specified callback method from the window can be
     * called.
     * @param {String} windowId - the id of the window to subscribe
     * @param {Function} updatePositionCallback - the callback to call to update a windows positions
     * @param {Function} makeInactiveCallback - the callback to call to make a window inactive
     */
    subscribeWindow = (windowId, updatePositionCallback, makeInactiveCallback) => {
        this.setState(prevState => {
            return {
                windows: [
                    ...prevState.windows,
                    {
                        windowId, 
                        updatePositionCallback,
                        makeInactiveCallback,
                        zValue: prevState.windows.length
                    }
                ]
            }
        });
    }

    /**
     * A method made available to the rest of the app that allows a window from within the app to unsubscribe 
     * itself from this context, so that when events occur in future that particular window is no longer notified.
     * @param {String} windowId - the id of the window to unsubscribe
     */
    unsubscribeWindow = (windowId) => {
        this.setState(prevState => {
            return {
                windows: prevState.windows.filter(window => window.windowId !== windowId) 
            }  
        });
    }

    /**
     * Makes the changes to state required to enter the mouseIsDown state
     * @param {Number} clientX - the clientX property from an event object
     * @param {Number} clientY - the clientY property from an event object
     */
    enterMouseDownState = ({ clientX, clientY }) => {
        this.setState({
            mouseIsDown: true,
            mouseDownX: clientX,
            mouseDownY: clientY
        });
    }

    /**
     * Makes the changes to state required to exit the mouseIsDown state.
     */
    exitMouseDownState = () => {
        this.setState({
            mouseIsDown: false,
            mouseDownX: null,
            mouseDownY: null
        });
        this.makeWindowsInactive();
    }

    pullWindowToFront = (windowId) => {
        this.setState(prevState => {
            const newWindowsArray = [
                ...prevState.windows.filter(window => window.windowId !== windowId),
                prevState.windows.find(window => window.windowId === windowId)
            ].map((window, index) => ({
                ...window,
                zValue: index
            }));
            return {
                windows: newWindowsArray
            }
        });
    }

    /**
     * Iterates over all of the subscribed windows and calls updatePositionCallback with the event object. 
     * Called for every mouseMove event in the app - however the callback functions it calls won't do anything
     * unless that particular window is currently active, meaning that the majority of the function calls it 
     * makes will just return straight away.
     * @param {Object} e - the event object
     */
    updateWindowPositions = (e) => {
        if (!this.state.mouseIsDown) return;
        this.state.windows.forEach(window => window.updatePositionCallback(e))
    }

    /**
     * Iterates over all subscribed windows and calls makeInactiveCallback.
     */
    makeWindowsInactive = () => {
        this.state.windows.forEach(window => window.makeInactiveCallback());
    }

    render() {
        return (
            <DraggableWindowContext.Provider value={{
                windows: this.state.windows,
                mouseDownX: this.state.mouseDownX,
                mouseDownY: this.state.mouseDownY,
                mouseIsDown: this.state.mouseIsDown,
                subscribeWindow: this.subscribeWindow,
                unsubscribeWindow: this.unsubscribeWindow,
                enterMouseDownState: this.enterMouseDownState,
                exitMouseDownState: this.exitMouseDownState,
                updateWindowPositions: this.updateWindowPositions,
                pullWindowToFront: this.pullWindowToFront
            }}>
                { this.props.children }
            </DraggableWindowContext.Provider>
        );
    }
}

export const DraggableWindowContextConsumer = DraggableWindowContext.Consumer;