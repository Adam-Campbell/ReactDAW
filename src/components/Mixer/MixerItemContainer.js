import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import PropTypes from 'prop-types';
import MixerItem from './MixerItem';

export class MixerItemContainer extends Component {
    
    get track() {
        return this.props.channels.find(channel => channel.id === this.props.trackId);
    }

    handleVolumeChange = (e) => {
        this.props.updateChannelVolume(this.props.trackId, parseFloat(e.target.value));
    }

    handlePanChange = (e) => {
        this.props.updateChannelPan(this.props.trackId, parseFloat(e.target.value));
    }

    handleMuteButtonClick = () => {
        if (this.track.isMuted) {
            this.props.unmuteChannel(this.props.trackId);
        } else {
            this.props.muteChannel(this.props.trackId);
        }
    }

    handleSoloButtonClick = () => {
        if (this.track.isSolo) {
            this.props.unsoloChannel(this.props.trackId);
        } else {
            this.props.soloChannel(this.props.trackId);
        }
    }

    render() {
        return <MixerItem 
            volume={this.track.volume}
            handleVolumeChange={this.handleVolumeChange}
            trackId={this.props.trackId}
            handleMuteButtonClick={this.handleMuteButtonClick}
            handleSoloButtonClick={this.handleSoloButtonClick}
            pan={this.track.pan}
            handlePanChange={this.handlePanChange}
            name={this.track.name}
            isMuted={this.track.isMuted}
            isSolo={this.track.isSolo}
        />
    }
}

MixerItemContainer.propTypes = {
    trackId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    channels: state.main.present.channels
});



export default connect(
    mapStateToProps,
    {
        updateChannelVolume: ActionCreators.updateChannelVolume,
        muteChannel: ActionCreators.muteChannel,
        unmuteChannel: ActionCreators.unmuteChannel,
        soloChannel: ActionCreators.soloChannel,
        unsoloChannel: ActionCreators.unsoloChannel,
        updateChannelPan: ActionCreators.updateChannelPan
    }
)(MixerItemContainer);
