import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import Dial from '../Dial';
import XSDial from '../XSDial';

const FilterEnvelopeModule = props => (
    <div className="instrument-interface__module-container">
        <h2 className="instrument-interface__module-heading">Filter Envelope</h2>
        <div className="adsr-placeholder"></div>
        <div className="instrument-interface__dial-row">
            <Dial
                dataMin={0.005}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.filterEnvelopeData.attack}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filterEnvelope', 'attack'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Attack" />}
            </Dial>
            <Dial
                dataMin={0}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.filterEnvelopeData.decay}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filterEnvelope', 'decay'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Decay" />}
            </Dial>
            <Dial
                dataMin={0}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.filterEnvelopeData.sustain}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filterEnvelope', 'sustain'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Sustain" />}
            </Dial>
            <Dial
                dataMin={0.005}
                dataMax={1}
                stepSize={0.005}
                snapToStep={true}
                value={props.filterEnvelopeData.release}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filterEnvelope', 'release'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Release" />}
            </Dial>
        </div>
        <div className="instrument-interface__dial-row">
            <Dial
                dataMin={40}
                dataMax={16000}
                stepSize={5}
                snapToStep={true}
                value={props.filterEnvelopeData.baseFrequency}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filterEnvelope', 'baseFrequency'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Base Frequency" />}
            </Dial>
            
            <Dial
                dataMin={1}
                dataMax={10}
                stepSize={1}
                snapToStep={true}
                value={props.filterEnvelopeData.exponent}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filterEnvelope', 'exponent'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Exponent" />}
            </Dial>
            <Dial
                dataMin={0}
                dataMax={10}
                stepSize={1}
                snapToStep={true}
                value={props.filterEnvelopeData.octaves}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filterEnvelope', 'octaves'],
                    newVal
                )}
            >
                {(props) => <XSDial {...props} label="Octaves" />}
            </Dial>
            
            
        </div>
    </div>
);

FilterEnvelopeModule.propTypes = {
    filterEnvelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterEnvelopeModule;