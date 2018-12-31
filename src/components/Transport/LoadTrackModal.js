import React from 'react';
import PropTypes from 'prop-types';

const LoadTrackModal = props => (
    <div className="modal__overlay">
        <div className="modal__content-container">
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
        </div>
    </div>
);

LoadTrackModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    savedTracks: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleLoad: PropTypes.func.isRequired
};

export default LoadTrackModal;