import React from 'react';
import RangeInput from './RangeInput';
import SelectInput from './SelectInput';

const FilterModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Filter</h2>
        <RangeInput 
            inputId={'filter-q'}
            label={'Q'}
            min={0}
            max={20}
            step={0.5}
            value={props.filterData.Q}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filter', 'Q']}
        />
        <RangeInput 
            inputId={'filter-frequency'}
            label={'Frequency'}
            min={40}
            max={16000}
            step={5}
            value={props.filterData.frequency}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filter', 'frequency']}
        />
        <RangeInput 
            inputId={'filter-gain'}
            label={'Gain'}
            min={0}
            max={2}
            step={0.1}
            value={props.filterData.gain}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filter', 'gain']}
        />
        <SelectInput 
            inputId={'filter-rolloff'}
            label={'Rolloff'}
            value={props.filterData.rolloff}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            shouldConvertToFloat={true}
            propertyPathArray={[...props.additionalNesting, 'filter', 'rolloff']}
            options={[
                { value: '-12', text: '-12'},
                { value: '-24', text: '-24'},
                { value: '-48', text: '-48'},
                { value: '-96', text: '-96'}
            ]}
        />
        <SelectInput 
            inputId={'filter-type'}
            label={'Type'}
            value={props.filterData.type}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filter', 'type']}
            options={[
                { value: 'lowpass', text: 'Low Pass'},
                { value: 'highpass', text: 'High Pass'},
                { value: 'bandpass', text: 'Band Pass'},
                { value: 'lowshelf', text: 'Low Shelf'},
                { value: 'highshelf', text: 'High Shelf'},
                { value: 'notch', text: 'Notch'},
                { value: 'allpass', text: 'All Pass'},
                { value: 'peaking', text: 'Peaking'}
            ]}
        />
    </div>
);

export default FilterModule;