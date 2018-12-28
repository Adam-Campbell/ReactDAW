import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import TrackInfo from './TrackInfo';

export class TrackInfoContainer extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.swatchNodeRef = React.createRef();
        const track = props.channels.find(channel => channel.id === props.trackId);
        this.state = {
            trackName: track.name,
            trackColor: track.color,
            isEditingName: false,
            isEditingTrackColor: false
        };
    }

    get track() {
        return this.props.channels.find(channel => channel.id === this.props.trackId);
    }

    updateTrackName = (e) => {
        this.setState({
            trackName: e.target.value
        });
    }

    toggleNameEditing = () => {
        this.setState({
            isEditingName: !this.state.isEditingName
        });
    }

    enterNameEditMode = () => {
        this.setState({
            isEditingName: true
        }, () => {
            this.inputRef.current.focus();
        });
    }

    exitNameEditMode = () => {
        this.setState({
            isEditingName: false
        });
        this.props.updateChannelName(this.props.trackId, this.state.trackName);
    }

    handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.exitNameEditMode();
        }
    }

    handleMuteButtonClick = (e) => {
        //console.log('mute button was clicked');
        if (this.track.isMuted) {
            this.props.unmuteChannel(this.props.trackId);
        } else {
            this.props.muteChannel(this.props.trackId);
        }
    }

    handleSoloButtonClick = (e) => {
        //console.log('solo button was clicked');
        if (this.track.isSolo) {
            this.props.unsoloChannel(this.props.trackId);
        } else {
            this.props.soloChannel(this.props.trackId);
        }

    }

    handleSettingsButtonClick = (e) => {
        //console.log('settings button was clicked');
        this.openInstrumentWindow();
    }

    handleDeleteButtonClick = (e) => {
        this.props.removeChannel(this.props.trackId);
    }

    handleContainerClick = (e) => {
        //console.log('container was clicked!');
        if (!this.props.isSelected) {
            this.props.updateSelectedChannel(this.props.trackId);
        }
        if (this.state.isEditingName) {
            this.exitNameEditMode();
        }
    }

    enterColorEditMode = (e) => {
        this.setState({
            isEditingTrackColor: true
        });
    }

    exitColorEditMode = (e) => {
        this.setState({
            isEditingTrackColor: false
        });
    }

    handleColorSwatchClick = (color) => {
        this.setState({
            isEditingTrackColor: false,
            trackColor: color
        });
        this.props.updateChannelColor(this.props.trackId, color);
    }

    openInstrumentWindow = () => {
        this.props.openWindow(this.track.id, 'instrumentSettings');
    }


    render() {
        return <TrackInfo 
            inputRef={this.inputRef}
            swatchNodeRef={this.swatchNodeRef}
            isSelected={this.props.isSelected}
            isEditingName={this.state.isEditingName}
            trackName={this.state.trackName}
            isEditingTrackColor={this.state.isEditingTrackColor}
            trackColor={this.state.trackColor}
            handleContainerClick={this.handleContainerClick}
            updateTrackName={this.updateTrackName}
            handleInputKeyPress={this.handleInputKeyPress}
            enterNameEditMode={this.enterNameEditMode}
            handleMuteButtonClick={this.handleMuteButtonClick}
            handleSoloButtonClick={this.handleSoloButtonClick}
            handleSettingsButtonClick={this.handleSettingsButtonClick}
            handleDeleteButtonClick={this.handleDeleteButtonClick}
            enterColorEditMode={this.enterColorEditMode}
            exitColorEditMode={this.exitColorEditMode}
            handleColorSwatchClick={this.handleColorSwatchClick}
            isMuted={this.track.isMuted}
            isSolo={this.track.isSolo}
        />
    }
}

TrackInfoContainer.propTypes = {
    trackId: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    updateSelectedChannel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    channels: state.channels
});

export default connect(
    mapStateToProps,
    {
        updateChannelName: ActionCreators.updateChannelName,
        updateChannelColor: ActionCreators.updateChannelColor,
        removeChannel: ActionCreators.removeChannel,
        openWindow: ActionCreators.openWindow,
        muteChannel: ActionCreators.muteChannel,
        unmuteChannel: ActionCreators.unmuteChannel,
        soloChannel: ActionCreators.soloChannel,
        unsoloChannel: ActionCreators.unsoloChannel
    }
)(TrackInfoContainer);




