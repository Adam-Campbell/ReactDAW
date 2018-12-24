import React from 'react';
import PropTypes from 'prop-types';

const Transport = props => (
    <div 
        className="transport__container"
        onClick={props.handleTransportBarClick}
    >
        <button 
            className="button pink"
            onClick={props.playTrack}
        >Play</button>
        <button 
            className="button pink"
            onClick={props.stopTrack}
        >Stop</button>
        <span className="transport__track-position" >{props.trackPosition}</span>
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
    </div>
);

Transport.propTypes = {
    handleTransportBarClick: PropTypes.func.isRequired,
    playTrack: PropTypes.func.isRequired,
    stopTrack: PropTypes.func.isRequired,
    trackPosition: PropTypes.string.isRequired,
    isEditingBPM: PropTypes.bool.isRequired,
    editedBPM: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleBPMChange: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
    enterBPMEditingMode: PropTypes.func.isRequired,
    bpm: PropTypes.number.isRequired
};

export default Transport;