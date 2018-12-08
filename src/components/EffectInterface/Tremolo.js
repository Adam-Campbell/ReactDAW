import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Tremolo = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Tremolo'}
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
                instrumentId={props.effectId}
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
                instrumentId={props.effectId}
                propertyPathArray={['frequency']}
            />
            <RangeInput 
                inputId={'spread'}
                label={'Spread'}
                min={0}
                max={180}
                step={1}
                value={props.effectData.spread}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['spread']}
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
            <RangeInput 
                inputId={'wet'}
                label={'Wet'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.wet}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['wet']}
            />
        </div>
    </div>
);

export default Tremolo;

