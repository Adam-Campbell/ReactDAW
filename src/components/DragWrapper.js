import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import { getEmptyImage } from 'react-dnd-html5-backend';

const types = {
    window: 'DRAGGABLE_WINDOW'
};

const spec = {
    beginDrag(props, monitor, component) {
        //console.log(component);
        const containerRect = component.containerRef.getBoundingClientRect();
        return {
            ...props,
            initialX: containerRect.left,
            initialY: containerRect.top
        };
    },
    endDrag(props, monitor, component) {
        const { x, y } = monitor.getDifferenceFromInitialOffset();
        const container = component.containerRef;
        const startingRect = container.getBoundingClientRect();
        const newX = x + startingRect.x;
        const newY = y + startingRect.y;
        container.style.left = `${newX}px`;
        container.style.top = `${newY}px`;
    }
}


class DragWrapper extends Component {
    constructor(props) {
        super(props);
        this.setContainerRef = element => this.containerRef = element;
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    

    componentDidMount() {
        const { connectDragPreview } = this.props;
        if (connectDragPreview) {
            connectDragPreview(getEmptyImage(), { captureDraggingState: true });
        }
    }

    handleClose = () => {
        this.props.closeWindow(this.props.windowId);
    }

    render() {

        if (this.state.hasError) {
            return (
                <div 
                    className="error-ui__container"
                    ref={this.setContainerRef}
                    style={{
                        position: 'absolute',
                        zIndex: 5000
                    }}
                >
                    <h1 className="error-ui__title">An error occurred within an active window</h1>
                    <p className="error-ui__text">An error occurred within one of the currently active windows. It is likely that the entity the window was displaying got deleted, either manually or through an undo operation. The error has been contained and you can safely close this window without affecting the rest of the program.</p>
                    <button 
                        className="error-ui__button"
                        onClick={this.handleClose}
                    >Close</button>
                </div>
            );
        }

        const { 
            isDragging,
            connectDragSource,
            connectDragPreview 
        } = this.props;

        return (
            <div
                ref={this.setContainerRef}
                className="draggable-wrapper"
                style={{
                    opacity: isDragging ? 0 : 1
                }}
            >
                <div className="draggable-wrapper__header">
                    {connectDragSource(<button className="draggable-wrapper__button">Move</button>)}
                    <button 
                        className="draggable-wrapper__button"
                        onClick={this.handleClose}
                        >X</button>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>

        );
    }
}


function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        getInitialClientOffset: monitor.getInitialClientOffset(),
        getSourceClientOffset: monitor.getSourceClientOffset(),
        getDifferenceFromInitialOffset: monitor.getDifferenceFromInitialOffset()
    };
}

const withDragging =  DragSource(types.window, spec, collect)(DragWrapper);

export default connect(
    null, 
    {
        closeWindow: ActionCreators.closeWindow
    }
)(withDragging)