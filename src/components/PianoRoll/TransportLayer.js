import React from 'react';
import { Layer, Rect, Text } from 'react-konva';

const TransportLayer = props => (
    <Layer
        x={48}
        ref={props.transportLayerRef}
    >
        <Rect 
            x={-48}
            y={0}
            width={props.canvasWidth+52}
            height={40}
            fill={'#201826'}
        />
        {props.transportBarNumbersArray.map((barObject, index) =>(
            <Text 
                text={barObject.barNumber}
                x={barObject.xPos}
                y={20}
                key={index}
                fill={'#e0e0e0'}
                shadowColor={'#e0e0e0'}
                shadowBlur={4}
                shadowOffsetX={0}
                shadowOffsetY={0}
            />
        ))}
    </Layer>
);

export default TransportLayer;