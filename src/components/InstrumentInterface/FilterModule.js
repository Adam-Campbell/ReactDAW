import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';

const FilterModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Filter</h2>
        <EnhancedRangeInput 
            inputId={'filter-q'}
            label={'Q'}
            min={0}
            max={20}
            step={0.5}
            value={props.filterData.Q}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filter', 'Q']}
        />
        <EnhancedRangeInput 
            inputId={'filter-frequency'}
            label={'Frequency'}
            min={40}
            max={16000}
            step={5}
            value={props.filterData.frequency}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filter', 'frequency']}
        />
        <EnhancedRangeInput 
            inputId={'filter-gain'}
            label={'Gain'}
            min={-40}
            max={10}
            step={0.1}
            value={props.filterData.gain}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'filter', 'gain']}
        />
        <EnhancedSelectInput 
            inputId={'filter-rolloff'}
            label={'Rolloff'}
            value={props.filterData.rolloff.toString()}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            shouldConvertToFloat={true}
            propertyPathArray={[...props.additionalNesting, 'filter', 'rolloff']}
            options={[
                { value: '-12', text: '-12'},
                { value: '-24', text: '-24'},
                { value: '-48', text: '-48'},
                { value: '-96', text: '-96'}
            ]}
        />
        <EnhancedSelectInput 
            inputId={'filter-type'}
            label={'Type'}
            value={props.filterData.type}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
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

FilterModule.propTypes = {
    filterData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterModule;