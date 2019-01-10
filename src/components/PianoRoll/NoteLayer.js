import React from 'react';
import { Layer, Rect } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';

const NoteLayer = props => (
    <Layer
        x={48}
        y={40}
        ref={props.noteLayerRef}
        onMouseDown={props.handleMouseDown}
        onMouseUp={props.handleMouseUp}
        onMouseMove={props.handleMouseMove}
    >
        <Rect 
            width={props.canvasWidth}
            height={props.canvasHeight}
            x={0}
            y={0}
        />
        {props.sectionNotes.map((note, index) => (
            <Rect 
                x={note.x}
                y={note.y}
                width={note.width}
                height={16}
                stroke={UIColors.pink}
                strokeWidth={2}
                fill={props.currentlySelectedNotes.includes(note._id) ? 
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
                onClick={props.handleNoteClick}
            />
        ))}
        <Rect 
            ref={props.overlayRectRef}
            fill="#08b5d3"
            opacity={0.4}
            cornerRadius={3}
        />
    </Layer>
);

NoteLayer.propTypes = {
    noteLayerRef: PropTypes.object.isRequired,
    sectionNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleNoteClick: PropTypes.func.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    overlayRectRef: PropTypes.object.isRequired
};

export default NoteLayer;