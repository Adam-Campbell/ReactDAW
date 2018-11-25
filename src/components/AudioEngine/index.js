import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Section from './Section';
import Bus from './Bus';
import Channel from './Channel';
import Tone from 'tone';
import { synthTypes, effectTypes } from '../../constants';
import SynthFactory from './SynthFactory';

window.Tone = Tone;

class AudioEngine extends Component {
    constructor(props) {
        super(props);
        //console.log(props);
        this._section = new Section();
        this._bus = new Bus();
        this._synthFactory = new SynthFactory();
        window.bus = this._bus;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this._updateNotes(prevProps.sectionInfo.notes, this.props.sectionInfo.notes);
        this._updatePlayer(prevProps.playerInfo, this.props.playerInfo);
        this._updateChannels(prevProps, this.props);
    }

    // Still todo in this function - update the effects chain for a channel. Perhaps this should 
    // be its own function? It is important that before touching the effects chain for a channel,
    // we establish that it has actually changed since the last state that was passed in, because
    // anytime we change it we have to disconnect from master and we want to minimize that. Easiest
    // way is just to check the ids of the effects in the chain (including the order that they appear),
    // if this is the same between the previous and current states then we don't need to do anything. 
    _updateChannels(prevState, currState) {
        console.log(currState);
        let prevChannels = prevState.channels;
        let currChannels = currState.channels;
        // in prev but not in curr = removeChannel
        for (let channel of prevChannels) {
            let isInCurrChannels = currChannels.find(el => el.id === channel.id);
            if (!isInCurrChannels) {
                this._bus.removeChannel(channel.id);
            } 
        }

        // in curr but not in prev = addChannel
        for (let channel of currChannels) {
            let isInPrevChannels = prevChannels.find(el => el.id === channel.id);
            if (!isInPrevChannels) {
                this._bus.addChannel(
                    new Channel(
                        channel.id, 
                        this._synthFactory.create(
                            channel.instrumentId,
                            currState.instruments[channel.instrumentId].synthData
                        )
                    )
                );
            }
        }

    }

    // We pass in all of the sections that belong to a specific channel. Essentially taking the
    // dictionary of sections and 'filtering' to just the ones for a given channel. Do this for
    // prev state and current state. First add and delete sections as necessary. Then loop over  
    // every section in curr state and call a method that will update the notes in that section.
    //
    _updateChannelsSections(prevSections, currStateSections) {

    }

    _stateToTree(state) {
        let tree = {};
        // copy playerInfo to tree
        tree.playerInfo = { ...state.playerInfo };
        // loop over the channels
        tree.channels = state.channels.map(channel => {
            return {
                id: channel.id,
                instrument: state.instruments[channel.instrumentId],
                effects: channel.effectIds.map(effectId => state.effects[effectId]),
                sections: channel.sectionIds.map(sectionId => state.sections[sectionId])
            }
        });
        return tree;
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
    playerInfo: state.playerInfo,
    channels: state.channels,
    sections: state.sections,
    instruments: state.instruments
});

export default connect(
    mapStateToProps
)(AudioEngine);


/*

we've converted prevState and currState into tree structures - prev and curr



1. Go through the top level player info and see if anything has changed, if yes then update
engine with the changes - that is, start or stop the track, mute or unmute, adjust volume etc. 

2. Go through prev.channels, any channels that aren't also in curr can be deleted using the 
channel.deleteChannel() method. This will also tidy up anything related to that channel (in the 
engine).


Actually - we need to seperate the channels into three groups. The first group is channels that are in
prev but not in curr, these channels just need to be deleted. The second group is channels that are in
curr but not in prev - these channels need to be created. The third group is the channels that were in 
both prev and curr, and these channels need to be updated.



3. Now we can map over curr.channels, and for each channel:

4. Compare instruments between prev and curr versions of channel. If anything has changed, update. This
could range from simply updating a single setting on the instrument via the set() method, to having to
replace the instrument entirely with a brand new instance, if the new state uses a different type of 
synth for example. 

5. Compare the effects chains between the previous and current versions of the channel. Act on any 
differences found. Won't go into full detail here but it is worth noting that when an audio source
is disconnected from the master and then reconnected again straight away, it doesn't have any audible 
effect. So having to disconnect and then reconnect is not a major concern. 



6. Now we can go over the sections for that channel.



*/