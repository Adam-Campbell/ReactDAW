import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

const StartStopButton = props => {
    if (props.isPlaying) {
        return (
            <button onClick={props.stopTrack}>
                Stop track
            </button>
        );
    } else {
        return (
            <button onClick={props.playTrack}>
                Play track
            </button>
        )
    }
}

const mapStateToProps = state => ({
    isPlaying: state.playerInfo.isPlaying 
});

export default connect(
    mapStateToProps,
    {
        playTrack: ActionCreators.playTrack,
        stopTrack: ActionCreators.stopTrack
    }
)(StartStopButton);