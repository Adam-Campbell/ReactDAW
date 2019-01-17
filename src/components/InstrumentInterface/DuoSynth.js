import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderModule from './HeaderModule';
import EnvelopeModule from './EnvelopeModule';
import OscillatorModule from './OscillatorModule';
import FilterModule from './FilterModule';
import FilterEnvelopeModule from './FilterEnvelopeModule';
import EnhancedRangeInput from '../EnhancedRangeInput';
import Dial from '../Dial';
import SmallDial from '../SmallDial';
import Switch from '../Switch';

class DuoSynth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVoice: 'voiceA'
        };
    }

    changeCurrentVoice = (newVoice) => {
        this.setState({
            currentVoice: newVoice
        });
    }

    renderVoiceAControls() {
        return (
            <React.Fragment>
                <div className="instrument-interface__seperator">
                    <h2 className="instrument-interface__module-heading">Voice A</h2>
                </div>
                <EnvelopeModule 
                    envelopeData={this.props.instrumentData.voice0.envelope}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice0']}
                />
                <OscillatorModule 
                    oscillatorData={this.props.instrumentData.voice0.oscillator}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice0']}
                />
                <FilterEnvelopeModule 
                    filterEnvelopeData={this.props.instrumentData.voice0.filterEnvelope}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice0']}
                />
                <FilterModule 
                    filterData={this.props.instrumentData.voice0.filter}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice0']}
                />
            </React.Fragment>
        );
    }

    renderVoiceBControls() {
        return (
            <React.Fragment>
                <div className="instrument-interface__seperator">
                    <h2 className="instrument-interface__module-heading">Voice B</h2>
                </div>
                <EnvelopeModule 
                    envelopeData={this.props.instrumentData.voice1.envelope}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice1']}
                    dblCol
                />
                <OscillatorModule 
                    oscillatorData={this.props.instrumentData.voice1.oscillator}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice1']}
                    dblCol
                />
                <FilterEnvelopeModule 
                    filterEnvelopeData={this.props.instrumentData.voice1.filterEnvelope}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice1']}
                />
                <FilterModule 
                    filterData={this.props.instrumentData.voice1.filter}
                    handleChange={this.props.handleChange}
                    instrumentId={this.props.instrumentId}
                    additionalNesting={['voice1']}
                />
            </React.Fragment>
        );
    }

    render() {

        return (
            <div className="instrument-interface__container">
                <HeaderModule instrumentTitle="Duo Synth" />
                <div className="instrument-interface__main-section">
                    {this.state.currentVoice === 'voiceA' ? this.renderVoiceAControls() : this.renderVoiceBControls()}
                </div>
                <div className="instrument-interface__aside-section">
                    <div>
                        <Switch 
                            value={this.state.currentVoice}
                            handleChange={this.changeCurrentVoice}
                            rowDescription="Select Voice"
                            optionsData={[
                                { id: 'voiceA', name: 'current-voice', value: 'voiceA', text: 'Voice A' },
                                { id: 'voiceB', name: 'current-voice', value: 'voiceB', text: 'Voice B' }
                            ]}
                        />
                    </div>
                    <Dial
                        dataMin={0.25}
                        dataMax={8}
                        stepSize={0.05}
                        snapToSteps={true}
                        value={this.props.instrumentData.harmonicity}
                        dialStartOffset={225}
                        dialRange={270}
                        updateValueCallback={(newVal) => this.props.handleChange(
                            this.props.instrumentId,
                            ['harmonicity'],
                            newVal
                        )}
                    >
                        {(props) => <SmallDial {...props} label="Harmonicity" />}
                    </Dial>
                    <Dial
                        dataMin={0}
                        dataMax={5}
                        stepSize={0.05}
                        snapToSteps={true}
                        value={this.props.instrumentData.vibratoAmount}
                        dialStartOffset={225}
                        dialRange={270}
                        updateValueCallback={(newVal) => this.props.handleChange(
                            this.props.instrumentId,
                            ['vibratoAmount'],
                            newVal
                        )}
                    >
                        {(props) => <SmallDial {...props} label="Vibrato Amount" />}
                    </Dial>
                    <Dial
                        dataMin={5}
                        dataMax={1000}
                        stepSize={5}
                        snapToSteps={true}
                        value={this.props.instrumentData.vibratoRate}
                        dialStartOffset={225}
                        dialRange={270}
                        updateValueCallback={(newVal) => this.props.handleChange(
                            this.props.instrumentId,
                            ['vibratoRate'],
                            newVal
                        )}
                    >
                        {(props) => <SmallDial {...props} label="Vibrato Rate" />}
                    </Dial>
                    <Dial
                        dataMin={-80}
                        dataMax={20}
                        stepSize={0.25}
                        snapToSteps={true}
                        value={this.props.instrumentData.volume}
                        dialStartOffset={225}
                        dialRange={270}
                        updateValueCallback={(newVal) => this.props.handleChange(
                            this.props.instrumentId,
                            ['volume'],
                            newVal
                        )}
                    >
                        {(props) => <SmallDial {...props} label="Volume" />}
                    </Dial>
                </div>  
            </div>
        )
    }
}

DuoSynth.propTypes = {
    instrumentData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default DuoSynth;