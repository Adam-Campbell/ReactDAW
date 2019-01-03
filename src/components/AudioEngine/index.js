import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Section from './Section';
import Bus from './Bus';
import Channel from './Channel';
import Tone from 'tone';
import { instrumentTypes, effectTypes } from '../../constants';
import InstrumentFactory from './InstrumentFactory';
import EffectFactory from './EffectFactory';

window.Tone = Tone;

/*

Not urgent but should be revisited later - when adding a Tone.Meter instance via the chain() method
on Tone.Master, the level reported by that meter is unaffected by chaing the volume via Tone.Master.volume.

It may be necessary to add an instance of Tone.Volume before the Tone.Meter instance in the chain, and then
use that to alter the master volume. 

*/


class AudioEngine extends Component {
    constructor(props) {
        super(props);
        this.masterVolumeNode = new Tone.Volume();
        this.masterMeterNode = new Tone.Meter();
        this.instrumentReferences = {};
        this.meterNodeReferences = {};
        this._bus = new Bus(this.masterVolumeNode, this.instrumentReferences, this.meterNodeReferences);
        this._instrumentFactory = new InstrumentFactory();
        this._effectFactory = new EffectFactory();
        window.bus = this._bus;
        window.instrumentReferences = this.instrumentReferences;
        window.meterNodeReferences = this.meterNodeReferences;
        Tone.Master.chain(this.masterVolumeNode, this.masterMeterNode);
        this.meterNodeReferences['master'] = this.masterMeterNode;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this._updateEngineState(prevProps, this.props);
    }

