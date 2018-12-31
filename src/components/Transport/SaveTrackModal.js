import React from 'react';
import PropTypes from 'prop-types';

const SaveTrackModal = props => (
    <div className="modal__overlay">
        <div className="modal__content-container">
            <button
                className="button pink"
                onClick={props.handleClose}
            >Close</button>
            <div>
                <input
                    className="modal__text-input"
                    type="text"
                    value={props.saveName}
                    onChange={props.updateSaveName}
                    placeholder="Choose a name"
                ></input>
                <button 
                    className="button pink"
                    onClick={props.handleSave}
                >Save Track</button>
            </div>
        </div>
    </div>
);

SaveTrackModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    saveName: PropTypes.string.isRequired,
    updateSaveName: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
};

export default SaveTrackModal;