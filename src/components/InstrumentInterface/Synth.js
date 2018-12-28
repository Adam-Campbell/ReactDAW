import React from 'react';
import PropTypes from 'prop-types';
import HeaderModule from './HeaderModule';
import OscillatorModule from './OscillatorModule';
import EnvelopeModule from './EnvelopeModule';

const Synth = props => (
    <div className="synth-interface__container synth-interface__container--small">
        <HeaderModule synthTitle="Synth" />
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

Synth.propTypes = {
    instrumentData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Synth;