import React from 'react';
import PropTypes from 'prop-types';

const SaveModal = props => (
    <>
        <button
            className="button main-color"
            onClick={props.handleClose}
        >X</button>
        <div className="save-modal__container"> 
            <div>
                <input
                    className="modal__text-input"
                    type="text"
                    value={props.saveName}
                    onChange={props.updateSaveName}
                    placeholder="Choose a name"
                ></input>
                <button 
                    className="button button--wide main-color"
                    onClick={props.handleSave}
                >Save Track</button>
            </div>
        </div>   
    </>
);

SaveModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    saveName: PropTypes.string.isRequired,
    updateSaveName: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
};

export default SaveModal;