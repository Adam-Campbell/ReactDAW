import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

const ModulationModule = props => (
    <div className="instrument-interface__module-container">
        <h2 className="instrument-interface__module-heading">Modulation</h2>
        <div className="instrument-interface__dial-row">
            <Dial
                dataMin={-100}
                dataMax={100}
                stepSize={0.25}
                snapToSteps={true}
                value={props.modulationData.detune}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulation', 'detune'],
                    newVal
                )}
            >
                {(props) => <SmallDial {...props} label="Detune" />}
            </Dial>
            <Dial
                dataMin={0}
                dataMax={360}
                stepSize={0.25}
                snapToSteps={true}
                value={props.modulationData.phase}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulation', 'phase'],
                    newVal
                )}
            >
                {(props) => <SmallDial {...props} label="Phase" />}
            </Dial>
            <Dial
                dataMin={-80}
                dataMax={20}
                stepSize={0.25}
                snapToSteps={true}
                value={props.modulationData.volume}
                dialStartOffset={225}
                dialRange={270}
                updateValueCallback={(newVal) => props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulation', 'volume'],
                    newVal
                )}
            >
                {(props) => <SmallDial {...props} label="Volume" />}
            </Dial>
        </div>
        <Switch 
            value={props.modulationData.type}
            handleChange={(newVal) => {
                props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'modulation', 'type'],
                    newVal
                );
            }}
            rowDescription="Waveform"
            optionsData={[
                { id: 'modulation-type-sine', name: 'modulation-type', value: 'sine', text: 'Sine' },
                { id: 'modulation-type-square', name: 'modulation-type', value: 'square', text: 'Square' },
                { id: 'modulation-type-triangle', name: 'modulation-type', value: 'triangle', text: 'Triangle' },
                { id: 'modulation-type-sawtooth', name: 'modulation-type', value: 'sawtooth', text: 'Sawtooth' },
            ]}
        />
    </div>
);

ModulationModule.propTypes = {
    modulationData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ModulationModule;