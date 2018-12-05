import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { debounce } from 'lodash';
import RangeInput from './RangeInput';
import SelectInput from './SelectInput';
import HeaderModule from './HeaderModule';
import EnvelopeModule from './EnvelopeModule';
import OscillatorModule from './OscillatorModule';
import Synth from './Synth';
import AMSynth from './AMSynth';
import FMSynth from './FMSynth';
import { synthTypes } from '../../constants';

class SynthInterface extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
        this.handleChange = debounce(this.props.updateOneInstrumentSetting, 16, {leading: true, trailing: true}).bind(this);
        const synth = this.props.instruments[this.props.instrumentId];
        this.state = {
            ...synth
        };
    }

    get instrumentData() {
        return this.props.instruments[this.props.instrumentId].synthData;
    }

    handleClose = () => {
        this.props.closeWindow(this.props.instrumentId);
    }

    render() {

        const synthType = this.props.instruments[this.props.instrumentId].type;

        switch (synthType) {
            case synthTypes.default:
                return <Synth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                    handleClose={this.handleClose}
                />

            case synthTypes.am:
                return <AMSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                    handleClose={this.handleClose}
                />

            case synthTypes.fm:
            return <FMSynth 
                instrumentData={this.instrumentData}
                instrumentId={this.props.instrumentId}
                handleChange={this.handleChange}
                handleClose={this.handleClose}
            />

            default:
                return null;
        }

    }
}

const mapStateToProps = (state) => ({
    instruments: state.instruments
});

export default connect(
    mapStateToProps,
    {
        updateInstrumentSettings: ActionCreators.updateInstrumentSettings,
        updateOneInstrumentSetting: ActionCreators.updateOneInstrumentSetting,
        closeWindow: ActionCreators.closeWindow
    }
)(SynthInterface);





