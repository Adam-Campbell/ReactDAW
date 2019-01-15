import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EffectHeader from './EffectHeader';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';


const Distortion = props => (
    <div className="effect__container">
        <EffectHeader 
            effectTitle={'Distortion'}
        />
        <div className="effect__settings-container">
            <div className="effect__dial-row">
                <Dial
                    dataMin={0}
                    dataMax={1}
                    stepSize={0.005}
                    snapToStep={true}
                    value={props.effectData.distortion}
                    dialStartOffset={225}
                    dialRange={270}
                    updateValueCallback={(newVal) => props.handleChange(
                        props.effectId,
                        ['distortion'],
                        newVal
                    )}
                >
                    {(props) => <SmallDial {...props} label="Distortion" />}
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
                value={props.effectData.oversample}
                handleChange={(newVal) => {
                    props.handleChange(
                        props.effectId,
                        ['oversample'],
                        newVal
                    );
                }}
                rowDescription="Oversample"
                optionsData={[
                    { name: 'distortion-oversample', value: 'none', id: 'distortion-none', text: 'None' },
                    { name: 'distortion-oversample', value: '2x', id: 'distortion-2x', text: '2x' },
                    { name: 'distortion-oversample', value: '4x', id: 'distortion-4x', text: '4x' }
                ]}
            />
        </div>
    </div>
);

Distortion.propTypes = {
    effectData: PropTypes.object.isRequired,
    effectId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Distortion;