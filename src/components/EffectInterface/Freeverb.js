import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Freeverb = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Freeverb'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'dampening'}
                label={'Dampening'}
                min={40}
                max={16000}
                step={5}
                value={props.effectData.dampening}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['dampening']}
            />
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

Freeverb.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Freeverb;
