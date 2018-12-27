import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';


const EQ3 = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'EQ3'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'high'}
                label={'High'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.high}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['high']}
            />
            <EnhancedRangeInput 
                inputId={'high-frequency'}
                label={'High Frequency'}
                min={1200}
                max={6000}
                step={25}
                value={props.effectData.highFrequency}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['highFrequency']}
            />
            <EnhancedRangeInput 
                inputId={'low'}
                label={'Low'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.low}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['low']}
            />
            <EnhancedRangeInput 
                inputId={'low-frequency'}
                label={'Low Frequency'}
                min={200}
                max={800}
                step={10}
                value={props.effectData.lowFrequency}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['lowFrequency']}
            />
            <EnhancedRangeInput 
                inputId={'mid'}
                label={'Mid'}
                min={-40}
                max={10}
                step={0.1}
                value={props.effectData.mid}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['mid']}
            />
        </div>
    </div>
);

EQ3.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default EQ3;