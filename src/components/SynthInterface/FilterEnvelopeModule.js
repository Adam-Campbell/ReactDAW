import React from 'react';
import SelectInput from './SelectInput';
import RangeInput from './RangeInput';

const FilterEnvelopeModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Filter Envelope</h2>
        <RangeInput 
            inputId={'filter-envelope-attack'}
            label={'Attack'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.attack}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'attack']}
        />
        <SelectInput
            inputId={'filter-envelope-attack-curve'}
            label={'Attack Curve'}
            value={props.filterEnvelopeData.attackCurve}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
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
        <RangeInput 
            inputId={'filter-envelope-base-frequency'}
            label={'Base Frequency'}
            min={50}
            max={16000}
            step={25}
            value={props.filterEnvelopeData.baseFrequency}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'baseFrequency']}
        />
        <RangeInput 
            inputId={'filter-envelope-decay'}
            label={'Decay'}
            min={0}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.decay}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'decay']}
        />
        <RangeInput 
            inputId={'filter-envelope-exponent'}
            label={'Exponent'}
            min={1}
            max={10}
            step={1}
            value={props.filterEnvelopeData.exponent}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'exponent']}
        />
        <RangeInput 
            inputId={'filter-envelope-octaves'}
            label={'Octaves'}
            min={0}
            max={10}
            step={1}
            value={props.filterEnvelopeData.octaves}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'octaves']}
        />
        <RangeInput 
            inputId={'filter-envelope-release'}
            label={'Release'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.release}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'release']}
        />
        <SelectInput
            inputId={'filter-envelope-release-curve'}
            label={'Release Curve'}
            value={props.filterEnvelopeData.releaseCurve}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
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
        <RangeInput 
            inputId={'filter-envelope-sustain'}
            label={'Sustain'}
            min={0}
            max={1}
            step={0.005}
            value={props.filterEnvelopeData.sustain}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filterEnvelope', 'sustain']}
        />
    </div>
);

export default FilterEnvelopeModule;