import React from 'react';
import { Layer, Rect } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';

const NoteLayer = props => (
    <Layer
        x={48}
        y={40}
        ref={props.noteLayerRef}
    >
        {props.section.notes.map((note, index) => (
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
                onMouseUp={e => e.cancelBubble = true}
            />
        ))}
    </Layer>
);

NoteLayer.propTypes = {
    noteLayerRef: PropTypes.object.isRequired,
    section: PropTypes.object.isRequired,
    currentlySelectedNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleNoteClick: PropTypes.func.isRequired
};

export default NoteLayer;