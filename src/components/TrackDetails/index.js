import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { synthTypes, effectTypes, synthData, effectData } from '../../constants';
import { generateId } from '../../helpers';
import InstrumentDetails from './InstrumentDetails';
import EffectsDetails from './EffectsDetails';

/*

This view should display the type of instrument currently being used on this track, and when clicked
it should open up the instrument settings component for that instrument. 

It should also show the effects currently in use. Each effect will be clickable to open up the settings view
for that effect, each effect will also have an option to delete it. 

Finally, there will be a button to add a new effect onto the end of the effect chain. 

Eventually this should be constructed using a drag n drop interface which allows not only for new effects to be 
dragged into the effect chain, but also for the order of the effects to be changed via dragging, and potentially
at some point more complex features such as parallel routing etc. 

*/

class TrackDetails extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
        this.state = {
            effectTypeToAdd: effectTypes.chorus
        }
        console.log(`
            This tracks id is ${this.track.id}, 
            its name is ${this.track.name},
            its color is ${this.track.color},
            its instrument is a ${this.getFormattedSynthTypeString(this.instrument.type)},
            it has ${this.track.effectIds.length} effects,
            and ${this.track.sectionIds.length} sections.
        `);
    }

    get track() {
        return this.props.channels.find(el => el.id === this.props.trackId);
    }

    get instrument() {
        return this.props.instruments[this.track.instrumentId];
    }

    getFormattedSynthTypeString(synthType) {
        switch (synthType) {
            case synthTypes.default:
                return 'Synth';

            case synthTypes.am:
                return 'AM Synth';

            case synthTypes.fm:
                return 'FM Synth';

            case synthTypes.duo:
                return 'Duo Synth';

            case synthTypes.mono:
                return 'Mono Synth';

            default:
                return 'Synth';
        }
    }

    handleInstrumentChange = (e) => {
        const newInstrumentType = e.target.value;
        const oldInstrumentId = this.instrument.id;
        this.props.addInstrument(
            generateId(),
            this.track.id,
            newInstrumentType,
            synthData[newInstrumentType]
        );
        this.props.removeInstrument(oldInstrumentId);
    }

    openInstrumentSettings = () => {
        this.props.openWindow(this.instrument.id, 'synth');
    }

    handleClose = () => {
        this.props.closeWindow(this.props.trackId);
    }

    openEffectSettings = (effectId) => {
        this.props.openWindow(effectId, 'effect');
    }

    handleRemoveEffect = (effectId) => {
        this.props.removeEffect(effectId, this.props.trackId);
    }

    handleChangeEffectType = (e) => {
        this.setState({
            effectTypeToAdd: e.target.value
        });
    }

    handleAddEffect = (newEffectType) => {
        // effectId, channelId, type, effectData
        this.props.addEffect(
            generateId(),
            this.props.trackId,
            newEffectType,
            effectData[newEffectType]
        );
    }

    render() {
        const effectsArray = this.track.effectIds.map(effectId => this.props.effects[effectId]);
        return (
            <div className="track-details__container">
                <button 
                    className="track-details__close-button"
                    onClick={this.handleClose}
                >X</button>
                <InstrumentDetails 
                    instrumentType={this.instrument.type}
                    handleChange={this.handleInstrumentChange}
                    handleOpen={this.openInstrumentSettings}
                />
                <EffectsDetails 
                    effects={effectsArray}
                    effectTypeToAdd={this.state.effectTypeToAdd}
                    handleOpen={this.openEffectSettings}
                    handleRemove={this.handleRemoveEffect}
                    handleAdd={this.handleAddEffect}
                    handleChange={this.handleChangeEffectType}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
    instruments: state.instruments,
    effects: state.effects
});

export default connect(
    mapStateToProps,
    {
        addInstrument: ActionCreators.addInstrument,
        removeInstrument: ActionCreators.removeInstrument,
        openWindow: ActionCreators.openWindow,
        closeWindow: ActionCreators.closeWindow,
        addEffect: ActionCreators.addEffect,
        removeEffect: ActionCreators.removeEffect
    }
)(TrackDetails)