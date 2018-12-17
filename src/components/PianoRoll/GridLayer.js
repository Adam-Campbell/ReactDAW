import React from 'react';
import { Layer, Rect, Line } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';

const GridLayer = props => (
    <Layer 
        x={48} 
        y={40} 
        ref={props.gridLayerRef} 
    >
        <Rect 
            x={0}
            y={0}
            width={props.canvasWidth}
            height={1728}
            fill={UIColors.deepPurple}
        />
        {
            props.gridLinesArray.map((line, index) => (
                <Line 
                    points={line.points}
                    listening={false}
                    stroke={UIColors.pink}
                    strokeWidth={line.strokeWidth}
                    shadowColor={'#ed90b9'}
                    shadowBlur={4}
                    shadowOffsetX={0}
                    shadowOffsetY={0}
                    key={index}
                />
            ))
        }
    </Layer>
);

GridLayer.propTypes = {
    gridLayerRef: PropTypes.object.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    gridLinesArray: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default GridLayer;