import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';
import EffectHeader from './EffectHeader';

const FeedbackDelay = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Feedback Delay'}
            handleClose={props.handleClose}
        />
        <div className="effect__settings-container">
            <SelectInput 
                inputId={'delay-time'}
                label={'Delay Time'}
                value={props.effectData.delayTime}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['delayTime']}
                options={[
                    {value: '32n', text: '32n'},
                    {value: '32t', text: '32t'},
                    {value: '32n.', text: '32d'},
                    {value: '16n', text: '16n'},
                    {value: '16t', text: '16t'},
                    {value: '16n.', text: '16d'},
                    {value: '8n', text: '8n'},
                    {value: '8t', text: '8t'},
                    {value: '8n.', text: '8d'},
                    {value: '4n', text: '4n'},
                    {value: '4t', text: '4t'},
                    {value: '4n.', text: '4d'},
                    {value: '2n', text: '2n'},
                    {value: '2t', text: '2t'},
                    {value: '2n.', text: '2d'},
                    {value: '1m', text: '1m'}
                ]}
            />
            <RangeInput 
                inputId={'feedback'}
                label={'Feedback'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.feedback}
                handleChange={props.handleChange}
                effectId={props.effectId}
                propertyPathArray={['feedback']}
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

export default FeedbackDelay;

