import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import PropTypes from 'prop-types';
import FeedbackDelay from './FeedbackDelay';
import Chorus from './Chorus';
import Compressor from './Compressor';
import Distortion from './Distortion';
import EQ3 from './EQ3';
import Filter from './Filter';
import Freeverb from './Freeverb';
import Gate from './Gate';
import JCReverb from './JCReverb';
import LFO from './LFO';
import Limiter from './Limiter';
import Phaser from './Phaser';
import Tremolo from './Tremolo';
import Vibrato from './Vibrato';
import { effectTypes } from '../../constants';
import { debounce } from 'lodash';


export class EffectInterface extends Component {
    constructor(props) {
        super(props);
        this.handleChange = debounce(
            this.props.updateOneEffectSetting, 
            16, 
            {leading: true, trailing: true}
        ).bind(this);
    }

    get effectData () {
        return this.props.effects[this.props.effectId].effectData;
    }

    handleClose = () => {
        this.props.closeWindow(this.props.effectId);
    }

    render() {
        const effectType = this.props.effects[this.props.effectId].type;
        
        switch (effectType) {

            case effectTypes.feedbackDelay:
                return <FeedbackDelay 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.chorus:
                return <Chorus 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.compressor:
                return <Compressor 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.distortion:
                return <Distortion 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.eq3:
                return <EQ3 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId} 
                />

            case effectTypes.filter:
                return <Filter 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.freeverb:
                return <Freeverb 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.gate:
                return <Gate 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />
            
            case effectTypes.jcReverb:
                return <JCReverb 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId} 
                />

            case effectTypes.lfo:
                return <LFO 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.limiter:
                return <Limiter 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.phaser:
                return <Phaser 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.tremolo:
                return <Tremolo 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            case effectTypes.vibrato:
                return <Vibrato 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                />

            default:
                return null;
        }
    }
}

EffectInterface.propTypes = {
    effectId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    effects: state.main.present.effects
});

export default connect(
    mapStateToProps, 
    {
        updateOneEffectSetting: ActionCreators.updateOneEffectSetting,
    }
)(EffectInterface);


