import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Tone from 'tone';

class Transport extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
        this.spanRef = React.createRef();
        this.rAFRef = null;
        this.inputRef = React.createRef();
        this.state = {
            trackPosition: Tone.Transport.position,
            isEditingBPM: false,
            editedBPM: this.props.bpm
        }
    }

    componentDidMount() {
        //window.document.addEventListener('click', this.handleExternalClick);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.getPosition);
            } else {
                cancelAnimationFrame(this.rAFRef);
                this.setState({
                    trackPosition: '0:0:0'
                });
            }
        }
    }

    getPosition = () => {
        const newTrackPosition = this.formatTrackPosition(Tone.Transport.position);
        if (newTrackPosition !== this.state.trackPosition) {
            this.setState({
                trackPosition: newTrackPosition
            });
        }
        this.rAFRef = requestAnimationFrame(this.getPosition);
    }


    formatTrackPosition = (trackPositionString) => {
        let splitted = trackPositionString.split(':');
        let roundedDownSixteenths = Math.floor(parseFloat(splitted[2]));
        return `${splitted[0]}:${splitted[1]}:${roundedDownSixteenths}`;
    }

    handleBPMChange = (e) => {
        this.setState({
            editedBPM: e.target.value
        });
    }

    enterBPMEditingMode = () => {
        this.setState({
            isEditingBPM: true
        }, () => {
            this.inputRef.current.focus();
        });
    }

    exitBPMEditingMode = () => {
        const bpmString = this.state.editedBPM;
        const bpmNum = parseInt(bpmString);
        if (!Number.isNaN(bpmNum)) {
            this.props.setBPM(bpmNum);
            this.setState({
                isEditingBPM: false
            });
        } else {
            this.setState({
                isEditingBPM: false,
                editedBPM: this.props.bpm
            });
        }
    }

    handleTransportBarClick = () => {
        if (this.state.isEditingBPM) {
            this.exitBPMEditingMode();
        }
    }

    render() {
        return (
            <div 
                className="transport__container"
                onClick={this.handleTransportBarClick}
            >
                <button 
                    className="button pink"
                    onClick={this.props.playTrack}
                >Play</button>
                <button 
                    className="button pink"
                    onClick={this.props.stopTrack}
                >Stop</button>
                <span className="transport__track-position" >{this.state.trackPosition}</span>
                <div className="transport__bpm-container">
                    <span className="transport__bpm-label">BPM:</span>
                    {this.state.isEditingBPM ? 
                        <input
                            className="transport__bpm-input"
                            value={this.state.editedBPM}
                            onChange={this.handleBPMChange}
                            ref={this.inputRef}
                            onClick={e => e.stopPropagation()}
                        ></input> :
                        <p
                            className="transport__bpm-text"
                            onClick={this.enterBPMEditingMode}
                        >{this.props.bpm}</p>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isPlaying: state.playerInfo.isPlaying,
    isMuted: state.playerInfo.isMuted,
    bpm: state.playerInfo.bpm,
    volume: state.playerInfo.volume
});

export default connect(
    mapStateToProps,
    {
        playTrack: ActionCreators.playTrack,
        stopTrack: ActionCreators.stopTrack,
        setBPM: ActionCreators.setBPM
    }
)(Transport);