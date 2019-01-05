import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Section from './Section';
import Bus from './Bus';
import Channel from './Channel';
import Tone from 'tone';
import { instrumentTypes, effectTypes } from '../../constants';
import InstrumentFactory from './InstrumentFactory';
import EffectFactory from './EffectFactory';
import { cloneDeep } from 'lodash';
import { normalizedStateToTree } from './AudioEngineUtils';

window.Tone = Tone;

class AudioEngine extends Component {
    constructor(props) {
        super(props);
        this._bus = new Bus();
        window.bus = this._bus;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this._updateEngineState(prevProps, this.props);
    }

    /**
     * When the engine unmounts, remove any globals that the engine added to the window.
     */
    componentWillUnmount() {
        if (window.instrumentReferences) {
            delete window.instrumentReferences;
        }
        if (window.meterNodeReferences) {
            delete window.meterNodeReferences;
        }
        if (window.bus) {
            delete window.bus;
        }
    }

    /**
     * Takes the normalized state from redux and converts it into a tree structure resembling the class
     * hierarchy within the audio engine. This allows all of the updating that follows to be more intuitive.
     * @param {object} state - the normalized redux state 
     * @returns {object} - the state transformed into a tree structure.
     */
    _stateToTree(originalState) {
        const state = cloneDeep(originalState);
        let tree = {};
        // copy playerInfo to tree
        tree.playerInfo = { ...state.playerInfo };
        // loop over the channels
        tree.channels = state.channels.map(channel => {
            return {
                id: channel.id,
                instrument: state.instruments[channel.instrumentId],
                effects: channel.effectIds.map(effectId => state.effects[effectId]),
                sections: channel.sectionIds.map(sectionId => state.sections[sectionId]),
                volume: channel.volume,
                isMuted: channel.isMuted,
                isSolo: channel.isSolo,
                pan: channel.pan
            }
        });
        return tree;
    }

    /**
     * The main method for updating the engines state, called whenever the component updates with 
     * new props.
     * @param {object} prevState - the normalized previous state 
     * @param {object} currState - the normalized current state 
     */
    _updateEngineState(prevState, currState) {
        const prev = normalizedStateToTree(prevState);  
        const curr = normalizedStateToTree(currState);
        this._bus.reconcile(prev, curr);
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    sectionInfo: state.sectionInfo,
    playerInfo: state.playerInfo,
    channels: state.channels,
    sections: state.sections,
    instruments: state.instruments,
    effects: state.effects
});

export default connect(
    mapStateToProps
)(AudioEngine);