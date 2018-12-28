import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';

const OscillatorModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Oscillator</h2>
        <EnhancedRangeInput 
            inputId={'oscillator-detune'}
            label={'Detune'}
            min={-100}
            max={100}
            step={1}
            value={props.oscillatorData.detune}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'oscillator', 'detune']}
        />
        <EnhancedRangeInput 
            inputId={'oscillator-phase'}
            label={'Phase'}
            min={0}
            max={360}
            step={1}
            value={props.oscillatorData.phase}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'oscillator', 'phase']}
        />
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
        <EnhancedRangeInput 
            inputId={'oscillator-volume'}
            label={'Volume'}
            min={-80}
            max={20}
            step={1}
            value={props.oscillatorData.volume}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'oscillator', 'volume']}
        />
    </div>
);

OscillatorModule.propTypes = {
    oscillatorData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default OscillatorModule;