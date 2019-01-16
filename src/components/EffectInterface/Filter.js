import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

const Filter = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Filter'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={0}
                    dataMax={20}
                    stepSize={0.05}
                    snapToSteps={true}
                    value={props.effectData.Q}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['Q'],
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
                    value={props.effectData.frequency}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['frequency'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Frequency" />}
                </Dial>
                <Dial
                    dataMin={-40}
                    dataMax={10}
                    stepSize={0.1}
                    snapToSteps={true}
                    value={props.effectData.gain}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['gain'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Gain" />}
                </Dial>
            </div>
            <Switch 
                value={props.effectData.rolloff.toString()}
                handleChange={(newVal) => {
                    props.handleChange(
                        props.effectId,
                        ['rolloff'],
                        parseFloat(newVal)
                    );
                }}
                rowDescription="Rolloff"
                optionsData={[
                    { id: 'filter-rolloff-12', name: 'filter-rolloff', value: '-12', text: '-12' },
                    { id: 'filter-rolloff-24', name: 'filter-rolloff', value: '-24', text: '-24' },
                    { id: 'filter-rolloff-48', name: 'filter-rolloff', value: '-48', text: '-48' },
                    { id: 'filter-rolloff-96', name: 'filter-rolloff', value: '-96', text: '-96' }
                ]}
            />
            <Switch 
                value={props.effectData.type}
                handleChange={(newVal) => {
                    props.handleChange(
                        props.effectId,
                        ['type'],
                        newVal
                    );
                }}
                rowDescription="Filter Type"
                optionsData={[
                    { id: 'filter-type-lowpass', name: 'filter-type', value: 'lowpass', text: 'Low Pass' },
                    { id: 'filter-type-highpass', name: 'filter-type', value: 'highpass', text: 'High Pass' },
                    { id: 'filter-type-bandpass', name: 'filter-type', value: 'bandpass', text: 'Band Pass' },
                    { id: 'filter-type-allpass', name: 'filter-type', value: 'allpass', text: 'All Pass' }
                ]}
            />
            <Switch 
                value={props.effectData.type}
                handleChange={(newVal) => {
                    props.handleChange(
                        props.effectId,
                        ['type'],
                        newVal
                    );
                }}
                rowDescription="Filter Type"
                optionsData={[
                    { id: 'filter-type-lowshelf', name: 'filter-type', value: 'lowshelf', text: 'Low Shelf' },
                    { id: 'filter-type-highshelf', name: 'filter-type', value: 'highshelf', text: 'High Shelf' },
                    { id: 'filter-type-notch', name: 'filter-type', value: 'notch', text: 'Notch' },
                    { id: 'filter-type-peaking', name: 'filter-type', value: 'peaking', text: 'Peaking' }
                ]}
            />
        </div>
    </div>
);

Filter.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Filter;