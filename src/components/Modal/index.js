import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import ReactModal from 'react-modal';
import { modalTypes } from '../../constants';
import LoadModal from '../LoadModal';
import SaveModal from '../SaveModal';

ReactModal.setAppElement('#root');

class Modal extends Component {


    renderModalContent() {
        switch (this.props.modalType) {

            case modalTypes.open:
                return <LoadModal />;

            case modalTypes.saveAs:
                return <SaveModal />;

            case modalTypes.help:
                return null;

            default: 
                return null;
        }
    }
    render() {
        return <ReactModal 
            isOpen={this.props.modalType ? true : false}
            className="modal__content-container"
            overlayClassName="modal__overlay"
            shouldCloseOnEscape={true}
            onRequestClose={this.props.closeModal}
        >
            {this.renderModalContent()}
        </ReactModal>
    }
}

const mapStateToProps = state => ({
    modalType: state.modals.modalType,
    modalProps: state.modals.modalProps
});

export default connect(
    mapStateToProps,
    {
        closeModal: ActionCreators.closeModal
    }
)(Modal);