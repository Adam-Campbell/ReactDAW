import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { modalTypes } from '../../constants';

class FileMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    openMenu = () => {
        this.setState({
            isOpen: true
        });
    }

    closeMenu = () => {
        this.setState({
            isOpen: false
        });
    }; 

    handleLabelClick = () => {
        const { isOpen } = this.state;
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    handleOpenClick = () => {
        this.props.openModal(modalTypes.open);
    }

    handleSaveAsClick = () => {
        this.props.openModal(modalTypes.saveAs);
    }

    render() {
        return (
            <div className="menu__container">
                <p 
                    className="menu__label"
                    onClick={this.handleLabelClick}
                >File</p>
                <ul 
                    className={`menu__list ${this.state.isOpen ? 'menu__list--visible' : ''}`}
                    onClick={this.closeMenu}
                >
                    <li 
                        className="menu__item"
                        onClick={this.handleOpenClick}
                    >
                        <p className="menu__item-text">Open</p>
                    </li>
                    <li className="menu__item">
                        <p className="menu__item-text">Save</p>
                    </li>
                    <li 
                        className="menu__item"
                        onClick={this.handleSaveAsClick}
                    >
                        <p className="menu__item-text">Save As</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect(
    undefined,
    {
        saveState: ActionCreators.saveState,
        loadState: ActionCreators.loadState,
        openModal: ActionCreators.openModal
    }
)(FileMenu);