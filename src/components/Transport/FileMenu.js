import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { modalTypes } from '../../constants';

export const FileMenu = props => {

    const handleSave = () => {
        if (props.saveName) {
            const namespacedSaveName = `[track_name] ${props.saveName}`;
            props.saveState(namespacedSaveName);
        } else {
            props.openModal(modalTypes.saveAs);
        }
    }

    return (
        <div 
            className="menu__container" 
            ref={props.containerRef}
            onClick={props.toggleMenu}
        >
            <p 
                className="menu__label"
            >File</p>
            <ul 
                className={`menu__list ${props.isOpen ? 'menu__list--visible' : ''}`}
            >
                <li 
                    className="menu__item"
                    onClick={() => props.openModal(modalTypes.open)}
                >
                    <p className="menu__item-text">Open</p>
                </li>
                <li 
                    className="menu__item"
                    onClick={handleSave}
                >
                    <p className="menu__item-text">Save</p>
                </li>
                <li 
                    className="menu__item"
                    onClick={() => props.openModal(modalTypes.saveAs)}
                >
                    <p className="menu__item-text">Save As</p>
                </li>
            </ul>
        </div>
    );
}

FileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    containerRef: PropTypes.object.isRequired
}

const mapStateToProps =  state => ({
    saveName: state.main.present.composition.saveName
});

export default connect(
    mapStateToProps,
    { 
        openModal: ActionCreators.openModal,
        saveState: ActionCreators.saveState
    }
)(FileMenu);