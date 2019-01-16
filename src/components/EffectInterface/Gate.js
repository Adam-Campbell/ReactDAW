import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const Gate = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Gate'}
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

Gate.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Gate;