import React from 'react';
import RangeInput from './RangeInput';
import SelectInput from './SelectInput';

const EnvelopeModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Envelope</h2>
        <RangeInput 
            inputId={'envelope-attack'}
            label={'Attack'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.envelopeData.attack}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['envelope', 'attack']}
        />
        <SelectInput
            inputId={'envelope-attack-curve'}
            label={'Attack Curve'}
            value={props.envelopeData.attackCurve}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['envelope', 'attackCurve']}
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
            inputId={'envelope-decay'}
            label={'Decay'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.envelopeData.decay}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['envelope', 'decay']}
        />
        <RangeInput 
            inputId={'envelope-release'}
            label={'Release'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.envelopeData.release}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['envelope', 'release']}
        />
        <SelectInput
            inputId={'envelope-release-curve'}
            label={'Release Curve'}
            value={props.envelopeData.releaseCurve}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['envelope', 'releaseCurve']}
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
            inputId={'envelope-sustain'}
            label={'Sustain'}
            min={0}
            max={1}
            step={0.005}
            value={props.envelopeData.sustain}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['envelope', 'sustain']}
        />
    </div>
);

export default EnvelopeModule;