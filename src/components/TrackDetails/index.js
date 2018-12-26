import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { effectTypes, synthData, effectData } from '../../constants';
import { generateId } from '../../helpers';
import InstrumentDetails from './InstrumentDetails';
import EffectsDetails from './EffectsDetails';

export class TrackDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            effectTypeToAdd: effectTypes.chorus
        }
    }

    get track() {
        return this.props.channels.find(el => el.id === this.props.trackId);
    }

    get instrument() {
        return this.props.instruments[this.track.instrumentId];
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

TrackDetails.propTypes = {
    trackId: PropTypes.string.isRequired
};

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
        addEffect: ActionCreators.addEffect,
        removeEffect: ActionCreators.removeEffect
    }
)(TrackDetails)