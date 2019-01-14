import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';
import Dial from '../Dial';
import XSDial from '../XSDial';

const ModulationEnvelopeModule = props => (
    <div className="instrument-interface__module-container">
        <h2 className="instrument-interface__module-heading">Modulation Envelope</h2>
        <div className="adsr-placeholder"></div>
        <div className="instrument-interface__dial-row">
            <Dial
                dataMin={0.005}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.modulationEnvelopeData.attack}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulationEnvelope', 'attack'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Attack" />}
            </Dial>
            <Dial
                dataMin={0.005}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.modulationEnvelopeData.decay}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulationEnvelope', 'decay'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Decay" />}
            </Dial>
            <Dial
                dataMin={0.005}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.modulationEnvelopeData.release}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulationEnvelope', 'release'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Release" />}
            </Dial>
            <Dial
                dataMin={0.005}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.modulationEnvelopeData.sustain}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulationEnvelope', 'sustain'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Sustain" />}
            </Dial>
        </div>
    </div>
);

ModulationEnvelopeModule.propTypes = {
    modulationEnvelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ModulationEnvelopeModule;