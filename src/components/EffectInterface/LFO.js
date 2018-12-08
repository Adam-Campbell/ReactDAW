import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const LFO = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'LFO'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'amplitude'}
                label={'Amplitude'}
                min={0.25}
                max={4}
                step={0.05}
                value={props.effectData.amplitude}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['amplitude']}
            />
            <RangeInput 
                inputId={'frequency'}
                label={'Frequency'}
                min={0.1}
                max={10}
                step={0.1}
                value={props.effectData.frequency}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['frequency']}
            />
            <RangeInput 
                inputId={'max'}
                label={'Max'}
                min={1}
                max={10}
                step={0.1}
                value={props.effectData.max}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['max']}
            />
            <RangeInput 
                inputId={'min'}
                label={'Min'}
                min={-10}
                max={0}
                step={0.1}
                value={props.effectData.min}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['min']}
            />
            <RangeInput 
                inputId={'phase'}
                label={'Phase'}
                min={0}
                max={360}
                step={1}
                value={props.effectData.phase}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['phase']}
            />
            <SelectInput 
                inputId={'type'}
                label={'Type'}
                value={props.effectData.type}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
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

export default LFO;