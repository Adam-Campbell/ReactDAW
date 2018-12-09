import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Limiter = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Limiter'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'threshold'}
                label={'Threshold'}
                min={-96}
                max={10}
                step={0.5}
                value={props.effectData.threshold}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['threshold']}
            />
        </div>
    </div>
);

export default Limiter;