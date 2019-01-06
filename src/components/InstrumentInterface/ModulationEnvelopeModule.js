import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';

const ModulationEnvelopeModule = props => (
    <div className="instrument-interface__module-container">
        <h2 className="instrument-interface__module-heading">Modulation Envelope</h2>
        <EnhancedRangeInput 
            inputId={'modulation-envelope-attack'}
            label={'Attack'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.attack}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulationEnvelope', 'attack']}
        />
        <EnhancedSelectInput
            inputId={'modulation-envelope-attack-curve'}
            label={'Attack Curve'}
            value={props.modulationEnvelopeData.attackCurve}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulationEnvelope', 'attackCurve']}
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
            inputId={'modulation-envelope-decay'}
            label={'Decay'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.decay}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulationEnvelope', 'decay']}
        />
        <EnhancedRangeInput 
            inputId={'modulation-envelope-release'}
            label={'Release'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.release}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulationEnvelope', 'release']}
        />
        <EnhancedSelectInput
            inputId={'modulation-envelope-release-curve'}
            label={'Release Curve'}
            value={props.modulationEnvelopeData.releaseCurve}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulationEnvelope', 'releaseCurve']}
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
            inputId={'modulation-envelope-sustain'}
            label={'Sustain'}
            min={0}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.sustain}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulationEnvelope', 'sustain']}
        />
    </div>
);

ModulationEnvelopeModule.propTypes = {
    modulationEnvelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ModulationEnvelopeModule;