import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const JCReverb = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'JC Reverb'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'room-size'}
                label={'Room Size'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.roomSize}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['roomSize']}
            />
            <EnhancedRangeInput 
                inputId={'wet'}
                label={'Wet'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.wet}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['wet']}
            />
        </div>
    </div>
);

JCReverb.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default JCReverb;