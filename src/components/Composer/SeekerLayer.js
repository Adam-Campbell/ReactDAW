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
            stroke={'#e0e0e0'}
            strokeWidth={2}
        />
    </Layer>
);

export default SeekerLayer;