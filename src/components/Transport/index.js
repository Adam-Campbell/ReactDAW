import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Tone from 'tone';
import Transport from './Transport';
import { formatTransportPosition } from './transportUtils';

export class TransportContainer extends Component {
    constructor(props) {
        super(props);
        this.rAFRef = null;
        this.inputRef = React.createRef();
        this.state = {
            transportPosition: Tone.Transport.position,
            isEditingBPM: false,
            editedBPM: this.props.bpm
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.getTransportPosition);
            } else {
                cancelAnimationFrame(this.rAFRef);
                this.setState({
                    transportPosition: '0:0:0'
                });
            }
        }
    }

    getTransportPosition = () => {
        const newTransportPosition = formatTransportPosition(Tone.Transport.position);
        if (newTransportPosition !== this.state.transportPosition) {
            this.setState({
                transportPosition: newTransportPosition
            });
        }
        this.rAFRef = requestAnimationFrame(this.getTransportPosition);
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
        return <Transport 
            handleTransportBarClick={this.handleTransportBarClick}
            playTrack={this.props.playTrack}
            stopTrack={this.props.stopTrack}
            transportPosition={this.state.transportPosition}
            isEditingBPM={this.state.isEditingBPM}
            editedBPM={this.state.editedBPM}
            handleBPMChange={this.handleBPMChange}
            inputRef={this.inputRef}
            enterBPMEditingMode={this.enterBPMEditingMode}
            bpm={this.props.bpm}
        />
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
)(TransportContainer);