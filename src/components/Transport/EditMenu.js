import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

export const EditMenu = props => {
    return (
        <div 
            className="menu__container" 
            ref={props.containerRef}
            onClick={props.toggleMenu}
        >
            <p 
                className="menu__label"
            >Edit</p>
            <ul 
                className={`menu__list ${props.isOpen ? 'menu__list--visible' : ''}`}
            >
                <li 
                    className="menu__item"
                >
                    <p className="menu__item-text">Undo</p>
                </li>
                <li className="menu__item">
                    <p className="menu__item-text">Redo</p>
                </li>
            </ul>
        </div>
    );
}

EditMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    containerRef: PropTypes.object.isRequired
}

export default connect(undefined)(EditMenu);