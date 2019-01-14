import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const FilterEnvelopeModule = props => (
    <div className={
        `instrument-interface__module-container instrument-interface__module-container--horizontal
        ${props.dblCol ? 'instrument-interface__module-container--dbl-col' : ''}`
    }>
        <h2 className="instrument-interface__module-heading">Filter Envelope</h2>
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
            {(props) => <SmallDial {...props} label="Attack" />}
        </Dial>
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
            {(props) => <SmallDial {...props} label="Base Frequency" />}
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
            {(props) => <SmallDial {...props} label="Decay" />}
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
            {(props) => <SmallDial {...props} label="Exponent" />}
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
            {(props) => <SmallDial {...props} label="Octaves" />}
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
            {(props) => <SmallDial {...props} label="Release" />}
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
            {(props) => <SmallDial {...props} label="Sustain" />}
        </Dial>
    </div>
);

FilterEnvelopeModule.propTypes = {
    filterEnvelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterEnvelopeModule;