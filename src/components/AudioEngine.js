import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import Section from './Section';
import Tone from 'tone';

window.Tone = Tone;

class AudioEngine extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this._section = new Section();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log(prevProps);
        //console.log(this.props);
        this._updateNotes(prevProps.sectionInfo.notes, this.props.sectionInfo.notes);
        this._updatePlayer(prevProps.playerInfo, this.props.playerInfo);
    }

    _updatePlayer(prev, curr) {
        if (prev.isPlaying === curr.isPlaying) {
            return;
        }
        if (curr.isPlaying) {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
    }

    _updateNotes(prevNotes, currNotes) {
        // in prev but not curr = remove
        // in curr but not prev = add
        
        // this would be much more efficient if I used dictionaries, but is it premature
        // optimisation?
        for (let note of prevNotes) {
            let isInCurr = currNotes.find(el => el._id === note._id);
            if (!isInCurr) {
               this._section.removeNote(note._id); 
            }
        }

        for (let note of currNotes) {
            let isInPrev = prevNotes.find(el => el._id === note._id);
            if (!isInPrev) {
                this._section.addNote({
                    note: note.pitch,
                    time: note.time,
                    duration: note.duration,
                    id: note._id
                });
            }
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    sectionInfo: state.sectionInfo,
    eventQueue: state.eventQueue,
    playerInfo: state.playerInfo
});

export default connect(
    mapStateToProps,
    {
        removeEventFromQueue: ActionCreators.removeEventFromQueue
    }
)(AudioEngine);