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
            editedBPM: this.props.bpm,
            isSaving: false,
            isLoading: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // manage the request animation frame process
        if (prevProps.isPlaying !== this.props.isPlaying || 
            prevProps.isPaused !== this.props.isPaused
        ) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.getTransportPosition);
            } else if (this.props.isPaused) {
                cancelAnimationFrame(this.rAFRef);
            } else {
                cancelAnimationFrame(this.rAFRef);
                this.setState({
                    transportPosition: '0:0:0'
                });
            }
        }
        // If and only if the bpm has changed between prev and current props AND the component
        // is not in the editing bpm state, update state.editedBPM to match the bpm in props. 
        // This prevents issues around the bpm being updated by other means, such as by loading
        // a pre-existing compostion, and the local state becoming out of sync with props as a
        // result. 
        if (prevProps.bpm !== this.props.bpm && !this.state.isEditingBPM) {
            this.setState({
                editedBPM: this.props.bpm
            });
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

    handleSkipToStart = () => {
        Tone.Transport.position = '0:0:0';
    }

    handleSaveState = () => {
        this.props.saveState('darudeSandstorm');
    }

    handleLoadState = () => {
        this.props.loadState('darudeSandstorm');
    }

    enterSavingState = () => {
        this.setState({
            isSaving: true
        });
    }

    exitSavingState = () => {
        this.setState({
            isSaving: false
        });
    }

    enterLoadingState = () => {
        this.setState({
            isLoading: true
        });
    }

    exitLoadingState = () => {
        this.setState({
            isLoading: false
        });
    };

    handleOpenMixer = () => {
        this.props.openWindow('masterMixer', 'mixer');
    }

    render() {
        return <Transport 
            handleTransportBarClick={this.handleTransportBarClick}
            playTrack={this.props.playTrack}
            stopTrack={this.props.stopTrack}
            pauseTrack={this.props.pauseTrack}
            handleSkipToStart={this.handleSkipToStart}
            transportPosition={this.state.transportPosition}
            isEditingBPM={this.state.isEditingBPM}
            editedBPM={this.state.editedBPM}
            handleBPMChange={this.handleBPMChange}
            inputRef={this.inputRef}
            enterBPMEditingMode={this.enterBPMEditingMode}
            bpm={this.props.bpm}
            handleSaveState={this.handleSaveState}
            handleLoadState={this.handleLoadState}
            enterSavingState={this.enterSavingState}
            exitSavingState={this.exitSavingState}
            enterLoadingState={this.enterLoadingState}
            exitLoadingState={this.exitLoadingState}
            isSaving={this.state.isSaving}
            isLoading={this.state.isLoading}
            handleOpenMixer={this.handleOpenMixer}
        />
    }
}

const mapStateToProps = state => ({
    isPlaying: state.playerInfo.isPlaying,
    isPaused: state.playerInfo.isPaused,
    isMuted: state.playerInfo.isMuted,
    bpm: state.playerInfo.bpm,
    volume: state.playerInfo.volume
});

export default connect(
    mapStateToProps,
    {
        playTrack: ActionCreators.playTrack,
        stopTrack: ActionCreators.stopTrack,
        pauseTrack: ActionCreators.pauseTrack,
        setBPM: ActionCreators.setBPM,
        saveState: ActionCreators.saveState,
        loadState: ActionCreators.loadState,
        openWindow: ActionCreators.openWindow
    }
)(TransportContainer);