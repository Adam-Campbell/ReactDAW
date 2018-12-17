import React from 'react';
import { Layer, Line } from 'react-konva';

const SeekerLayer = props => (
    <Layer
        x={48}
        ref={props.seekerLayerRef}
    >
        <Line
            ref={props.seekerLineRef}
            points={[0, 0, 0, props.canvasHeight]}
            listening={false}
            stroke={'#e0e0e0'}
            strokeWidth={0}
        />
    </Layer>
);

export default SeekerLayer;