/*







 return (
            <div className="synth-interface__container">
                <HeaderModule synthTitle="Synth" handleClose={this.handleClose} />
                <EnvelopeModule 
                    envelopeData={this.instrumentData.envelope}
                    handleChange={this.handleChange}
                    instrumentId={this.props.instrumentId}
                />
                <OscillatorModule 
                    oscillatorData={this.instrumentData.oscillator}
                    handleChange={this.handleChange}
                    instrumentId={this.props.instrumentId}
                />
            </div>
        )













<div className="synth-interface__header-container">
                    <h1 className="synth-interface__title">Synth</h1>
                    <button 
                        className="synth-interface__close-button" 
                        onClick={this.handleClose}
                    >X</button>
                </div>
                <div className="synth-interface__module-container">
                    <h2 className="synth-interface__module-heading">Envelope</h2>
                    <RangeInput 
                        inputId={'envelope-attack'}
                        label={'Attack'}
                        min={0.005}
                        max={1}
                        step={0.005}
                        value={this.instrumentData.envelope.attack}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['envelope', 'attack']}
                    />
                    <SelectInput
                        inputId={'envelope-attack-curve'}
                        label={'Attack Curve'}
                        value={this.instrumentData.envelope.attackCurve}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['envelope', 'attackCurve']}
                        options={[
                            {value: 'linear', text: 'Linear'},
                            {value: 'exponential', text: 'Exponential'},
                            {value: 'sine', text: 'Sine'},
                            {value: 'cosine', text: 'Cosine'},
                            {value: 'bounce', text: 'Bounce'},
                            {value: 'ripple', text: 'Ripple'},
                            {value: 'step', text: 'Step'}
                        ]}
                    />
                    <RangeInput 
                        inputId={'envelope-decay'}
                        label={'Decay'}
                        min={0.005}
                        max={1}
                        step={0.005}
                        value={this.instrumentData.envelope.decay}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['envelope', 'decay']}
                    />
                    <RangeInput 
                        inputId={'envelope-release'}
                        label={'Release'}
                        min={0.005}
                        max={1}
                        step={0.005}
                        value={this.instrumentData.envelope.release}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['envelope', 'release']}
                    />
                    <SelectInput
                        inputId={'envelope-release-curve'}
                        label={'Release Curve'}
                        value={this.instrumentData.envelope.releaseCurve}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['envelope', 'releaseCurve']}
                        options={[
                            {value: 'linear', text: 'Linear'},
                            {value: 'exponential', text: 'Exponential'},
                            {value: 'sine', text: 'Sine'},
                            {value: 'cosine', text: 'Cosine'},
                            {value: 'bounce', text: 'Bounce'},
                            {value: 'ripple', text: 'Ripple'},
                            {value: 'step', text: 'Step'}
                        ]}
                    />
                    <RangeInput 
                        inputId={'envelope-sustain'}
                        label={'Sustain'}
                        min={0}
                        max={1}
                        step={0.005}
                        value={this.instrumentData.envelope.sustain}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['envelope', 'sustain']}
                    />
                </div>
                <div className="synth-interface__module-container">
                    <h2 className="synth-interface__module-heading">Oscillator</h2>
                    <RangeInput 
                        inputId={'oscillator-detune'}
                        label={'Detune'}
                        min={-100}
                        max={100}
                        step={1}
                        value={this.instrumentData.oscillator.detune}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['oscillator', 'detune']}
                    />
                    <RangeInput 
                        inputId={'oscillator-phase'}
                        label={'Phase'}
                        min={0}
                        max={360}
                        step={1}
                        value={this.instrumentData.oscillator.phase}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['oscillator', 'phase']}
                    />
                    <SelectInput
                        inputId={'oscillator-type'}
                        label={'Type'}
                        value={this.instrumentData.oscillator.type}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['oscillator', 'type']}
                        options={[
                            {value: 'sine', text: 'Sine'},
                            {value: 'amsine', text: 'AM Sine'},
                            {value: 'fmsine', text: 'FM Sine'},
                            {value: 'fatsine', text: 'Fat Sine'},
                            {value: 'square', text: 'Square'},
                            {value: 'amsquare', text: 'AM Square'},
                            {value: 'fmsquare', text: 'FM Square'},
                            {value: 'fatsquare', text: 'Fat Square'},
                            {value: 'triangle', text: 'Triangle'},
                            {value: 'amtriangle', text: 'AM Triangle'},
                            {value: 'fmtriangle', text: 'FM Triangle'},
                            {value: 'fattriangle', text: 'Fat Triangle'},
                            {value: 'sawtooth', text: 'Sawtooth'},
                            {value: 'amsawtooth', text: 'AM Sawtooth'},
                            {value: 'fmsawtooth', text: 'FM Sawtooth'},
                            {value: 'fatsawtooth', text: 'Fat Sawtooth'}
                        ]}
                    />
                    <RangeInput 
                        inputId={'oscillator-volume'}
                        label={'Volume'}
                        min={-80}
                        max={20}
                        step={1}
                        value={this.instrumentData.oscillator.volume}
                        handleChange={this.handleChange}
                        instrumentId={this.props.instrumentId}
                        propertyPathArray={['oscillator', 'volume']}
                    />
                </div>





synth settings


envelope

  attack - {Time} - the amount of time it takes the envelope to reach its maximum value
  
  attackCurve - {string} - the shape of the attack. Can be 'linear', 'exponential',
                           'sine', 'cosine', 'bounce', 'ripple' or 'step'
  
  decay - {Time} - after the attack portion of the envelope, the amount of time that it
                   takes to fall to its sustain value

  release - {Time} - after triggerRelease is called, the amount of time it takes for
                    the envelope to fall to its minimum value.

  releaseCurve - {string} - the shape of the release. Same values as attack curve. 

  sustain - {NormalRange} - the value the envelope rests at after triggerAttack is
                         called, before trigger release is called. Valid values are
                         anythin between 0 and 1.




oscillator

  detune - {Cents} - the amount to detune the oscillator by, in cents (1/1000 of a semitone)

  phase - {Degrees} - the phase of the oscillator in degrees (0 to 360).

  type - {string} - basic types are 'sine', 'square', 'triangle', 'sawtooth'. They can
                   all also be prefixed with 'fm', 'am' or 'fat'.

  volume - {Decibels} - volume of oscialltor. Defaults to 0, every +5 is twice as loud, 
                       every -5 is half as loud. 



portamento - {Time} - the duration of the glide between notes. 

volume - {Decibels} - volume of synth in decibels.




*/