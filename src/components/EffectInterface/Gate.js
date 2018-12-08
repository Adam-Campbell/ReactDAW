import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Gate = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Gate'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'attack'}
                label={'Attack'}
                min={0.001}
                max={0.5}
                step={0.001}
                value={props.effectData.attack}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['attack']}
            />
            <RangeInput 
                inputId={'release'}
                label={'Release'}
                min={0.001}
                max={0.5}
                step={0.001}
                value={props.effectData.release}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['release']}
            />
            <RangeInput 
                inputId={'threshold'}
                label={'threshold'}
                min={-96}
                max={0}
                step={0.5}
                value={props.effectData.threshold}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['threshold']}
            />
        </div>
    </div>
);

export default Gate;