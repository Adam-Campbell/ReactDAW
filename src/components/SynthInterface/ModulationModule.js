import React from 'react';
import RangeInput from './RangeInput';
import SelectInput from './SelectInput';

const ModulationModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Modulation</h2>
        <RangeInput 
            inputId={'modulation-detune'}
            label={'Detune'}
            min={-100}
            max={100}
            step={1}
            value={props.modulationData.detune}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulation', 'detune']}
        />
        <RangeInput 
            inputId={'modulation-phase'}
            label={'Phase'}
            min={0}
            max={360}
            step={1}
            value={props.modulationData.phase}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulation', 'phase']}
        />
        <SelectInput
            inputId={'modulation-type'}
            label={'Type'}
            value={props.modulationData.type}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulation', 'type']}
            options={[
                {value: 'sine', text: 'Sine'},
                {value: 'square', text: 'Square'},
                {value: 'triangle', text: 'Triangle'},
                {value: 'sawtooth', text: 'Sawtooth'}
            ]}
        />
        <RangeInput 
            inputId={'modulation-volume'}
            label={'Volume'}
            min={-80}
            max={20}
            step={1}
            value={props.modulationData.volume}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={['modulation', 'volume']}
        />
    </div>
);

export default ModulationModule;