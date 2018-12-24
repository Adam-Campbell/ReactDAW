import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const LFO = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'LFO'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'amplitude'}
                label={'Amplitude'}
                min={0.25}
                max={4}
                step={0.05}
                value={props.effectData.amplitude}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['amplitude']}
            />
            <EnhancedRangeInput 
                inputId={'frequency'}
                label={'Frequency'}
                min={0.1}
                max={10}
                step={0.1}
                value={props.effectData.frequency}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['frequency']}
            />
            <EnhancedRangeInput 
                inputId={'max'}
                label={'Max'}
                min={1}
                max={10}
                step={0.1}
                value={props.effectData.max}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['max']}
            />
            <EnhancedRangeInput 
                inputId={'min'}
                label={'Min'}
                min={-10}
                max={0}
                step={0.1}
                value={props.effectData.min}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['min']}
            />
            <EnhancedRangeInput 
                inputId={'phase'}
                label={'Phase'}
                min={0}
                max={360}
                step={1}
                value={props.effectData.phase}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['phase']}
            />
            <EnhancedSelectInput 
                inputId={'type'}
                label={'Type'}
                value={props.effectData.type}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['type']}
                options={[
                    { value: 'sine', text: 'Sine'},
                    { value: 'square', text: 'Square'},
                    { value: 'sawtooth', text: 'Sawtooth'},
                    { value: 'triangle', text: 'Triangle'}
                ]}
            />
        </div>
    </div>
);

LFO.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default LFO;