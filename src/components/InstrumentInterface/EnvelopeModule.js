import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const EnvelopeModule = props => (
    <div className="instrument-interface__module-container instrument-interface__module-container--horizontal">
        <h2 className="instrument-interface__module-heading">Envelope</h2>
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
            {(props) => <SmallDial {...props} label="Attack" />}
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
            {(props) => <SmallDial {...props} label="Decay" />}
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
            {(props) => <SmallDial {...props} label="Release" />}
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
            {(props) => <SmallDial {...props} label="Sustain" />}
        </Dial>
    </div>
);

EnvelopeModule.propTypes = {
    envelopeData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default EnvelopeModule;