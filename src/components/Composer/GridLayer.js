import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Line } from 'react-konva';
import { UIColors } from '../../constants';

const GridLayer = props => (
    <Layer ref={props.gridLayerRef}>
        <Rect 
            x={0}
            y={0}
            width={props.canvasWidth}
            height={props.canvasHeight}
            fill={UIColors.backgroundDark}
        />
        {
            props.gridLinesArray.map((linePoints, index) => (
                <Line
                    points={linePoints}
                    listening={false}
                    stroke={UIColors.backgroundMedium}
                    strokeWidth={2}
                    shadowColor={UIColors.backgroundMedium}
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
    canvasHeight: PropTypes.number.isRequired,
    gridLinesArray: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default GridLayer;