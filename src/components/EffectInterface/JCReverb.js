import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const JCReverb = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'JC Reverb'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <RangeInput 
                inputId={'room-size'}
                label={'Room Size'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.roomSize}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['roomSize']}
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

export default JCReverb;