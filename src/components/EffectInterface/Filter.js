import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Filter = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Filter'}
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
                effectId={props.effectId}
                propertyPathArray={['Q']}
            />
            <RangeInput 
                inputId={'frequency'}
                label={'Frequency'}
                min={40}
                max={16000}
                step={5}
                value={props.effectData.frequency}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['frequency']}
            />
            <RangeInput 
                inputId={'gain'}
                label={'Gain'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.gain}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['gain']}
            />
            <SelectInput 
                inputId={'rolloff'}
                label={'Rolloff'}
                value={props.effectData.rolloff}
                handleChange={props.handleChange}
                effectId={props.effectId}
                shouldConvertToFloat={true}
                propertyPathArray={['rolloff']}
                options={[
                    { value: '-12', text: '-12'},
                    { value: '-24', text: '-24'},
                    { value: '-48', text: '-48'},
                    { value: '-96', text: '-96'}
                ]}
            />
            <SelectInput 
                inputId={'type'}
                label={'Type'}
                value={props.effectData.type}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['type']}
                options={[
                    { value: 'lowpass', text: 'Low Pass'},
                    { value: 'highpass', text: 'High Pass'},
                    { value: 'bandpass', text: 'Band Pass'},
                    { value: 'lowshelf', text: 'Low Shelf'},
                    { value: 'highshelf', text: 'High Shelf'},
                    { value: 'notch', text: 'Notch'},
                    { value: 'allpass', text: 'All Pass'},
                    { value: 'peaking', text: 'Peaking'}
                ]}
            />
        </div>
    </div>
);

export default Filter;