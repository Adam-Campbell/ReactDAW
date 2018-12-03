import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import { generateId } from '../helpers';
import { synthTypes, UIColors } from '../constants';

class AddTrackMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuIsOpen: false
        };
    }

    openMenu = () => {
        this.setState({
            menuIsOpen: true
        });
    }

    closeMenu = () => {
        this.setState({
            menuIsOpen: false
        });
    }

    handleAddChannel = (instrumentType) => {
        this.props.addChannel(
            generateId(),
            `Channel ${this.props.numberOfChannels}`,
            UIColors.pink,
            generateId(),
            instrumentType
        );
        this.closeMenu();
    }


    render() {
        const { menuIsOpen } = this.state;
        return (
            <div className="add-track-menu">
                <button 
                    className="add-track-menu__button"
                    onClick={this.openMenu}
                >+ Add track</button>
                <div 
                    className={`add-track-menu__item-container ${menuIsOpen ? 'show-menu' : ''}`}
                >
                    <ul className="add-track-menu__list">
                        <li 
                            className="add-track-menu__menu-item"
                            onClick={() => this.handleAddChannel(synthTypes.default)}
                        >Synth</li>
                        <li 
                            className="add-track-menu__menu-item"
                            onClick={() => this.handleAddChannel(synthTypes.am)}
                        >AM Synth</li>
                        <li 
                            className="add-track-menu__menu-item"
                            onClick={() => this.handleAddChannel(synthTypes.fm)}
                        >FM Synth</li>
                        <li 
                            className="add-track-menu__menu-item"
                            onClick={() => this.handleAddChannel(synthTypes.duo)}
                        >Duo Synth</li>
                        <li 
                            className="add-track-menu__menu-item"
                            onClick={() => this.handleAddChannel(synthTypes.mono)}
                        >Mono Synth</li>
                        <li 
                            className="add-track-menu__menu-item"
                            onClick={this.closeMenu}
                        >X</li>
                    </ul> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    numberOfChannels: state.channels.length + 1
});

export default connect(
    mapStateToProps,
    {
        addChannel: ActionCreators.addChannel
    }
)(AddTrackMenu);