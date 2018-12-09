import React from 'react';
import HeaderModule from './HeaderModule';
import OscillatorModule from './OscillatorModule';
import EnvelopeModule from './EnvelopeModule';

const Synth = props => (
    <div className="synth-interface__container synth-interface__container--small">
        <HeaderModule synthTitle="Synth" handleClose={props.handleClose} />
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
    </div>
);

export default Synth;