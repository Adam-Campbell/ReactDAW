import React from 'react';
import { Layer, Rect } from 'react-konva';

const PianoKeyLayer = props => (
    <Layer
        y={40}
        ref={props.pianoKeyLayerRef}
    >
        {props.notesArray.map((note, index) => (
            <Rect 
                x={0}
                y={index * 16}
                width={48}
                height={16}
                stroke={'#201826'}
                strokeWidth={2}
                fill={note.includes('#') ? '#47426c' : '#e0e0e0'} 
                key={index} 
                pitch={note}
                type={'pianoKeyRect'}
                onClick={e => props.handlePianoKeyClick(e, note)}
            />
        ))}
    </Layer>
);

export default PianoKeyLayer;