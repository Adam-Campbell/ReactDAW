import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const Limiter = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Limiter'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
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

Limiter.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Limiter;