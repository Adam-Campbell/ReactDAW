import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
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

class EffectInterface extends Component {
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
                    handleClose={this.handleClose}
                />

            case effectTypes.chorus:
                return <Chorus 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.compressor:
                return <Compressor 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.distortion:
                return <Distortion 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.eq3:
                return <EQ3 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.filter:
                return <Filter 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.freeverb:
                return <Freeverb 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.gate:
                return <Gate 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />
            
            case effectTypes.jcReverb:
                return <JCReverb 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.lfo:
                return <LFO 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.limiter:
                return <Limiter 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.phaser:
                return <Phaser 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.tremolo:
                return <Tremolo 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            case effectTypes.vibrato:
                return <Vibrato 
                    effectData={this.effectData}
                    handleChange={this.handleChange}
                    effectId={this.props.effectId}
                    handleClose={this.handleClose} 
                />

            default:
                return null;
        }
    }
}

const mapStateToProps = state => ({
    effects: state.effects
});

export default connect(
    mapStateToProps, 
    {
        updateOneEffectSetting: ActionCreators.updateOneEffectSetting,
        closeWindow: ActionCreators.closeWindow
    }
)(EffectInterface);


