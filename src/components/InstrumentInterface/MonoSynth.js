import React from 'react';
import PropTypes from 'prop-types';
import HeaderModule from './HeaderModule';
import EnvelopeModule from './EnvelopeModule';
import OscillatorModule from './OscillatorModule';
import FilterModule from './FilterModule';
import FilterEnvelopeModule from './FilterEnvelopeModule';

const MonoSynth = props => (
    <div className="instrument-interface__container">
        <HeaderModule instrumentTitle="Mono Synth" />
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
        <FilterEnvelopeModule 
            filterEnvelopeData={props.instrumentData.filterEnvelope}
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
    </div>
);

MonoSynth.propTypes = {
    instrumentData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default MonoSynth;