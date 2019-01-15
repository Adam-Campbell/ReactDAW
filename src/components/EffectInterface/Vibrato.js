import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

const Vibrato = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Vibrato'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={0}
                    dataMax={1}
                    stepSize={0.005}
                    snapToStep={true}
                    value={props.effectData.depth}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['depth'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Depth" />}
                </Dial>
                <Dial
                    dataMin={0.1}
                    dataMax={20}
                    stepSize={0.05}
                    snapToStep={true}
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
                    dataMin={0}
                    dataMax={1}
                    stepSize={0.005}
                    snapToStep={true}
                    value={props.effectData.wet}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['wet'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Wet" />}
                </Dial>
            </div>
            <Switch 
                value={props.effectData.type}
                handleChange={(newVal) => {
                    props.handleChange(
                        props.effectId,
                        ['type'],
                        newVal
                    );
                }}
                rowDescription="Waveform"
                optionsData={[
                    { id: 'vibrato-type-sine', name: 'vibrato-wave-type', value: 'sine', text: 'Sine' },
                    { id: 'vibrato-type-square', name: 'vibrato-wave-type', value: 'square', text: 'Square' },
                    { id: 'vibrato-type-triangle', name: 'vibrato-wave-type', value: 'triangle', text: 'Triangle' },
                    { id: 'vibrato-type-sawtooth', name: 'vibrato-wave-type', value: 'sawtooth', text: 'Sawtooth' },
                ]}
            />
            <EnhancedRangeInput 
                inputId={'depth'}
                label={'Depth'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.depth}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['depth']}
            />
            <EnhancedRangeInput 
                inputId={'frequency'}
                label={'Frequency'}
                min={0.1}
                max={20}
                step={0.1}
                value={props.effectData.frequency}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['frequency']}
            />
            <EnhancedSelectInput 
                inputId={'type'}
                label={'Type'}
                value={props.effectData.type}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['type']}
                options={[
                    { value: 'sine', text: 'Sine'},
                    { value: 'square', text: 'Square'},
                    { value: 'sawtooth', text: 'Sawtooth'},
                    { value: 'triangle', text: 'Triangle'}
                ]}
            />
            <EnhancedRangeInput 
                inputId={'wet'}
                label={'Wet'}
                min={0}
                max={1}
                step={0.005}
                value={props.effectData.wet}
                handleChange={props.handleChange}
                identifier={props.effectId}
                propertyPathArray={['wet']}
            />
        </div>
    </div>
);

Vibrato.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Vibrato;