import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const FilterModule = props => (
    <div className={
        `instrument-interface__module-container instrument-interface__module-container--horizontal
        ${props.dblCol ? 'instrument-interface__module-container--dbl-col' : ''}`
    }>
        <h2 className="instrument-interface__module-heading">Filter</h2>
        <Dial
            dataMin={0}
            dataMax={20}
            stepSize={0.05}
            snapToStep={true}
            value={props.filterData.Q}
            dialStartOffset={225}
            dialRange={270}
            updateValueCallback={(newVal) => props.handleChange(
                props.instrumentId,
                [...props.additionalNesting, 'filter', 'Q'],
                newVal
            )}
        >
            {(props) => <SmallDial {...props} label="Q" />}
        </Dial>
        <Dial
            dataMin={40}
            dataMax={16000}
            stepSize={5}
            snapToStep={true}
            value={props.filterData.frequency}
            dialStartOffset={225}
            dialRange={270}
            updateValueCallback={(newVal) => props.handleChange(
                props.instrumentId,
                [...props.additionalNesting, 'filter', 'frequency'],
                newVal
            )}
        >
            {(props) => <SmallDial {...props} label="Frequency" />}
        </Dial>
        <Dial
            dataMin={-40}
            dataMax={10}
            stepSize={0.05}
            snapToStep={true}
            value={props.filterData.gain}
            dialStartOffset={225}
            dialRange={270}
            updateValueCallback={(newVal) => props.handleChange(
                props.instrumentId,
                [...props.additionalNesting, 'filter', 'gain'],
                newVal
            )}
        >
            {(props) => <SmallDial {...props} label="Gain" />}
        </Dial>
        <div className="instrument-interface__select-input-container">
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
        </div>
        <div className="instrument-interface__select-input-container">
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
    </div>
);

FilterModule.propTypes = {
    filterData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FilterModule;