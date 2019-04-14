import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { preludeData, divinityData, chilledData } from '../../demoData';

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
                onClick={() => props.loadDemo('Prelude_demo', preludeData)}
            >
                <p className="menu__item-text">Prelude</p>
            </li>
            <li 
                className="menu__item"
                onClick={() => props.loadDemo('Divinity_demo', divinityData)}
            >
                <p className="menu__item-text">Divinity</p>
            </li>
            <li 
                className="menu__item"
                onClick={() => props.loadDemo('Chilled_demo', chilledData)}
            >
                <p className="menu__item-text">Chilled</p>
            </li>
        </ul>
    </div>
);

DemosMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    containerRef: PropTypes.object.isRequired
};

export default connect(
    undefined,
    {
        loadDemo: ActionCreators.loadStateSuccess
    }
)(DemosMenu);