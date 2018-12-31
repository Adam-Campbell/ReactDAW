import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import * as ActionCreators from '../../actions';
import LoadTrackModal from './LoadTrackModal';

export class LoadTrackModalContainer extends Component {

    constructor(props) {
        super(props);
        this.root = document.getElementById('modal-root');
        this.el = document.createElement('div');
    }

    componentDidMount() {
        this.root.appendChild(this.el);
    }

    componentWillUnmount() {
        this.root.removeChild(this.el);
    }

    getSavedTracks() {
        const savedTracks = [];
        const len = window.localStorage.length;
        for (let i = 0; i < len; i++) {
            const key = window.localStorage.key(i);
            if (key.includes('[track_name]')) {
                const trimmedName = key.replace(/\[track_name\] /, '');
                savedTracks.push(trimmedName);
            }
        }
        return savedTracks;
    }

    handleLoad = (trackName) => {
        const namespacedTrackName = `[track_name] ${trackName}`;
        this.props.loadState(namespacedTrackName);
        this.props.handleClose();
    }

    render() {
        const savedTracks = this.getSavedTracks();
        return ReactDOM.createPortal(
            <LoadTrackModal 
                handleClose={this.props.handleClose}
                savedTracks={savedTracks}
                handleLoad={this.handleLoad}
            />,
            this.el
        );
    }
}

LoadTrackModalContainer.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default connect(
    undefined,
    {
        loadState: ActionCreators.loadState
    } 
)(LoadTrackModalContainer);
