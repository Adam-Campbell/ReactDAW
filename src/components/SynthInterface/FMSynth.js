import React from 'react';
import HeaderModule from './HeaderModule';
import OscillatorModule from './OscillatorModule';
import EnvelopeModule from './EnvelopeModule';
import ModulationModule from './ModulationModule';
import ModulationEnvelopeModule from './ModulationEnvelopeModule';

const FMSynth = props => (
    <div className="synth-interface__container">
        <HeaderModule synthTitle="FM Synth" handleClose={props.handleClose} />
        <EnvelopeModule 
            envelopeData={props.instrumentData.envelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
        />
        <OscillatorModule 
            oscillatorData={props.instrumentData.oscillator}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
        />
        <ModulationModule 
            modulationData={props.instrumentData.modulation}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
        />
        <ModulationEnvelopeModule 
            modulationEnvelopeData={props.instrumentData.modulationEnvelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
        />
    </div>
);

export default FMSynth;