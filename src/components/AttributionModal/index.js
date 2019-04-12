import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

const AttributionModal = (props) => (
    <div className="attribution-modal__container">
        <button
            className="button main-color"
            onClick={props.closeModal}
        >X</button>
        <div className="modal__text-container">
            <h1 className="modal__title">Icon Attributions</h1>
            <p className="modal__text">
                Icons used throughout this app are produced by <a className="modal__link" href="https://icon54.com">Pixel Perfect</a>, <a className="modal__link" href="https://www.flaticon.com/packs/selection-cursors-4">Those Icons</a>, 
                and <a className="modal__link" href="http://www.freepik.com/">Freepik</a>, and are made available at <a className="modal__link" href="https://www.flaticon.com/">www.flaticon.com</a> under 
                the <a className="modal__link" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons license</a>.
            </p>
        </div>
    </div>
);


export default connect(
    undefined,
    {
        closeModal: ActionCreators.closeModal
    } 
)(AttributionModal);