import React from 'react';
import PropTypes from 'prop-types';
import SaveTrackModalContainer from './SaveTrackModalContainer';
import LoadTrackModalContainer from './LoadTrackModalContainer';
import { 
    PlayIcon,
    PauseIcon,
    StopIcon,
    BackIcon,
    MixerIcon
} from '../Icons';

const Transport = props => (
    <div 
        className="transport__container"
        onClick={props.handleTransportBarClick}
    >
        <button 
            className="transport__button"
            onClick={props.playTrack}
        >
            <PlayIcon />
        </button>
        <button 
            className="transport__button"
            onClick={props.pauseTrack}
        >
            <PauseIcon />
        </button>
        <button 
            className="transport__button"
            onClick={props.stopTrack}
        >
            <StopIcon />
        </button>
        <button 
            className="transport__button"
            onClick={props.handleSkipToStart}
        >
            <BackIcon />
        </button>
        <div className="transport__track-position-container" >
            <p className="transport__track-position-text">{props.transportPosition}</p>
        </div>
        <div className="transport__bpm-container">
            <span className="transport__bpm-label">BPM:</span>
            {props.isEditingBPM ? 
                <input
                    className="transport__bpm-input"
                    value={props.editedBPM}
                    onChange={props.handleBPMChange}
                    ref={props.inputRef}
                    onClick={e => e.stopPropagation()}
                ></input> :
                <p
                    className="transport__bpm-text"
                    onClick={props.enterBPMEditingMode}
                >{props.bpm}</p>
            }
        </div>
        <button 
            className="transport__button"
            onClick={props.handleOpenMixer}
        >
            <MixerIcon />
        </button>
        <button 
            className="button pink"
            onClick={props.enterLoadingState}
        >Load</button>
        <button 
            className="button pink"
            onClick={props.enterSavingState}
        >Save</button>
        {props.isSaving && <SaveTrackModalContainer handleClose={props.exitSavingState} />}
        {props.isLoading && <LoadTrackModalContainer handleClose={props.exitLoadingState} />}
    </div>
);

Transport.propTypes = {
    handleTransportBarClick: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    stopTrack: PropTypes.func.isRequired,
    pauseTrack: PropTypes.func.isRequired,
    handleSkipToStart: PropTypes.func.isRequired,
    transportPosition: PropTypes.string.isRequired,
    isEditingBPM: PropTypes.bool.isRequired,
    editedBPM: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleBPMChange: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
    enterBPMEditingMode: PropTypes.func.isRequired,
    bpm: PropTypes.number.isRequired,
    handleLoadState: PropTypes.func.isRequired,
    handleSaveState: PropTypes.func.isRequired,
    enterSavingState: PropTypes.func.isRequired,
    exitSavingState: PropTypes.func.isRequired,
    enterLoadingState: PropTypes.func.isRequired,
    exitLoadingState: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleOpenMixer: PropTypes.func.isRequired
};

export default Transport;