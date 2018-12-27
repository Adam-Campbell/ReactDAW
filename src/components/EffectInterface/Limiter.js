import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Limiter = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Limiter'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'threshold'}
                label={'Threshold'}
                min={-96}
                max={10}
                step={0.5}
                value={props.effectData.threshold}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['threshold']}
            />
        </div>
    </div>
);

Limiter.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Limiter;