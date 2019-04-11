import React, { Component } from 'react';
import { Layer, Rect } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';  
import { throttle } from 'lodash';

class ScrollBarLayer extends Component {

    constructor(props) {
        super(props);
        this.throttledHorizontalDragMove = throttle(this.horizontalDragMove, 16).bind(this);
        this.throttledVerticalDragMove = throttle(this.verticalDragMove, 16).bind(this);
    }

    /**
     * Handles making the necessary updates whenever the horizontal scroll bar is dragged.
     * @param {object} e - the event object 
     */
    horizontalDragMove = (e) => {
        this.props.enterScrollBarActiveState();

        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.x - this.props.padding; 
        const totalSliderRange = this.props.stageWidth - this.props.padding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;

        // update the layers

        const totalCanvasRange = this.props.canvasWidth - this.props.stageWidth + this.props.padding + 24 + 48;
        
        this.props.gridLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.props.noteLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.props.transportLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.props.seekerLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.props.velocityLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.props.stageRef.current.batchDraw();
    }

    /**
     * Handles making the necessary updates whenever the vertical scroll bar is dragged.
     * @param {object} e - the event object 
     */
    verticalDragMove = (e) => {
        this.props.enterScrollBarActiveState();
        // make necessary calculations
        const currentSliderPos = e.target.attrs.y - this.props.padding;
        const totalSliderRange = this.props.stageHeight - this.props.padding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;

        const canvasHeight = 1728;
        const totalCanvasRange = canvasHeight - this.props.stageHeight + this.props.padding + 24 + 40 + 110;
    
        // update the layers
        this.props.gridLayerRef.current.y(-(totalCanvasRange * delta) + 40);
        this.props.noteLayerRef.current.y(-(totalCanvasRange * delta) + 40);
        this.props.pianoKeyLayerRef.current.y(-(totalCanvasRange * delta) + 40);
        this.props.stageRef.current.batchDraw();
    }

    horizontalDragBoundFunc = (pos) => {
        const highBound = this.props.stageWidth - 24 - 100;
        return {
            x: Math.min(Math.max(pos.x, this.props.padding), highBound),
            y: this.props.stageHeight - 19
        }
    }

    verticalDragBoundFunc = (pos) => {
        const highBound = this.props.stageHeight - 24 - 100;
        return {
            x: this.props.stageWidth - 19,
            y: Math.min(Math.max(pos.y, this.props.padding), highBound)
        }
    }

    /**
     * Ensures that the scrollBar active value in state is set to true when any mouse interactions with
     * the scroll bar occur. Also stops the event from bubbling up so that nothing on the layers underneath
     * the scroll bar layer gets triggered. 
     * @param {object} e - the event object
     */
    handleAdditionalScrollBarEvents = (e) => {
        e.cancelBubble = true;
        this.props.enterScrollBarActiveState();
    }

    render() {
        return (
            <Layer>
                <Rect 
                    x={0}
                    y={this.props.stageHeight - 24}
                    width={this.props.stageWidth}
                    height={24}
                    fill={UIColors.backgroundLight}
                    shadowColor={UIColors.backgroundLight}
                    shadowBlur={4}
                    shadowOffsetX={0}
                    shadowOffsetY={0}
                />
                <Rect 
                    width={100}
                    height={14}
                    fill={UIColors.main}
                    x={this.props.padding}
                    y={this.props.stageHeight - 19}
                    draggable={true}
                    type={'scrollRect'}
                    dragBoundFunc={this.horizontalDragBoundFunc}
                    onDragMove={this.throttledHorizontalDragMove}
                    onMouseDown={this.handleAdditionalScrollBarEvents}
                    onClick={this.handleAdditionalScrollBarEvents}
                />
                <Rect 
                    x={this.props.stageWidth - 24}
                    y={0}
                    width={24}
                    height={this.props.stageHeight}
                    fill={UIColors.backgroundLight}
                    shadowColor={UIColors.backgroundLight}
                    shadowBlur={4}
                    shadowOffsetX={0}
                    shadowOffsetY={0}
                />
                <Rect 
                    width={14}
                    height={100}
                    fill={UIColors.main}
                    y={this.props.padding}
                    x={this.props.stageWidth - 19}
                    draggable={true}
                    type={'scrollRect'}
                    dragBoundFunc={this.verticalDragBoundFunc}
                    onDragMove={this.throttledVerticalDragMove}
                    onMouseDown={this.handleAdditionalScrollBarEvents}
                    onClick={this.handleAdditionalScrollBarEvents}
                />
            </Layer>
        );
    }
}

ScrollBarLayer.propTypes = {
    stageHeight: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    enterScrollBarActiveState: PropTypes.func.isRequired,
    gridLayerRef: PropTypes.object.isRequired,
    noteLayerRef: PropTypes.object.isRequired,
    transportLayerRef: PropTypes.object.isRequired,
    seekerLayerRef: PropTypes.object.isRequired,
    velocityLayerRef: PropTypes.object.isRequired,
    stageRef: PropTypes.object.isRequired,
    pianoKeyLayerRef: PropTypes.object.isRequired
}

export default ScrollBarLayer;  