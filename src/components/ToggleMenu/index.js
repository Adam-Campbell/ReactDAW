import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ToggleMenu extends Component {
    
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.handleExternalClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleExternalClick);
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
    }

    toggleMenu = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    /**
     * Ensure that the menu closes when a click event occurs outside of the menus container. 
     * @param {object} e - the event object
     */
    handleExternalClick = (e) => {
        const container = this.containerRef.current;
        const containerClicked = e.path.includes(container);
        if (!containerClicked && this.state.isOpen) {
            this.closeMenu();
        }
    }
    
    render() {
        // toggleMenu is the main callback that should be used for opening and closing the menu, however
        // openMenu and closeMenu are also passed down incase there is a need to explicitly open or close
        // the menu. 
        const { children } = this.props;
        return children({
            isOpen: this.state.isOpen,
            openMenu: this.openMenu,
            closeMenu: this.closeMenu,
            toggleMenu: this.toggleMenu,
            containerRef: this.containerRef
        });
    }
}

export default ToggleMenu;