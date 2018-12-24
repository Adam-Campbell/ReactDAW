import React from 'react';
import PropTypes from 'prop-types';
import { synthTypes } from '../../constants';

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
                    onClick={() => props.handleAddChannel(synthTypes.default)}
                >Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(synthTypes.am)}
                >AM Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(synthTypes.fm)}
                >FM Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(synthTypes.duo)}
                >Duo Synth</li>
                <li 
                    className="add-track-menu__menu-item"
                    onClick={() => props.handleAddChannel(synthTypes.mono)}
                >Mono Synth</li>
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