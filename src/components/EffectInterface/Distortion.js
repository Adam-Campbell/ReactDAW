import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Distortion = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Distortion'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'distortion'}
                label={'Distortion'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.distortion}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['distortion']}
            />
            <SelectInput 
                inputId={'oversample'}
                label={'Oversample'}
                value={props.effectData.oversample}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['oversample']}
                options={[
                    {value: 'none', text: 'None'},
                    {value: '2x', text: '2x'},
                    {value: '4x', text: '4x'}
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

export default Distortion;