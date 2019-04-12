import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { modalTypes } from '../../constants';

export const HelpMenu = props => {
    return (
        <div 
            className="menu__container" 
            ref={props.containerRef}
            onClick={props.toggleMenu}
        >
            <p 
                className={`menu__label ${props.isOpen ? 'menu__label--open' : ''}`}
            >Help</p>
            <ul 
                className={`menu__list ${props.isOpen ? 'menu__list--visible' : ''}`}
            >
                <li 
                    className="menu__item"
                    onClick={() => props.openModal(modalTypes.shortcuts)}
                >
                    <p className="menu__item-text">View shortcuts</p>
                </li>
            </ul>
        </div>
    );
}

HelpMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    containerRef: PropTypes.object.isRequired
}

export default connect(
    undefined,
    {
        openModal: ActionCreators.openModal
    }
)(HelpMenu);