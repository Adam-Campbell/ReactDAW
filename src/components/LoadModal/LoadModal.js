import React from 'react';
import PropTypes from 'prop-types';

const LoadTrackModal = props => (
    <React.Fragment>
        <button
            className="button pink"
            onClick={props.handleClose}
        >Close</button>
        <ul className="modal__list">
        {props.savedTracks.map((trackName, index) => (
            <li
                className="modal__list-item"
                key={index}
                onClick={(e) => props.handleLoad(trackName)}
            >{trackName}</li>
        ))}
        </ul>
    </React.Fragment>
);

LoadTrackModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    savedTracks: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleLoad: PropTypes.func.isRequired
};

export default LoadTrackModal;