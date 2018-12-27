import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Filter = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Filter'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'q'}
                label={'Q'}
                min={0}
                max={20}
                step={0.5}
                value={props.effectData.Q}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['Q']}
            />
            <EnhancedRangeInput 
                inputId={'frequency'}
                label={'Frequency'}
                min={40}
                max={16000}
                step={5}
                value={props.effectData.frequency}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['frequency']}
            />
            <EnhancedRangeInput 
                inputId={'gain'}
                label={'Gain'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.gain}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['gain']}
            />
            <EnhancedSelectInput 
                inputId={'rolloff'}
                label={'Rolloff'}
                value={props.effectData.rolloff}
                handleChange={props.handleChange}
                identifier={props.effectId}
                shouldConvertToFloat={true}
                propertyPathArray={['rolloff']}
                options={[
                    { value: '-12', text: '-12'},
                    { value: '-24', text: '-24'},
                    { value: '-48', text: '-48'},
                    { value: '-96', text: '-96'}
                ]}
            />
            <EnhancedSelectInput 
                inputId={'type'}
                label={'Type'}
                value={props.effectData.type}
                handleChange={props.handleChange}
                identifier={props.effectId}
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

Filter.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Filter;