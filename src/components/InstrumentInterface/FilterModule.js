import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

const FilterModule = props => (
    <div className="instrument-interface__module-container">
        <h2 className="instrument-interface__module-heading">Filter</h2>
        <div className="instrument-interface__dial-row">
            <Dial
                dataMin={0}
                dataMax={20}
                stepSize={0.05}
                snapToSteps={true}
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
                snapToSteps={true}
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
                snapToSteps={true}
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
        </div>
        <Switch 
            value={props.filterData.rolloff.toString()}
            handleChange={(newVal) => {
                props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filter', 'rolloff'],
                    parseFloat(newVal)
                );
            }}
            rowDescription="Rolloff"
            optionsData={[
                { id: 'rolloff-12', name: 'filter-rolloff', value: '-12', text: '-12' },
                { id: 'rolloff-24', name: 'filter-rolloff', value: '-24', text: '-24' },
                { id: 'rolloff-48', name: 'filter-rolloff', value: '-48', text: '-48' },
                { id: 'rolloff-96', name: 'filter-rolloff', value: '-96', text: '-96' }
            ]}
        />
        <Switch 
            value={props.filterData.type}
            handleChange={(newVal) => {
                props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filter', 'type'],
                    newVal
                );
            }}
            rowDescription="Filter Type"
            optionsData={[
                { id: 'filterTypeLowpass', name: 'filter-type', value: 'lowpass', text: 'Low Pass' },
                { id: 'filterTypeHighpass', name: 'filter-type', value: 'highpass', text: 'High Pass' },
                { id: 'filterTypeBandpass', name: 'filter-type', value: 'bandpass', text: 'Band Pass' },
                { id: 'filterTypesAllpass', name: 'filter-type', value: 'allpass', text: 'All Pass' }
            ]}
        />
        <Switch 
            value={props.filterData.type}
            handleChange={(newVal) => {
                props.handleChange(
                    props.instrumentId,
                    [...props.additionalNesting, 'filter', 'type'],
                    newVal
                );
            }}
            rowDescription="Filter Type"
            optionsData={[
                { id: 'filterTypeLowshelf', name: 'filter-type', value: 'lowshelf', text: 'Low Shelf' },
                { id: 'filterTypeHighshelf', name: 'filter-type', value: 'highshelf', text: 'High Shelf' },
                { id: 'filterTypeNotch', name: 'filter-type', value: 'notch', text: 'Notch' },
                { id: 'filterTypesPeaking', name: 'filter-type', value: 'peaking', text: 'Peaking' }
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