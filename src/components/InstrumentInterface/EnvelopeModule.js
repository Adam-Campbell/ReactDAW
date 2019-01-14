import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import Dial from '../Dial';
import XSDial from '../XSDial';

const EnvelopeModule = props => (
    <div className="instrument-interface__module-container">
        <h2 className="instrument-interface__module-heading">Envelope</h2>
        <div className="adsr-placeholder"></div>
        <div className="instrument-interface__dial-row">
            <Dial
                dataMin={0.005}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.envelopeData.attack}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'envelope', 'attack'],
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
                value={props.envelopeData.decay}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'envelope', 'decay'],
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
                value={props.envelopeData.release}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'envelope', 'release'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Release" />}
            </Dial>
            <Dial
                dataMin={0}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.envelopeData.sustain}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'envelope', 'sustain'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Sustain" />}
            </Dial>
        </div>
    </div>
);

EnvelopeModule.propTypes = {
    envelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired,
    dblCol: PropTypes.bool
};

export default EnvelopeModule;