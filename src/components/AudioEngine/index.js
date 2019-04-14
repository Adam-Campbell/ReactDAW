import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bus from './Bus';
import Tone from 'tone';
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
    playerInfo: {
        ...state.playerStatus,
        ...state.main.present.playerInfo
    },
    channels: state.main.present.channels,
    sections: state.main.present.sections,
    instruments: state.main.present.instruments,
    effects: state.main.present.effects
});

export default connect(
    mapStateToProps
)(AudioEngine);