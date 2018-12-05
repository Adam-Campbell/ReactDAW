import React from 'react';
import RangeInput from './RangeInput';
import SelectInput from './SelectInput';

const OscillatorModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Oscillator</h2>
        <RangeInput 
            inputId={'oscillator-detune'}
            label={'Detune'}
            min={-100}
            max={100}
            step={1}
            value={props.oscillatorData.detune}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['oscillator', 'detune']}
        />
        <RangeInput 
            inputId={'oscillator-phase'}
            label={'Phase'}
            min={0}
            max={360}
            step={1}
            value={props.oscillatorData.phase}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['oscillator', 'phase']}
        />
        <SelectInput
            inputId={'oscillator-type'}
            label={'Type'}
            value={props.oscillatorData.type}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['oscillator', 'type']}
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
        <RangeInput 
            inputId={'oscillator-volume'}
            label={'Volume'}
            min={-80}
            max={20}
            step={1}
            value={props.oscillatorData.volume}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['oscillator', 'volume']}
        />
    </div>
);

export default OscillatorModule;