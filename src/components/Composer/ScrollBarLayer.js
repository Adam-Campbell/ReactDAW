import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect } from 'react-konva';
import { UIColors } from '../../constants';
import { throttle } from 'lodash';

class ScrollBarLayer extends Component {

    constructor(props) {
        super(props);
        this.throttledHorizontalDragMove = throttle(this.horizontalDragMove, 16).bind(this);
        this.throttledVerticalDragMove = throttle(this.verticalDragMove, 16).bind(this);
    }

    /**
     * Handles horizontal scrolling of the canvas of the composer component. 
     * @param {object} e - the event object
     */
    horizontalDragMove = (e) => {
        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.x - this.props.scrollPadding;
        const totalSliderRange = this.props.stageWidth - this.props.scrollPadding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;
        // update the layers
        const totalCanvasRange = this.props.canvasWidth - this.props.stageWidth + this.props.scrollPadding + 24;
        this.props.gridLayerRef.current.x(-(totalCanvasRange * delta));
        this.props.sectionsLayerRef.current.x(-(totalCanvasRange * delta));
        this.props.transportLayerRef.current.x(-(totalCanvasRange * delta));
        this.props.seekerLayerRef.current.x(-(totalCanvasRange * delta));
        this.props.stageRef.current.batchDraw();
    }

    /**
     * Handles vertical scrolling of the composer component, updating both the canvas and the track info
     * elements.
     * @param {object} e - the event object
     */
    verticalDragMove = (e) => {
        if (this.props.stageHeight > this.props.canvasHeight) {
            return;
        }
        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.y - this.props.scrollPadding;
        const totalSliderRange = this.props.stageHeight - this.props.scrollPadding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;
        // update the layers
        const totalCanvasRange = this.props.canvasHeight - this.props.stageHeight + this.props.scrollPadding + 24;
        const scrollAmount = -(totalCanvasRange * delta);

        this.props.updateTrackInfoMenuTopScroll(scrollAmount);
        this.props.gridLayerRef.current.y(-(totalCanvasRange * delta));
        this.props.sectionsLayerRef.current.y(-(totalCanvasRange * delta));
        this.props.stageRef.current.batchDraw();
    }

    horizontalDragBoundFunc = (pos) => {
        const highBound = this.props.stageWidth - 24 - 100;
        return {
            x: Math.min(Math.max(pos.x, this.props.scrollPadding), highBound),
            y: this.props.stageHeight - 19
        }
    }

    verticalDragBoundFunc = (pos) => {
        const currY = pos.y;
        // total stage height minus height of horizontal scroll bar
        // minus height of scroll slider
        const highBound = this.props.stageHeight - 24 - 100;
        return {
            x: this.props.stageWidth - 19,
            y: Math.min(Math.max(this.props.scrollPadding, pos.y), highBound)
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
                    x={this.props.stageWidth - 19}
                    y={10}
                    width={14}
                    height={100}
                    fill={UIColors.main}
                    draggable={true}
                    dragBoundFunc={this.verticalDragBoundFunc}
                    onDragMove={this.throttledVerticalDragMove}
                    onClick={this.handleAdditionalScrollBarEvents}
                    onMouseDown={this.handleAdditionalScrollBarEvents}
                />
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
                    x={10}
                    y={this.props.stageHeight - 19}
                    width={100}
                    height={14}
                    fill={UIColors.main}
                    draggable={true}
                    dragBoundFunc={this.horizontalDragBoundFunc}
                    onDragMove={this.throttledHorizontalDragMove}
                    onClick={this.handleAdditionalScrollBarEvents}
                    onMouseDown={this.handleAdditionalScrollBarEvents}
                />
            </Layer>
        );
    }
}

ScrollBarLayer.propTypes = {
    stageHeight: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
    scrollPadding: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    enterScrollBarActiveState: PropTypes.func.isRequired,
    gridLayerRef: PropTypes.object.isRequired,
    sectionsLayerRef: PropTypes.object.isRequired,
    transportLayerRef: PropTypes.object.isRequired,
    seekerLayerRef: PropTypes.object.isRequired,
    stageRef: PropTypes.object.isRequired,
    updateTrackInfoMenuTopScroll: PropTypes.func.isRequired
};

export default ScrollBarLayer;