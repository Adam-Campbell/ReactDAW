import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Line } from 'react-konva';
import { UIColors } from '../../constants';

const SeekerLayer = props => (
    <Layer ref={props.seekerLayerRef}>
        <Line
            ref={props.seekerLineRef}
            points={[0, 0, 0, props.canvasHeight]}
            listening={false}
            stroke={UIColors.offWhite}
            strokeWidth={2}
        />
    </Layer>
);

SeekerLayer.propTypes = {
    seekerLayerRef: PropTypes.object.isRequired,
    seekerLineRef: PropTypes.object.isRequired,
    canvasHeight: PropTypes.number.isRequired
}

export default SeekerLayer;