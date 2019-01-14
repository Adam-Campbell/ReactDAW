import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const ModulationModule = props => (
    <div className={
        `instrument-interface__module-container instrument-interface__module-container--horizontal
        ${props.dblCol ? 'instrument-interface__module-container--dbl-col' : ''}`
    }>
        <h2 className="instrument-interface__module-heading">Modulation</h2>
        <Dial
            dataMin={-100}
            dataMax={100}
            stepSize={0.25}
            snapToStep={true}
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
            snapToStep={true}
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
            snapToStep={true}
            value={props.modulationData.volume}
            dialStartOffset={225}
            dialRange={270}
            updateValueCallback={(newVal) => props.handleChange(
                props.instrumentId,
                [...props.additionalNesting, 'oscillator', 'volume'],
                newVal
            )}
        >
            {(props) => <SmallDial {...props} label="Volume" />}
        </Dial>
        <div className="instrument-interface__select-input-container">
            <EnhancedSelectInput
                inputId={'modulation-type'}
                label={'Type'}
                value={props.modulationData.type}
                handleChange={props.handleChange}
                identifier={props.instrumentId}
                propertyPathArray={[...props.additionalNesting, 'modulation', 'type']}
                options={[
                    {value: 'sine', text: 'Sine'},
                    {value: 'square', text: 'Square'},
                    {value: 'triangle', text: 'Triangle'},
                    {value: 'sawtooth', text: 'Sawtooth'}
                ]}
            />
        </div>
    </div>
);

ModulationModule.propTypes = {
    modulationData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired,
    dblCol: PropTypes.bool
};

export default ModulationModule;