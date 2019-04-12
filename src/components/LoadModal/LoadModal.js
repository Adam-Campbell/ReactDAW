import React from 'react';
import PropTypes from 'prop-types';

const LoadTrackModal = props => (
    <>
        <button
            className="button main-color"
            onClick={props.handleClose}
        >X</button>
        <div className="load-modal__container">
            
            <ul className="modal__list">
            {props.savedTracks.lenght ? props.savedTracks.map((trackName, index) => (
                <li
                    className="modal__list-item"
                    key={index}
                    onClick={(e) => props.handleLoad(trackName)}
                >{trackName}</li>
            )) : (
                <p className="modal__text">Sorry, there are no tracks available to load.</p>
            )}
            </ul>
        </div>
    </>
);

LoadTrackModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    savedTracks: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleLoad: PropTypes.func.isRequired
};

export default LoadTrackModal;