import React from 'react';
import PropTypes from 'prop-types';
import { 
    PlayIcon,
    PauseIcon,
    StopIcon,
    BackIcon,
    MixerIcon
} from '../Icons';
import ToggleMenu from '../ToggleMenu';
import FileMenu from './FileMenu';
import EditMenu from './EditMenu';
import ViewMenu from './ViewMenu';

const Transport = props => (
    <div 
        className="transport__container"
        onClick={props.handleTransportBarClick}
    >
        <ToggleMenu>
            {(props) => <FileMenu {...props} />}
        </ToggleMenu>
        <ToggleMenu>
            {(props) => <EditMenu {...props} />}
        </ToggleMenu>
        <ToggleMenu>
            {(props) => <ViewMenu {...props} />}
        </ToggleMenu>

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
    handleOpenMixer: PropTypes.func.isRequired
};

export default Transport;