import React, { Component } from 'react';
import { Layer, Rect } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';
import { adjustForScroll } from '../../sharedUtils';

class NoteLayer extends Component {
    constructor(props) {
        super(props);
        this.overlayRectRef = React.createRef();
        this.state = {
            mouseIsDown: false,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
        }
    }

    handleMouseDown = (e) => {
        this.setState({
            mouseIsDown: true,
            mouseDownPosX: adjustForScroll({ raw: e.evt.layerX, scroll: this.props.noteLayerRef.current.attrs.x }),
            mouseDownPosY: adjustForScroll({ raw: e.evt.layerY, scroll: this.props.noteLayerRef.current.attrs.y })
        });
    }

    handleMouseUp = (e) => {
        this.setState({
            mouseIsDown: false,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
            currentMousePosX: 0,
            currentMousePosY: 0
        });
        const overlay = this.overlayRectRef.current;
        overlay.x(0);
        overlay.y(0);
        overlay.width(0);
        overlay.height(0);
        this.props.noteLayerRef.current.batchDraw();
    }

    handleMouseMove = (e) => {
        if (this.state.mouseIsDown && this.props.shiftKeyPressed) {
            const currentMousePosX = adjustForScroll({ raw: e.evt.layerX, scroll: this.props.noteLayerRef.current.attrs.x });
            const currentMousePosY = adjustForScroll({ raw: e.evt.layerY, scroll: this.props.noteLayerRef.current.attrs.y });
            const { x, y, width, height } = this.getOverlayPosition({
                mouseDownPosX: this.state.mouseDownPosX,
                mouseDownPosY: this.state.mouseDownPosY,
                currentMousePosX,
                currentMousePosY,
            });
            const overlay = this.overlayRectRef.current;
            overlay.x(x);
            overlay.y(y);
            overlay.width(width);
            overlay.height(height);
            this.props.noteLayerRef.current.batchDraw();
        }
    }

    getOverlayPosition = (optionsObject) => {
        const {
            mouseDownPosX,
            mouseDownPosY,
            currentMousePosX,
            currentMousePosY
        } = optionsObject;
        if (
            mouseDownPosX === 0 && mouseDownPosY === 0 && 
            currentMousePosX === 0 && currentMousePosY === 0
        ) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        const leftBound = Math.min(mouseDownPosX, currentMousePosX);
        const rightBound = Math.max(mouseDownPosX, currentMousePosX);
        const topBound = Math.min(mouseDownPosY, currentMousePosY);
        const bottomBound = Math.max(mouseDownPosY, currentMousePosY);
        const width = rightBound - leftBound;
        const height = bottomBound - topBound;
        return {
            x: leftBound,
            y: topBound,
            width,
            height
        };
    }

    render() {
        return (
            <Layer
                x={48}
                y={40}
                ref={this.props.noteLayerRef}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
            >
                <Rect 
                    width={this.props.canvasWidth}
                    height={this.props.canvasHeight}
                    x={0}
                    y={0}
                />
                {this.props.sectionNotes.map((note, index) => (
                    <Rect 
                        x={note.x}
                        y={note.y}
                        width={note.width}
                        height={16}
                        stroke={UIColors.pink}
                        strokeWidth={2}
                        fill={this.props.currentlySelectedNotes.includes(note._id) ? 
                            UIColors.darkGrey :
                            '#ed90b9'
                        }
                        shadowColor={UIColors.pink}
                        shadowBlur={4}
                        shadowOffsetX={0}
                        shadowOffsetY={0}
                        pitch={note.pitch}
                        time={note.time}
                        _id={note._id}
                        type={'noteRect'}
                        key={note._id}
                        onClick={this.props.handleNoteClick}
                    />
                ))}
                <Rect 
                    ref={this.overlayRectRef}
                    fill="#08b5d3"
                    opacity={0.4}
                    cornerRadius={3}
                />
            </Layer>
        );
    }
}

NoteLayer.propTypes = {
    noteLayerRef: PropTypes.object.isRequired,
    sectionNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleNoteClick: PropTypes.func.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    shiftKeyPressed: PropTypes.bool.isRequired
};

export default NoteLayer;