import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import TrackColorSwatch from './TrackColorSwatch';

class TrackInfo extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
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
    }

    handleSoloButtonClick = (e) => {
        //console.log('solo button was clicked');
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
        const track = this.props.channels.find(channel => channel.id === this.props.trackId);
        this.props.openWindow(track.id, 'instrumentSettings');
    }


    render() {
        return (
            <div 
                className={`track-info ${this.props.isSelected && 'selected'}`} 
                onClick={this.handleContainerClick}
            >
                <div className="track-info__left-block">
                    {this.state.isEditingName ?
                        <input 
                            ref={this.inputRef}
                            className="track-info__track-name-input"
                            type="text" 
                            value={this.state.trackName} 
                            onChange={this.updateTrackName}
                            onKeyPress={this.handleInputKeyPress}
                            onClick={(e) => e.stopPropagation()}
                        ></input> :
                        <p 
                            className="track-info__track-name"
                            onClick={this.enterNameEditMode}
                        >{this.state.trackName}</p>  
                    }
                    <button 
                        className="track-info__button" 
                        onClick={this.handleMuteButtonClick}
                    >M</button>
                    <button 
                        className="track-info__button"
                        onClick={this.handleSoloButtonClick}
                    >S</button>
                    <button 
                        className="track-info__button"
                        onClick={this.handleSettingsButtonClick}
                    >O</button>
                    <button 
                        className="track-info__button"
                        onClick={this.handleDeleteButtonClick}
                    >X</button>
                </div>
                <div className="track-color-picker">
                <span 
                    className="track-color-picker__color-swatch"
                    onClick={this.enterColorEditMode}
                    ref={this.swatchNodeRef}
                    style={{
                        backgroundColor: this.state.trackColor,
                        color: this.state.trackColor
                    }}
                ></span>
                {
                    this.state.isEditingTrackColor && (
                        <TrackColorSwatch 
                            handleColorSwatchClick={this.handleColorSwatchClick}
                            nodeRef={this.swatchNodeRef.current}
                            exitColorEditMode={this.exitColorEditMode}
                        />
                    )
                }
                </div>
            </div>
        );
    }
}

TrackInfo.propTypes = {
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
        openWindow: ActionCreators.openWindow
    }
)(TrackInfo);




