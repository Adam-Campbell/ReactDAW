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