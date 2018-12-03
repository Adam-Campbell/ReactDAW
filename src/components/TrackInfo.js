import React, { Component } from 'react';
import { UIColors } from '../constants';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

class TrackInfo extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
        this.inputRef = React.createRef();
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
        console.log('mute button was clicked');
    }

    handleSoloButtonClick = (e) => {
        console.log('solo button was clicked');
    }

    handleSettingsButtonClick = (e) => {
        console.log('settings button was clicked');
    }

    handleDeleteButtonClick = (e) => {
        this.props.removeChannel(this.props.trackId);
    }

    handleContainerClick = (e) => {
        console.log('container was clicked!');
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


    render() {
        return (
            <div className="track-info" onClick={this.handleContainerClick}>
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
                    style={{
                        backgroundColor: this.state.trackColor,
                        color: this.state.trackColor
                    }}
                ></span>
                {
                    this.state.isEditingTrackColor && (
                        <React.Fragment>
                            <span 
                                className="track-color-picker__color-swatch"
                                onClick={() =>this.handleColorSwatchClick(UIColors.pink)}
                                style={{
                                    backgroundColor: UIColors.pink,
                                    color: UIColors.pink
                                }}
                            ></span>
                            <span 
                                className="track-color-picker__color-swatch"
                                onClick={() =>this.handleColorSwatchClick(UIColors.brightBlue)}
                                style={{
                                    backgroundColor: UIColors.brightBlue,
                                    color: UIColors.brightBlue
                                }}
                            ></span>
                            <span 
                                className="track-color-picker__color-swatch"
                                onClick={() =>this.handleColorSwatchClick(UIColors.brightYellow)}
                                style={{
                                    backgroundColor: UIColors.brightYellow,
                                    color: UIColors.brightYellow
                                }}
                            ></span>
                            <span 
                                className="track-color-picker__color-swatch"
                                onClick={() =>this.handleColorSwatchClick(UIColors.brightRed)}
                                style={{
                                    backgroundColor: UIColors.brightRed,
                                    color: UIColors.brightRed
                                }}
                            ></span>
                            <span 
                                className="track-color-picker__color-swatch"
                                onClick={() =>this.handleColorSwatchClick(UIColors.brightGreen)}
                                style={{
                                    backgroundColor: UIColors.brightGreen,
                                    color: UIColors.brightGreen
                                }}
                            ></span>
                        </React.Fragment>
                    )
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    channels: state.channels
});

export default connect(
    mapStateToProps,
    {
        updateChannelName: ActionCreators.updateChannelName,
        updateChannelColor: ActionCreators.updateChannelColor,
        removeChannel: ActionCreators.removeChannel
    }
)(TrackInfo);