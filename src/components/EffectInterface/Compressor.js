import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const Compressor = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Compressor'}
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
                inputId={'knee'}
                label={'Knee'}
                min={5}
                max={55}
                step={1}
                value={props.effectData.knee}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['knee']}
            />
            <RangeInput 
                inputId={'ratio'}
                label={'Ratio'}
                min={1}
                max={60}
                step={0.25}
                value={props.effectData.ratio}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['ratio']}
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

export default Compressor;