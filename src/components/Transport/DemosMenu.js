import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

const DemosMenu = (props) => (
    <div 
        className="menu__container" 
        ref={props.containerRef}
        onClick={props.toggleMenu}
    >
        <p 
            className={`menu__label ${props.isOpen ? 'menu__label--open' : ''}`}
        >Demos</p>
        <ul 
            className={`menu__list ${props.isOpen ? 'menu__list--visible' : ''}`}
        >
            <li 
                className="menu__item"
            >
                <p className="menu__item-text">Demo goes here</p>
            </li>
        </ul>
    </div>
);

// will need to be connected once all of the functionality exists.
export default DemosMenu;