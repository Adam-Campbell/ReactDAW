import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import PropTypes from 'prop-types';

/*

Subscribes to DraggableWindowContext immediately upon mounting, and unsubscribes from the context 
immediately before unmounting. 

The updateContainerPosition method is called on every mouseMove event that occurs whilst the mouseIsDown
property in context is true, however the method only does something if this particular window is in the
dragging state.

Repositioning of the window is achieved by updating the transform: translate() css property on the DOM node. 
The next value for it is calculated using the value it had at the start of the 'drag operation', the position
of the mouse at the start of the 'drag operation' and the delta between that mouse position and the current
mouse position. 

*/

class DraggableWindow extends Component {

    static propTypes = {
        windowId: PropTypes.string.isRequired,
        mouseDownX: PropTypes.any,
        mouseDownY: PropTypes.any,
        subscribeWindow: PropTypes.func.isRequired,
        unsubscribeWindow: PropTypes.func.isRequired,
        pullWindowToFront: PropTypes.func.isRequired,
        windows: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    state = {
        isDragging: false,
        initialTranslateX: null,
        initialTranslateY: null
    };
    containerRef = React.createRef();

    /**
     * Subscribe to the context after mounting
     */
    componentDidMount() {
        this.props.subscribeWindow(
            this.props.windowId, 
            this.updateContainerPosition, 
            this.exitDraggingState
        );
    }

    /**
     * Unsubscribe from the context after unmounting
     */
    componentWillUnmount() {
       this.props.unsubscribeWindow(this.props.windowId);
    }
    
    /**
     * Calculates the next transform properties to apply to the container DOM node and applies them.
     */
    updateContainerPosition = (e) => {
        if (!this.state.isDragging) return;
        e.preventDefault();
        const { clientX, clientY } = e;
        window.requestAnimationFrame(() => {
            const xDelta = clientX - this.props.mouseDownX;
            const yDelta = clientY - this.props.mouseDownY;
            const newTranslateX = this.state.initialTranslateX + xDelta;
            const newTranslateY = this.state.initialTranslateY + yDelta;
            if (this.containerRef.current) {
                this.containerRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
            }
        });   
    };

    /**
     * Gets the initial translate x and y settings at the start of the drag interaction. These will be 
     * used throughout the drag to calculate the next translate settings to apply to the DOM node. At the
     * end of the drag they are discarded to be calculated again when the next drag occurs in the future.  
     */
    getInitialTranslate = () => {
        // return null values if there is no DOM node to check
        if (!this.containerRef.current) {
            return {
                initialTranslateX: null,
                initialTranslateY: null
            };
        }
        // try and grab the style.transform string, if there is one then parse out the translate values.
        const transformString = this.containerRef.current.style.transform;
        if (transformString) {
            const transformValues = transformString.match(/\d+/g);
            return {
                initialTranslateX: parseFloat(transformValues[0]),
                initialTranslateY: parseFloat(transformValues[1])
            };
            // if there isn't a style.transform string but there is a DOM node, just return 0 values.  
        } else {
            return {
                initialTranslateX: 0,
                initialTranslateY: 0
            };
        }
    };

    /**
     * Updates the parts of state necessary to enter the dragging state.
     */
    enterDraggingState = (e) => {
        const { initialTranslateX, initialTranslateY } = this.getInitialTranslate();
        this.setState({ 
            isDragging: true,
            initialTranslateX,
            initialTranslateY
        });
        this.props.pullWindowToFront(this.props.windowId)
    };

    /**
     * Updates the parts of state necessary to exit the dragging state.
     */
    exitDraggingState = () => {
        this.setState({
            isDragging: false,
            initialTranslateX: null,
            initialTranslateY: null
        });
    }

    /**
     * Dispatch action to close this window.
     */
    handleClose = () => {
        this.props.closeWindow(this.props.windowId);
    }

    render() {
        /*
        Determine the current zIndex value for this window. The first time it renders it won't have
        subscribed itself yet so it won't have a zValue assigned in context, when this happens just base
        the zIndexValue off of the length of the windows array. In every other instance we can grab the
        zValue from context and use that instead. 
        */
        const windowInContext = this.props.windows.find(el => el.windowId === this.props.windowId);
        const zIndexValue = windowInContext ? windowInContext.zValue : this.props.windows.length;

        return (
            <div 
                className="draggable-wrapper" 
                ref={this.containerRef}
                style={{ zIndex: 1000 + zIndexValue }}
            >
                <div 
                    className="draggable-wrapper__header" 
                    onMouseDown={this.enterDraggingState}
                >
                    <button 
                        className="draggable-wrapper__button"
                        onClick={this.handleClose}
                    >X</button>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default connect(
    null, 
    {
        closeWindow: ActionCreators.closeWindow
    }
)(DraggableWindow)








// class DraggableWindow extends Component {
//     state = {
//         isDragging: true,
//         mouseDownX: null,
//         mouseDownY: null,
//         initialTranslateX: null,
//         initialTranslateY: null
//     };
//     containerRef = React.createRef();

//     componentDidMount() {
//         //window.addEventListener('mousemove', this.updateContainerPosition);
//         window.addEventListener('mouseup', this.exitDraggingState);
//     }

//     componentWillUnmount() {
//        // window.removeEventListener('mousemove', this.updateContainerPosition);
//         window.removeEventListener('mouseup', this.exitDraggingState);
//     }
    
//     updateContainerPosition = (e) => {
//         e.preventDefault();
//         const { clientX, clientY } = e;
//         if (!this.state.isDragging || this.state.mouseDownX === null) return;
//         window.requestAnimationFrame(() => {
//             const xDelta = clientX - this.state.mouseDownX;
//             const yDelta = clientY - this.state.mouseDownY;
//             const newTranslateX = this.state.initialTranslateX + xDelta;
//             const newTranslateY = this.state.initialTranslateY + yDelta;
//             if (this.containerRef.current) {
//                 this.containerRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
//             }
//         });   
//     };

//     /**
//      * Gets the initial translate x and y settings at the start of the drag interaction. These will be 
//      * used throughout the drag to calculate the next translate settings to apply to the DOM node. At the
//      * end of the drag they are discarded to be calculated again when the next drag occurs in the future.  
//      */
//     getInitialTranslate = () => {
//         // return null values if there is no DOM node to check
//         if (!this.containerRef.current) {
//             return {
//                 initialTranslateX: null,
//                 initialTranslateY: null
//             };
//         }
//         // try and grab the style.transform string, if there is one then parse out the translate values.
//         const transformString = this.containerRef.current.style.transform;
//         if (transformString) {
//             const transformValues = transformString.match(/\d+/g);
//             return {
//                 initialTranslateX: parseFloat(transformValues[0]),
//                 initialTranslateY: parseFloat(transformValues[1])
//             };
//             // if there isn't a style.transform string but there is a DOM node, just return 0 values.  
//         } else {
//             return {
//                 initialTranslateX: 0,
//                 initialTranslateY: 0
//             };
//         }
//     };

//     enterDraggingState = ({ clientX, clientY }) => {
//         console.log('enterDraggingState was called');
//         const { initialTranslateX, initialTranslateY } = this.getInitialTranslate();
//         this.setState({ 
//             isDragging: true,
//             mouseDownX: clientX,
//             mouseDownY: clientY,
//             initialTranslateX,
//             initialTranslateY
//         });
//     };

//     exitDraggingState = () => {
//         this.setState({
//             isDragging: false,
//             mouseDownX: null,
//             mouseDownY: null,
//             initialTranslateX: null,
//             initialTranslateY: null
//         });
//     }

//     handleClose = () => {
//         this.props.closeWindow(this.props.windowId);
//     }

//     render() {
//         const { children } = this.props;
//         // return children({
//         //     containerRef: this.containerRef,
//         //     enterDraggingState: this.enterDraggingState
//         // })
//         return (
//             <div className="draggable-wrapper" ref={this.containerRef}>
//                 <div 
//                     className="draggable-wrapper__header" 
//                     onMouseDown={this.enterDraggingState}
//                     onMouseMove={this.updateContainerPosition}
//                 >
//                     <button 
//                         className="draggable-wrapper__button"
//                         onClick={this.handleClose}
//                     >X</button>
//                 </div>
//                 <div>
//                     {this.props.children}
//                 </div>
//             </div>
//         )
//     }
// }