import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import ReactModal from 'react-modal';
import { modalTypes } from '../../constants';
import LoadModal from '../LoadModal';
import SaveModal from '../SaveModal';
import AttributionModal from '../AttributionModal';
import ShortcutsModal from '../ShortcutsModal';

ReactModal.setAppElement('#root');

export const getModalContent = modalType => {
    switch (modalType) {
        case modalTypes.open:
            return <LoadModal />;

        case modalTypes.saveAs:
            return <SaveModal />;

        case modalTypes.attribution:
            return <AttributionModal />;

        case modalTypes.shortcuts:
            return <ShortcutsModal />;

        default: 
            return null;
    }
};


export const Modal = props => (
    <ReactModal 
        isOpen={props.modalType ? true : false}
        className="modal__content-container"
        overlayClassName="modal__overlay"
        shouldCloseOnEscape={true}
        onRequestClose={props.closeModal}
    >
        {getModalContent(props.modalType)}
    </ReactModal>
);


const mapStateToProps = state => ({
    modalType: state.main.present.modals.modalType,
    modalProps: state.main.present.modals.modalProps
});

export default connect(
    mapStateToProps,
    {
        closeModal: ActionCreators.closeModal
    }
)(Modal);