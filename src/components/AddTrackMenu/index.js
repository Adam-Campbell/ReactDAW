import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { generateId } from '../../sharedUtils';
import { UIColors } from '../../constants';
import AddTrackMenu from './AddTrackMenu';

export class AddTrackMenuContainer extends Component {
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
            `Channel ${this.props.numberOfChannels + 1}`,
            UIColors.pink,
            generateId(),
            instrumentType
        );
        this.closeMenu();
    }

    render() {
        return <AddTrackMenu 
            menuIsOpen={this.state.menuIsOpen}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu}
            handleAddChannel={this.handleAddChannel}
        />
    }
}

const mapStateToProps = (state) => ({
    numberOfChannels: state.channels.length
});

export default connect(
    mapStateToProps,
    {
        addChannel: ActionCreators.addChannel
    }
)(AddTrackMenuContainer);