import React from 'react';
import HeaderModule from './HeaderModule';
import OscillatorModule from './OscillatorModule';
import EnvelopeModule from './EnvelopeModule';
import ModulationModule from './ModulationModule';
import ModulationEnvelopeModule from './ModulationEnvelopeModule';
import RangeInput from './RangeInput';

const AMSynth = props => (
    <div className="synth-interface__container">
        <HeaderModule synthTitle="AM Synth" handleClose={props.handleClose} />
        <EnvelopeModule 
            envelopeData={props.instrumentData.envelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
        />
        <OscillatorModule 
            oscillatorData={props.instrumentData.oscillator}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
        />
        <ModulationModule 
            modulationData={props.instrumentData.modulation}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
        />
        <ModulationEnvelopeModule 
            modulationEnvelopeData={props.instrumentData.modulationEnvelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
        />
        <div className="synth-interface__module-container">
            <RangeInput 
                inputId={'detune'}
                label={'Detune'}
                min={-100}
                max={100}
                step={1}
                value={props.instrumentData.detune}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
                propertyPathArray={['detune']}
            />
            <RangeInput 
                inputId={'harmonicity'}
                label={'Harmonicity'}
                min={0.25}
                max={8}
                step={0.25}
                value={props.instrumentData.harmonicity}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
                propertyPathArray={['harmonicity']}
            />
            <RangeInput 
                inputId={'volume'}
                label={'Volume'}
                min={-80}
                max={20}
                step={1}
                value={props.instrumentData.volume}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
                propertyPathArray={['volume']}
            />
        </div>
    </div>
);

export default AMSynth;