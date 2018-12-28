import React from 'react';
import PropTypes from 'prop-types';
import { instrumentTypes } from '../../constants';

const AddTrackMenu = props => (
    <div className="add-track-menu">
        <button 
            className="add-track-menu__button"
            onClick={props.openMenu}
        >+ Add track</button>
        <div 
            className={`add-track-menu__item-container ${props.menuIsOpen ? 'show-menu' : ''}`}
        >
            <ul className="add-track-menu__list">
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(instrumentTypes.default)}
                >Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(instrumentTypes.am)}
                >AM Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(instrumentTypes.fm)}
                >FM Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(instrumentTypes.duo)}
                >Duo Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(instrumentTypes.mono)}
                >Mono Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(instrumentTypes.drumKit)}
                >Drum Kit</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={props.closeMenu}
                >X</li>
            </ul> 
        </div>
    </div>
);

AddTrackMenu.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired,
    handleAddChannel: PropTypes.func.isRequired
};

export default AddTrackMenu;