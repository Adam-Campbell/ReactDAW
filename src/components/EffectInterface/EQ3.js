import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';

const EQ3 = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'EQ3'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={-40}
                    dataMax={10}
                    stepSize={0.1}
                    snapToStep={true}
                    value={props.effectData.high}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['high'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="High" />}
                </Dial> 
                <Dial
                    dataMin={1200}
                    dataMax={6000}
                    stepSize={25}
                    snapToStep={true}
                    value={props.effectData.highFrequency}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['highFrequency'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="High Frequency" />}
                </Dial>
                <Dial
                    dataMin={-40}
                    dataMax={10}
                    stepSize={0.1}
                    snapToStep={true}
                    value={props.effectData.low}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['low'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Low" />}
                </Dial>
                <Dial
                    dataMin={200}
                    dataMax={800}
                    stepSize={5}
                    snapToStep={true}
                    value={props.effectData.lowFrequency}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['lowFrequency'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Low Frequency" />}
                </Dial>
                <Dial
                    dataMin={-40}
                    dataMax={10}
                    stepSize={0.1}
                    snapToStep={true}
                    value={props.effectData.mid}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['mid'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Mid" />}
                </Dial>
            </div>
        </div>
    </div>
);

EQ3.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default EQ3;