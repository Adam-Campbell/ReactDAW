import React from 'react';
import PropTypes from 'prop-types';
import { synthTypes } from '../../constants';

const InstrumentDetails = props => (
    <div className="track-details__instrument-info-container">
        <h2 className="track-details__heading">Instrument</h2>
        <label 
            htmlFor="instrument-select" 
            className="track-details__instrument-select-label"
        >Current instrument</label>
        <select 
            id="instrument-select" 
            className="track-details__instrument-select"
            value={props.instrumentType}
            onChange={props.handleChange}
        >
            <option 
                className="track-details__instrument-select-option" 
                value={synthTypes.default}
            >Synth</option>
            <option 
                className="track-details__instrument-select-option" 
                value={synthTypes.am}
            >AM Synth</option>
            <option 
                className="track-details__instrument-select-option" 
                value={synthTypes.fm}
            >FM Synth</option>
            <option 
                className="track-details__instrument-select-option" 
                value={synthTypes.duo}
            >Duo Synth</option>
            <option 
                className="track-details__instrument-select-option" 
                value={synthTypes.mono}
            >Mono</option>
        </select>
        <button 
            className="track-details__instrument-settings-button"
            onClick={props.handleOpen}
        >Edit Settings</button>
    </div>
);

InstrumentDetails.propTypes = {
    instrumentType: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired
};

export default InstrumentDetails;