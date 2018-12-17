import React from 'react';
import { Layer, Rect, Text } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';  

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
            fill={UIColors.deepPurple}
        />
        {props.transportBarNumbersArray.map((barObject, index) =>(
            <Text 
                text={barObject.barNumber}
                x={barObject.xPos}
                y={20}
                key={index}
                fill={UIColors.offWhite}
                shadowColor={UIColors.offWhite}
                shadowBlur={4}
                shadowOffsetX={0}
                shadowOffsetY={0}
            />
        ))}
    </Layer>
);

TransportLayer.propTypes = {
    transportLayerRef: PropTypes.object.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    transportBarNumbersArray: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TransportLayer;