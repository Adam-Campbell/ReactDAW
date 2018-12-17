import React from 'react';
import { Layer, Rect } from 'react-konva';

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
                stroke={'#d86597'}
                strokeWidth={2}
                fill={props.currentlySelectedNotes.includes(note._id) ? 
                    '#222222' :
                    '#ed90b9'
                }
                shadowColor={'#d86597'}
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

export default NoteLayer;