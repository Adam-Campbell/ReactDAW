import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Phaser = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Phaser'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'q'}
                label={'Q'}
                min={0}
                max={20}
                step={0.5}
                value={props.effectData.Q}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['Q']}
            />
            <RangeInput 
                inputId={'base-frequency'}
                label={'Base Frequency'}
                min={40}
                max={16000}
                step={25}
                value={props.effectData.baseFrequency}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['baseFrequency']}
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
                inputId={'octaves'}
                label={'Octaves'}
                min={0}
                max={7}
                step={1}
                value={props.effectData.octaves}
                handleChange={props.handleChange}
                instrumentId={props.effectId}
                propertyPathArray={['octaves']}
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

export default Phaser;