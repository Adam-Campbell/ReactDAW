import React from 'react';
import PropTypes from 'prop-types';
import HeaderModule from './HeaderModule';
import OscillatorModule from './OscillatorModule';
import EnvelopeModule from './EnvelopeModule';
import ModulationModule from './ModulationModule';
import ModulationEnvelopeModule from './ModulationEnvelopeModule';
import EnhancedRangeInput from '../EnhancedRangeInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const AMSynth = props => (
    <div className="instrument-interface__container">
        <HeaderModule instrumentTitle="AM Synth" />
        <EnvelopeModule 
            envelopeData={props.instrumentData.envelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
            dblCol
        />
        <OscillatorModule 
            oscillatorData={props.instrumentData.oscillator}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
            dblCol
        />
        <ModulationModule 
            modulationData={props.instrumentData.modulation}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
            dblCol
        />
        <ModulationEnvelopeModule 
            modulationEnvelopeData={props.instrumentData.modulationEnvelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={[]}
            dblCol
        />
        <div className={`instrument-interface__module-container 
                         instrument-interface__module-container--horizontal
                         instrument-interface__module-container--dbl-col`
        }>
            <Dial
                dataMin={-100}
                dataMax={100}
                stepSize={0.25}
                snapToStep={true}
                value={props.instrumentData.detune}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    ['detune'],
                    newVal
                )}
            >
                {(props) => <SmallDial {...props} label="Detune" />}
            </Dial>
            <Dial
                dataMin={0.25}
                dataMax={8}
                stepSize={0.25}
                snapToStep={true}
                value={props.instrumentData.harmonicity}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    ['harmonicity'],
                    newVal
                )}
            >
                {(props) => <SmallDial {...props} label="Harmonicity" />}
            </Dial>
            <Dial
                dataMin={-80}
                dataMax={20}
                stepSize={0.25}
                snapToStep={true}
                value={props.instrumentData.volume}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    ['volume'],
                    newVal
                )}
            >
                {(props) => <SmallDial {...props} label="Volume" />}
            </Dial>
        </div>
    </div>
);

AMSynth.propTypes = {
    instrumentData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default AMSynth;