import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import { connect } from 'react-redux';
import LoadModal from './LoadModal';

export const getSavedTracks = () => {
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

export class LoadModalContainer extends Component {

    handleLoad = trackName => {
        const namespacedTrackName = `[track_name] ${trackName}`;
        this.props.loadState(namespacedTrackName);
        this.props.closeModal();
    }

    render() {
        const savedTracks = getSavedTracks();
        return (
            <LoadModal 
                handleClose={this.props.closeModal}
                handleLoad={this.handleLoad}
                savedTracks={savedTracks}
            />
        );
    }
}


// class LoadModalContainer extends Component {


//     handleLoad = (trackName) => {
//         const namespacedTrackName = `[track_name] ${trackName}`;
//         this.props.loadState(namespacedTrackName);
//         this.props.closeModal();
//     }

//     render() {
//         const savedTracks = this.getSavedTracks();
//         return <LoadModal 
//             handleClose={this.props.closeModal}
//             savedTracks={savedTracks}
//             handleLoad={this.handleLoad}
//         />
//     }
// }

export default connect(
    undefined, 
    {
        loadState: ActionCreators.loadState,
        closeModal: ActionCreators.closeModal
    }
)(LoadModalContainer);