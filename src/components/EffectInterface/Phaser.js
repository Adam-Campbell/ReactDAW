import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Phaser = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Phaser'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'q'}
                label={'Q'}
                min={0}
                max={20}
                step={0.5}
                value={props.effectData.Q}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['Q']}
            />
            <EnhancedRangeInput 
                inputId={'base-frequency'}
                label={'Base Frequency'}
                min={40}
                max={16000}
                step={25}
                value={props.effectData.baseFrequency}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['baseFrequency']}
            />
            <EnhancedRangeInput 
                inputId={'frequency'}
                label={'Frequency'}
                min={0.1}
                max={20}
                step={0.1}
                value={props.effectData.frequency}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['frequency']}
            />
            <EnhancedRangeInput 
                inputId={'octaves'}
                label={'Octaves'}
                min={0}
                max={7}
                step={1}
                value={props.effectData.octaves}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['octaves']}
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

Phaser.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Phaser;