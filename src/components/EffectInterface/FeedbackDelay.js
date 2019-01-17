import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

const FeedbackDelay = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Feedback Delay'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={0}
                    dataMax={1}
                    stepSize={0.005}
                    snapToSteps={true}
                    value={props.effectData.feedback}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['feedback'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Feedback" />}
                </Dial>
                <Dial
                    dataMin={0}
                    dataMax={1}
                    stepSize={0.004}
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
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '16px'
            }}>
                <EnhancedSelectInput 
                    inputId={'delay-time'}
                    label={'Delay Time'}
                    value={props.effectData.delayTime}
                    handleChange={props.handleChange}
                    identifier={props.effectId}
                    propertyPathArray={['delayTime']}
                    options={[
                        {value: '32n', text: '32n'},
                        {value: '32t', text: '32t'},
                        {value: '32n.', text: '32d'},
                        {value: '16n', text: '16n'},
                        {value: '16t', text: '16t'},
                        {value: '16n.', text: '16d'},
                        {value: '8n', text: '8n'},
                        {value: '8t', text: '8t'},
                        {value: '8n.', text: '8d'},
                        {value: '4n', text: '4n'},
                        {value: '4t', text: '4t'},
                        {value: '4n.', text: '4d'},
                        {value: '2n', text: '2n'},
                        {value: '2t', text: '2t'},
                        {value: '2n.', text: '2d'},
                        {value: '1m', text: '1m'}
                    ]}
                />
            </div>
        </div>
    </div>
);

FeedbackDelay.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default FeedbackDelay;

