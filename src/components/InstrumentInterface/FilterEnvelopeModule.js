import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';

const FilterEnvelopeModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Filter Envelope</h2>
        <EnhancedRangeInput 
            inputId={'filter-envelope-attack'}
            label={'Attack'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.attack}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'attack']}
        />
        <EnhancedSelectInput
            inputId={'filter-envelope-attack-curve'}
            label={'Attack Curve'}
            value={props.filterEnvelopeData.attackCurve}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'attackCurve']}
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
            inputId={'filter-envelope-base-frequency'}
            label={'Base Frequency'}
            min={50}
            max={16000}
            step={25}
            value={props.filterEnvelopeData.baseFrequency}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'baseFrequency']}
        />
        <EnhancedRangeInput 
            inputId={'filter-envelope-decay'}
            label={'Decay'}
            min={0}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.decay}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'decay']}
        />
        <EnhancedRangeInput 
            inputId={'filter-envelope-exponent'}
            label={'Exponent'}
            min={1}
            max={10}
            step={1}
            value={props.filterEnvelopeData.exponent}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'exponent']}
        />
        <EnhancedRangeInput 
            inputId={'filter-envelope-octaves'}
            label={'Octaves'}
            min={0}
            max={10}
            step={1}
            value={props.filterEnvelopeData.octaves}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'octaves']}
        />
        <EnhancedRangeInput 
            inputId={'filter-envelope-release'}
            label={'Release'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.release}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'release']}
        />
        <EnhancedSelectInput
            inputId={'filter-envelope-release-curve'}
            label={'Release Curve'}
            value={props.filterEnvelopeData.releaseCurve}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'releaseCurve']}
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
            inputId={'filter-envelope-sustain'}
            label={'Sustain'}
            min={0}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.sustain}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'sustain']}
        />
    </div>
);

FilterEnvelopeModule.propTypes = {
    filterEnvelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterEnvelopeModule;