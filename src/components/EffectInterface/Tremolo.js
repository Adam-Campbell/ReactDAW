import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

const Tremolo = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Tremolo'}
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
                    dataMax={180}
                    stepSize={0.5}
                    snapToStep={true}
                    value={props.effectData.spread}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['spread'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Spread" />}
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
                    { id: 'tremolo-type-sine', name: 'tremolo-wave-type', value: 'sine', text: 'Sine' },
                    { id: 'tremolo-type-square', name: 'tremolo-wave-type', value: 'square', text: 'Square' },
                    { id: 'tremolo-type-triangle', name: 'tremolo-wave-type', value: 'triangle', text: 'Triangle' },
                    { id: 'tremolo-type-sawtooth', name: 'tremolo-wave-type', value: 'sawtooth', text: 'Sawtooth' },
                ]}
            />
        </div>
    </div>
);

Tremolo.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Tremolo;

