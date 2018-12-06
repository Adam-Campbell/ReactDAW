import React from 'react';
import HeaderModule from './HeaderModule';
import EnvelopeModule from './EnvelopeModule';
import OscillatorModule from './OscillatorModule';
import FilterModule from './FilterModule';
import FilterEnvelopeModule from './FilterEnvelopeModule';

const MonoSynth = props => (
    <div className="synth-interface__container">
        <HeaderModule synthTitle="Mono Synth" handleClose={props.handleClose} />
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
        <FilterModule 
            filterData={props.instrumentData.filter}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
        />
        <FilterEnvelopeModule 
            filterEnvelopeData={props.instrumentData.filterEnvelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
        />
    </div>
);

export default MonoSynth;