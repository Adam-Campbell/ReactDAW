import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';

const Compressor = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Compressor'}
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
                inputId={'knee'}
                label={'Knee'}
                min={5}
                max={55}
                step={1}
                value={props.effectData.knee}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['knee']}
            />
            <EnhancedRangeInput 
                inputId={'ratio'}
                label={'Ratio'}
                min={1}
                max={60}
                step={0.25}
                value={props.effectData.ratio}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['ratio']}
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

Compressor.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Compressor;