import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const FeedbackDelay = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Feedback Delay'}
        />
        <div className="effect__settings-container">
            <EnhancedSelectInput 
                inputId={'delay-time'}
                label={'Delay Time'}
                value={props.effectData.delayTime}
                handleChange={props.handleChange}
                identifier={props.effectId}
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
            <EnhancedRangeInput 
                inputId={'feedback'}
                label={'Feedback'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.feedback}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['feedback']}
            />
            <EnhancedRangeInput 
                inputId={'wet'}
                label={'Wet'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.wet}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['wet']}
            />
        </div>
    </div>
);

FeedbackDelay.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default FeedbackDelay;

