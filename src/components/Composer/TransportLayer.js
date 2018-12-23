import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Text } from 'react-konva';
import { UIColors } from '../../constants';

const TransportLayer = props => (
    <Layer ref={props.transportLayerRef}>
        <Rect 
            x={0}
            y={0}
            width={props.canvasWidth}
            height={40}
            fill={UIColors.deepPurple}
        />
        {
            new Array(200).fill(0).map((el, index) => (
                <Text 
                    text={`${index+1}`}
                    x={(index+1) * 48}
                    y={20}
                    key={index}
                    fill={UIColors.offWhite}
                    shadowColor={UIColors.offWhite}
                    shadowBlur={4}
                    shadowOffsetX={0}
                    shadowOffsetY={0}
                />
            ))
        }
    </Layer>
);

TransportLayer.propTypes = {
    transportLayerRef: PropTypes.object.isRequired,
    canvasWidth: PropTypes.number.isRequired
};

export default TransportLayer;