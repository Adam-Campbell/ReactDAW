import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';


const EQ3 = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'EQ3'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'high'}
                label={'High'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.high}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['high']}
            />
            <RangeInput 
                inputId={'high-frequency'}
                label={'High Frequency'}
                min={1200}
                max={6000}
                step={25}
                value={props.effectData.highFrequency}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['highFrequency']}
            />
            <RangeInput 
                inputId={'low'}
                label={'Low'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.low}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['low']}
            />
            <RangeInput 
                inputId={'low-frequency'}
                label={'Low Frequency'}
                min={200}
                max={800}
                step={10}
                value={props.effectData.lowFrequency}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['lowFrequency']}
            />
            <RangeInput 
                inputId={'mid'}
                label={'Mid'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.mid}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['mid']}
            />
        </div>
    </div>
);

export default EQ3;