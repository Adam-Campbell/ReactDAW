import React from 'react';
import { Layer, Rect, Line } from 'react-konva';
import { UIColors } from '../../constants';

const VelocityLayer = props => (
    <Layer
        x={48}
        y={props.stageHeight - 134}
        ref={props.velocityLayerRef}
        onClick={props.handleVelocityLayerClick}
        onMouseUp={e => e.cancelBubble = true}
    >
        <Line 
            points={[0, 0, props.canvasWidth, 0]}
            listening={false}
            stroke={UIColors.pink}
            strokeWidth={4}
            shadowColor={UIColors.pink}
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={0}
        />
        <Rect
            x={0}
            y={0}
            height={110}
            width={props.canvasWidth} 
            fill={UIColors.deepPurple}
        />
        {props.unselectedNotes.map(note => (
            <Rect 
                fill={UIColors.pink}
                width={8}
                height={note.velocity*100}
                x={note.x}
                y={110 - (note.velocity*100)}
                key={note._id}
            />
        ))}
        {props.selectedNotes.map(note => (
            <Rect 
                fill={UIColors.lightPurple}
                width={8}
                height={note.velocity*100}
                x={note.x}
                y={110 - (note.velocity*100)}
                key={note._id}
            />
        ))}
    </Layer>
);

export default VelocityLayer;