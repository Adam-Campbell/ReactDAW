import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Vibrato = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Vibrato'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'depth'}
                label={'Depth'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.depth}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['depth']}
            />
            <RangeInput 
                inputId={'frequency'}
                label={'Frequency'}
                min={0.1}
                max={20}
                step={0.1}
                value={props.effectData.frequency}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['frequency']}
            />
            <SelectInput 
                inputId={'type'}
                label={'Type'}
                value={props.effectData.type}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['type']}
                options={[
                    { value: 'sine', text: 'Sine'},
                    { value: 'square', text: 'Square'},
                    { value: 'sawtooth', text: 'Sawtooth'},
                    { value: 'triangle', text: 'Triangle'}
                ]}
            />
            <RangeInput 
                inputId={'wet'}
                label={'Wet'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.wet}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['wet']}
            />
        </div>
    </div>
);

export default Vibrato;