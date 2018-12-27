import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Gate = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Gate'}
        />
        <div className="effect__settings-container">
            <EnhancedRangeInput 
                inputId={'attack'}
                label={'Attack'}
                min={0.001}
                max={0.5}
                step={0.001}
                value={props.effectData.attack}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['attack']}
            />
            <EnhancedRangeInput 
                inputId={'release'}
                label={'Release'}
                min={0.001}
                max={0.5}
                step={0.001}
                value={props.effectData.release}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['release']}
            />
            <EnhancedRangeInput 
                inputId={'threshold'}
                label={'threshold'}
                min={-96}
                max={0}
                step={0.5}
                value={props.effectData.threshold}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['threshold']}
            />
        </div>
    </div>
);

Gate.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Gate;