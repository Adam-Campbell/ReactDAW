import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Distortion = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Distortion'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'distortion'}
                label={'Distortion'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.distortion}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['distortion']}
            />
            <EnhancedSelectInput 
                inputId={'oversample'}
                label={'Oversample'}
                value={props.effectData.oversample}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['oversample']}
                options={[
                    {value: 'none', text: 'None'},
                    {value: '2x', text: '2x'},
                    {value: '4x', text: '4x'}
                ]}
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

Distortion.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Distortion;