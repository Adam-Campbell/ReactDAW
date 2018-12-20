import React from 'react';
import { Layer, Line } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';

const SeekerLayer = props => (
    <Layer
        x={48}
        ref={props.seekerLayerRef}
    >
        <Line
            ref={props.seekerLineRef}
            points={[0, 0, 0, props.canvasHeight]}
            listening={false}
            stroke={UIColors.offWhite}
            strokeWidth={0}
        />
    </Layer>
);

SeekerLayer.propTypes = {
    seekerLayerRef: PropTypes.object.isRequired,
    seekerLineRef: PropTypes.object.isRequired,
    canvasHeight: PropTypes.number.isRequired
};

export default SeekerLayer;