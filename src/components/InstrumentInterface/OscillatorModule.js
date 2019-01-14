import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import OscillatorTypeSwitch from './OscillatorTypeSwitch';

const OscillatorModule = props => (
    <div className={
        `instrument-interface__module-container instrument-interface__module-container--horizontal
        ${props.dblCol ? 'instrument-interface__module-container--dbl-col' : ''}`
    }>
        <h2 className="instrument-interface__module-heading">Oscillator</h2>
        <Dial
            dataMin={-100}
            dataMax={100}
            stepSize={0.25}
            snapToStep={true}
            value={props.oscillatorData.detune}
            dialStartOffset={225}
            dialRange={270}
            updateValueCallback={(newVal) => props.handleChange(
                props.instrumentId,
                [...props.additionalNesting, 'oscillator', 'detune'],
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
            value={props.oscillatorData.phase}
            dialStartOffset={225}
            dialRange={270}
            updateValueCallback={(newVal) => props.handleChange(
                props.instrumentId,
                [...props.additionalNesting, 'oscillator', 'phase'],
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
            value={props.oscillatorData.volume}
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
                inputId={'oscillator-type'}
                label={'Type'}
                value={props.oscillatorData.type}
                handleChange={props.handleChange}
                identifier={props.instrumentId}
                propertyPathArray={[...props.additionalNesting, 'oscillator', 'type']}
                options={[
                    {value: 'sine', text: 'Sine'},
                    {value: 'amsine', text: 'AM Sine'},
                    {value: 'fmsine', text: 'FM Sine'},
                    {value: 'fatsine', text: 'Fat Sine'},
                    {value: 'square', text: 'Square'},
                    {value: 'amsquare', text: 'AM Square'},
                    {value: 'fmsquare', text: 'FM Square'},
                    {value: 'fatsquare', text: 'Fat Square'},
                    {value: 'triangle', text: 'Triangle'},
                    {value: 'amtriangle', text: 'AM Triangle'},
                    {value: 'fmtriangle', text: 'FM Triangle'},
                    {value: 'fattriangle', text: 'Fat Triangle'},
                    {value: 'sawtooth', text: 'Sawtooth'},
                    {value: 'amsawtooth', text: 'AM Sawtooth'},
                    {value: 'fmsawtooth', text: 'FM Sawtooth'},
                    {value: 'fatsawtooth', text: 'Fat Sawtooth'}
                ]}
            />
            <OscillatorTypeSwitch 
                value={props.oscillatorData.type}
                handleChangeCallback={(newVal) => {
                    props.handleChange(
                        props.instrumentId,
                        [...props.additionalNesting, 'oscillator', 'type'],
                        newVal
                    );
                }}
            />
        </div>
    </div>
);

OscillatorModule.propTypes = {
    oscillatorData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired,
    dblCol: PropTypes.bool
};

export default OscillatorModule;