    /**
     * Takes the normalized state from redux and converts it into a tree structure resembling the class
     * hierarchy within the audio engine. This allows all of the updating that follows to be more intuitive.
     * @param {object} state - the normalized redux state 
     */
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
                sections: channel.sectionIds.map(sectionId => state.sections[sectionId]),
                volume: channel.volume,
                isMuted: channel.isMuted,
                isSolo: channel.isSolo,
                pan: channel.pan
            }
        });
        return tree;
    }

    _updateEngineState(prevState, currState) {
        const prev = this._stateToTree(prevState);
        const curr = this._stateToTree(currState);
        console.log(prev, curr);
        //this._updatePlayer(prev.playerInfo, curr.playerInfo);
        this._bus.reconcile(prev, curr);
        return;
        // First we loop through prev.channels, any channel that is in prev.channels
        // but not in curr.channels gets deleted.
        for (let channel of prev.channels) {
            const channelInCurrState = curr.channels.find(el => el.id === channel.id);
            if (!channelInCurrState) {
                this._bus.removeChannel(channel.id);
                
                // here we remove the refernece to this channels instrument from the global
                // instrumentReferences object. 
                delete this.instrumentReferences[channel.id];
                delete this.meterNodeReferences[channel.id];
            }
        }

        // Now we loop through curr.channels. Any channel that is also in prev.channels gets 
        // updated, any channel that is not in prev.channels gets created
        for (let channel of curr.channels) {
            const channelInPrevState = prev.channels.find(el => el.id === channel.id);
            if (channelInPrevState) {
                this._updateChannel(channelInPrevState, channel);
            } else {
                const newChannel = this._createChannel(channel);
                this._bus.addChannel(newChannel);
            }
        }
    }

    /**
     * Updates the meta information for the player (isPlaying, volume, is muted etc).
     * @param {object} prev - previous state tree 
     * @param {object} curr - current state tree
     */
    _updatePlayer(prev, curr) {
        if (prev.isPlaying !== curr.isPlaying || prev.isPaused !== curr.isPaused) {
            if (curr.isPaused) {
                Tone.Transport.pause();
            } else if (curr.isPlaying) {
                Tone.Transport.start();
            } else {
                Tone.Transport.stop();
            }
        }
        if (prev.isMuted !== curr.isMuted) {
            Tone.Master.mute = curr.isMuted;
        }
        if (prev.volume !== curr.volume) {
            this.masterVolumeNode.volume.value = curr.volume;
        }
        if (prev.bpm !== curr.bpm) {
            Tone.Transport.bpm.value = curr.bpm;
        }
    }

    /**
     * Updates a channel with any differences between the previous and current channel state from
     * the state tree.
     * @param {object} prevChannel - the previous channel state
     * @param {object} currChannel - the curent channel state
     */
    _updateChannel(prevChannel, currChannel) {

        // First grab reference to this particular channel from _bus.channels array.
        const channelRef = this._bus.channels.find(channel => channel.id === currChannel.id);

        // Update the instrument for this channel.
        // Basic implementation - check if instrument type changed from prev to curr states. If yes,
        // a new instrument needs to be created using the instrument factory, with the instrument data
        // passed in as well. If the type is the same from prev to curr, then just use the set() method
        // to update the instrument data with the new instrument data. For a more advanced implementation,
        // you could check first to see if the instrument data has actually changed at all between prev
        // and curr states, and only call the set method if it has changed. 
        if (prevChannel.instrument.type !== currChannel.instrument.type) {
            const newInstrument = this._instrumentFactory.create(
                currChannel.instrument.type, 
                currChannel.instrument.instrumentData
            );
            channelRef.instrument = (newInstrument);
            
            // here we are updating the global instrumentReferences object so that other parts of the program
            // have access to the new instrument, allowing them to trigger notes without going through redux and
            // having to update the main app state. 
            this.instrumentReferences[currChannel.id] = newInstrument;
        } else {
            channelRef.instrument.set(currChannel.instrument.instrumentData);
        }

        // Update the effects chain for this channel.
        // First ascertain whether the order of effects has changed. Go through prev and curr and check
        // the ids. If there is any discrepancy between prev and curr, then just disconnect the entire
        // effect chain. Construct a new effect chain with the channels instrumet in the first position,
        // followed by all of the effects, and then by Tone.Master in the last position. Use the effectChain
        // setter method on the Channel class to set the new effects chain. Finally use the connectEffectChain
        // method to reconnect everything.
        // If there wasn't any discrepancies between the ids from prev to curr, then just go through each effect
        // and update it with the new effect settings from current state.
        // This methodology for updating the effects is highly inefficient, it will do for now and shouldn't 
        // present any major problems, but should be revisited to be made more efficient. 

        // determine whether the effects chain has changed beyond just settings tweaks, by first checking
        // if the array lengths have changed, and if not then further check that all of the ids are the
        // same.
        let hasChanged = false;
        if (prevChannel.effects.length !== currChannel.effects.length) {
            hasChanged = true;
        } else if (currChannel.effects.length) {
            for (let i = 0; i <= currChannel.effects.length; i++) {
                if (prevChannel.effects[i] && prevChannel.effects[i].id !== currChannel.effects[i].id) {
                    hasChanged = true;
                }
            }
        }
        // if it has changed, disconnect the effects chain, build the new one, and connect it.
        if (hasChanged) {
            //channelRef.disconnectEffectChain();
            const newEffectChain = currChannel.effects.map(effect => {
                return this._effectFactory.create(
                    effect.type,
                    effect.effectData
                );
            });
            channelRef.effectChain = newEffectChain;
            //channelRef.connectEffectChain();
            // else if the only thing that has changed is settings, loop over the effects and 
            // supply the new settings. 
        } else {
            currChannel.effects.forEach((effect, i) => {
                channelRef.effectChain[i].set(effect.effectData);
            });
        }

        // Update the sections for this channel. 
        // First check for any sections that are in prev state but not curr state. These can be deleted via
        // the deleteSection method on the Channel class. 
        // Now go through all of the section in curr state. For any sections in curr state that are not also 
        // in prev state, create a new section with _createNewSection(), and add it to the channel with the
        // addSection() method on the Channel class. For any sections that are present in both prev state and
        // curr state, use _updateSection to update it. 
        for (let section of prevChannel.sections) {
            const isInCurrChannel = currChannel.sections.find(el => el.id === section.id);
            if (!isInCurrChannel) {
                channelRef.deleteSection(section.id);
            }
        }
        for (let section of currChannel.sections) {
            const sectionInPrevChannel = prevChannel.sections.find(el => el.id === section.id);
            if (sectionInPrevChannel) {
                const sectionRef = channelRef.sectionStore[section.id];
                this._updateSection(sectionInPrevChannel, section, sectionRef);
            } else {
                const newSection = this._createSection(section);
                channelRef.addSection(newSection, section.start);
            }
        }

        // update the meta data for this channel
        if (prevChannel.volume !== currChannel.volume) {
            channelRef.setVolume(currChannel.volume);
        }
        if (prevChannel.pan !== currChannel.pan) {
            channelRef.setPan(currChannel.pan);
        }
        if (prevChannel.isMuted !== currChannel.isMuted) {
            if (currChannel.isMuted) {
                channelRef.mute();
            } else {
                channelRef.unmute();
            }
        }
        if (prevChannel.isSolo !== currChannel.isSolo) {
            if (currChannel.isSolo) {
                channelRef.solo();
            } else {
                channelRef.unsolo();
            }
        }
    }

    /**
     * updates one section wih any differences that have occurred between the previous and current state
     * trees.
     * @param {object} prevSection - the previous state for the section
     * @param {obejct} currSection - the current state for the section
     * @param {object} sectionRef - a reference to the actual Section class instance 
     */
    _updateSection(prevSection, currSection, sectionRef) {
        let prevNotes = prevSection.notes;
        let currNotes = currSection.notes;
        for (let note of prevNotes) {
            let isInCurr = currNotes.find(el => el._id === note._id);
            if (!isInCurr) {
               sectionRef.removeNote(note._id); 
            }
        }

        for (let note of currNotes) {
            let isInPrev = prevNotes.find(el => el._id === note._id);
            if (!isInPrev) {
                sectionRef.addNote({
                    note: note.pitch,
                    time: note.time,
                    duration: note.duration,
                    id: note._id,
                    velocity: note.velocity
                });
            }
        }
    }

    /**
     * Creates a brand new channel from scratch according to the channel state supplied as the channel
     * argument.
     * @param {object} channel - the channel state 
     */
    _createChannel(channelData) {
        // Create the instrument for this channel.
        const instrument = this._instrumentFactory.create(
            channelData.instrument.type, 
            channelData.instrument.instrumentData
        );

        // this is just adding a reference to this channels instrument on the global instrumentReferences 
        // object, so that other parts of the program can trigger notes on this instrument without having to
        // go through redux and update the main app state to do so.
        this.instrumentReferences[channelData.id] = instrument;

        const newChannel = new Channel(channelData.id, instrument);

        // Create the effects chain for this channel.
        newChannel.effectChain = channelData.effects.map(effect => {
            return this._effectFactory.create(effect.type, effect.data);
        });
        
        // Create the sections for this channel. 
        for (let section of channelData.sections) {
            const newSection = this._createSection(section);
            newChannel.addSection(newSection, section.start);
        }

        // set the meta data for this channel
        newChannel.setVolume(channelData.volume);
        newChannel.setPan(channelData.pan);
        if (channelData.isMuted) {
            newChannel.mute();
        } else {
            newChannel.unmute();
        }
        if (channelData.isSolo) {
            newChannel.solo();
        } else {
            newChannel.unsolo();
        }

        // add a reference to the method to get this channels meter signal value
        this.meterNodeReferences[channelData.id] = newChannel.meterNode;

        return newChannel;

    }

    /**
     * Creates a brand new section from scratch according to the section state supplied.
     * @param {object} sectionData - the state from which to construct the new Section instance.
     */
    _createSection(sectionData) {
        // create the new section
        const newSection = new Section(sectionData.id, sectionData.start);

        // add the notes
        for (let note of sectionData.notes) {
            newSection.addNote({
                note: note.pitch,
                time: note.time,
                duration: note.duration,
                id: note._id,
                velocity: note.velocity
            });
        }

        return newSection;

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
    instruments: state.instruments,
    effects: state.effects
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