import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Line } from 'react-konva';
import Konva from 'konva';

const GridLayer = props => (
    <Layer ref={props.gridLayerRef}>
        <Rect 
            x={0}
            y={0}
            width={props.canvasWidth}
            height={props.canvasHeight}
            fill={'#201826'}
        />
        {
            props.gridLinesArray.map((linePoints, index) => (
                <Line
                    points={linePoints}
                    listening={false}
                    stroke={'#47426c'}
                    strokeWidth={2}
                    shadowColor={'#47426c'}
                    shadowBlur={4}
                    shadowOffsetX={0}
                    shadowOffsetY={0}
                    key={index}
                />
            ))
        }
    </Layer>
);

export default GridLayer;