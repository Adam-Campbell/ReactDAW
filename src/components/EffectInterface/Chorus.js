import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

const Chorus = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Chorus'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={2}
                    dataMax={20}
                    stepSize={0.05}
                    snapToSteps={true}
                    value={props.effectData.delayTime}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['delayTime'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Delay Time" />}
                </Dial>
                <Dial
                    dataMin={0}
                    dataMax={1}
                    stepSize={0.005}
                    snapToSteps={true}
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
                    dataMax={10}
                    stepSize={0.005}
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
                    dataMin={0}
                    dataMax={180}
                    stepSize={0.5}
                    snapToSteps={true}
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
                    snapToSteps={true}
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
                rowDescription={"Wave Type"}
                optionsData={[
                    { name: 'chorus-wave-type', value: 'sine', id: 'chorus-sine', text: 'Sine' },
                    { name: 'chorus-wave-type', value: 'square', id: 'chorus-square', text: 'Square' },
                    { name: 'chorus-wave-type', value: 'triangle', id: 'chorus-triangle', text: 'Triangle' },
                    { name: 'chorus-wave-type', value: 'sawtooth', id: 'chorus-sawtooth', text: 'Sawtooth' }
                ]}
            />
        </div>
    </div>
);

Chorus.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Chorus;