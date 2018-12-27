import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Vibrato = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Vibrato'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'depth'}
                label={'Depth'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.depth}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['depth']}
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

Vibrato.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Vibrato;