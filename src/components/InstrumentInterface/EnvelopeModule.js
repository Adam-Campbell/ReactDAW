import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';

const EnvelopeModule = props => (
    <div className="instrument-interface__module-container">
        <h2 className="instrument-interface__module-heading">Envelope</h2>
        <EnhancedRangeInput 
            inputId={'envelope-attack'}
            label={'Attack'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.envelopeData.attack}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'envelope', 'attack']}
        />
        <EnhancedSelectInput
            inputId={'envelope-attack-curve'}
            label={'Attack Curve'}
            value={props.envelopeData.attackCurve}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'envelope', 'attackCurve']}
            options={[
                {value: 'linear', text: 'Linear'},
                {value: 'exponential', text: 'Exponential'},
                {value: 'sine', text: 'Sine'},
                {value: 'cosine', text: 'Cosine'},
                {value: 'bounce', text: 'Bounce'},
                {value: 'ripple', text: 'Ripple'},
                {value: 'step', text: 'Step'}
            ]}
        />
        <EnhancedRangeInput 
            inputId={'envelope-decay'}
            label={'Decay'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.envelopeData.decay}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'envelope', 'decay']}
        />
        <EnhancedRangeInput 
            inputId={'envelope-release'}
            label={'Release'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.envelopeData.release}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'envelope', 'release']}
        />
        <EnhancedSelectInput
            inputId={'envelope-release-curve'}
            label={'Release Curve'}
            value={props.envelopeData.releaseCurve}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'envelope', 'releaseCurve']}
            options={[
                {value: 'linear', text: 'Linear'},
                {value: 'exponential', text: 'Exponential'},
                {value: 'sine', text: 'Sine'},
                {value: 'cosine', text: 'Cosine'},
                {value: 'bounce', text: 'Bounce'},
                {value: 'ripple', text: 'Ripple'},
                {value: 'step', text: 'Step'}
            ]}

        />
        <EnhancedRangeInput 
            inputId={'envelope-sustain'}
            label={'Sustain'}
            min={0}
            max={1}
            step={0.005}
            value={props.envelopeData.sustain}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'envelope', 'sustain']}
        />
    </div>
);

EnvelopeModule.propTypes = {
    envelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default EnvelopeModule;