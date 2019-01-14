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

const FMSynth = props => (
    <div className="instrument-interface__container">
        <HeaderModule instrumentTitle="FM Synth" />
        <div className="instrument-interface__main-section">
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
            <ModulationEnvelopeModule 
                modulationEnvelopeData={props.instrumentData.modulationEnvelope}
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
        </div>
        <div className="instrument-interface__aside-section">
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
                dataMin={0}
                dataMax={20}
                stepSize={0.1}
                snapToStep={true}
                value={props.instrumentData.modulationIndex}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    ['modulationIndex'],
                    newVal
                )}
            >
                {(props) => <SmallDial {...props} label="Modulation Index" />}
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

FMSynth.propTypes = {
    instrumentData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default FMSynth;