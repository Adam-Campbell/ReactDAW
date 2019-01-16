import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const Compressor = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Compressor'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={0.001}
                    dataMax={0.5}
                    stepSize={0.001}
                    snapToSteps={true}
                    value={props.effectData.attack}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['attack'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Attack" />}
                </Dial>
                <Dial
                    dataMin={5}
                    dataMax={55}
                    stepSize={0.25}
                    snapToSteps={true}
                    value={props.effectData.knee}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['knee'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Knee" />}
                </Dial>
                <Dial
                    dataMin={1}
                    dataMax={60}
                    stepSize={0.25}
                    snapToSteps={true}
                    value={props.effectData.ratio}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['ratio'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Ratio" />}
                </Dial>
                <Dial
                    dataMin={0.001}
                    dataMax={0.5}
                    stepSize={0.001}
                    snapToSteps={true}
                    value={props.effectData.release}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['release'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Release" />}
                </Dial>
                <Dial
                    dataMin={-96}
                    dataMax={0}
                    stepSize={0.25}
                    snapToSteps={true}
                    value={props.effectData.threshold}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['threshold'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Threshold" />}
                </Dial>
            </div>
        </div>
    </div>
);

Compressor.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Compressor;