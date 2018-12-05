import React from 'react';
import RangeInput from './RangeInput';
import SelectInput from './SelectInput';

const ModulationEnvelopeModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Modulation Envelope</h2>
        <RangeInput 
            inputId={'modulation-envelope-attack'}
            label={'Attack'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.attack}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulationEnvelope', 'attack']}
        />
        <SelectInput
            inputId={'modulation-envelope-attack-curve'}
            label={'Attack Curve'}
            value={props.modulationEnvelopeData.attackCurve}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulationEnvelope', 'attackCurve']}
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
            inputId={'modulation-envelope-decay'}
            label={'Decay'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.decay}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulationEnvelope', 'decay']}
        />
        <RangeInput 
            inputId={'modulation-envelope-release'}
            label={'Release'}
            min={0.005}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.release}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulationEnvelope', 'release']}
        />
        <SelectInput
            inputId={'modulation-envelope-release-curve'}
            label={'Release Curve'}
            value={props.modulationEnvelopeData.releaseCurve}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulationEnvelope', 'releaseCurve']}
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
            inputId={'modulation-envelope-sustain'}
            label={'Sustain'}
            min={0}
            max={1}
            step={0.005}
            value={props.modulationEnvelopeData.sustain}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulationEnvelope', 'sustain']}
        />
    </div>
);

export default ModulationEnvelopeModule;