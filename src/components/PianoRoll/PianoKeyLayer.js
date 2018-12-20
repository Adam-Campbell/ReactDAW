import React from 'react';
import { Layer, Rect } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';

const PianoKeyLayer = props => (
    <Layer
        y={40}
        ref={props.pianoKeyLayerRef}
    >
        {props.pitchesArray.map((pitch, index) => (
            <Rect 
                x={0}
                y={index * 16}
                width={48}
                height={16}
                stroke={UIColors.deepPurple}
                strokeWidth={2}
                fill={pitch.includes('#') ? UIColors.lightPurple : UIColors.offWhite} 
                key={index} 
                pitch={pitch}
                type={'pianoKeyRect'}
                onClick={e => props.handlePianoKeyClick(e, pitch)}
            />
        ))}
    </Layer>
);

PianoKeyLayer.propTypes = {
    pianoKeyLayerRef: PropTypes.object.isRequired,
    handlePianoKeyClick: PropTypes.func.isRequired,
    pitchesArray: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PianoKeyLayer;