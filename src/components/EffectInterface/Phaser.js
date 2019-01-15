import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const Phaser = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Phaser'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={0}
                    dataMax={20}
                    stepSize={0.05}
                    snapToStep={true}
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
                    snapToStep={true}
                    value={props.effectData.baseFrequency}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['baseFrequency'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Base Frequency" />}
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
                    dataMax={7}
                    stepSize={1}
                    snapToStep={true}
                    value={props.effectData.octaves}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['octaves'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Octaves" />}
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
        </div>
    </div>
);

Phaser.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Phaser;