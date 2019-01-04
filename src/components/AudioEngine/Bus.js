import Tone from 'tone';
import Channel from './Channel';
import { 
    isEqual, 
    differenceWith, 
    intersectionWith, 
    cloneDeep 
} from 'lodash';

class Bus {
    constructor() {
        // Will hold all instances of the Channel class that are created.
        this.channels = [];
        // create volume and meter nodes for Tone.Master to use, chain them to Master
        this.masterVolumeNode = new Tone.Volume();
        this.masterMeterNode = new Tone.Meter();
        Tone.Master.chain(this.masterVolumeNode, this.masterMeterNode);
        // set up stores to hold references to the instruments and meter nodes that are created, add these
        // stores to the window so they can be directly accessed by other parts of the program
        this.instrumentReferences = {};
        this.meterNodeReferences = {};
        window.instrumentReferences = this.instrumentReferences;
        window.meterNodeReferences = this.meterNodeReferences;
        this.meterNodeReferences['master'] = this.masterMeterNode;
    }

    /**
     * The main reconciliation method for this class, delegates to more specific reconciliation methods.
     * @param {object} prevState - the previous state 
     * @param {object} currState - the current state 
     */
    reconcile(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        this.reconcilePlayer(prev.playerInfo, curr.playerInfo);
        this.reconcileChannels(prev.channels, curr.channels);
    }

    /**
     * Reconciles the playerInfo part of state.
     * @param {object} prevState - the previous state
     * @param {object} currState - the current state
     */
    reconcilePlayer(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        // return early if nothing in this slice of state has changed.
        if (isEqual(prev, curr)) {
            return;
        }
        // If isPlaying or isPaused have changed, work out whether the track needs to be started, 
        // paused or stopped.
        if (prev.isPlaying !== curr.isPlaying || prev.isPaused !== curr.isPaused) {
            if (curr.isPaused) {
                Tone.Transport.pause();
            } else if (curr.isPlaying) {
                Tone.Transport.start();
            } else {
                Tone.Transport.stop();
            }
        }
        // if the mute, volume or bpm settings have changed, update as necessary. 
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
     * Reconciles the channels part of state
     * @param {array} prevState - the previous state 
     * @param {array} currState - the current state
     */
    reconcileChannels(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        // return early if nothing has changed
        if (isEqual(prev, curr)) {
            return;
        }
        // Channels that are in prev but not curr are marked as channelsToRemove
        const channelsToRemove = differenceWith(prev, curr, (a, b) => a.id === b.id);
        // Channels that are in curr but not prev are marked as channelsToAdd
        const channelsToAdd = differenceWith(curr, prev, (a, b) => a.id === b.id);
        // Channels that are in curr and prev potentially need to be updated. The version that is
        // stored in this variable is the version from curr - the version that the engine will need
        // to be in sync with.
        const channelsToPotentiallyUpdate = intersectionWith(curr, prev, (a, b) => a.id === b.id);
        
        // remove the channelsToRemove, also clearing out references to their instruments and meter nodes. 
        channelsToRemove.forEach(channelData => {
            this.removeChannel(channelData.id);
            delete this.instrumentReferences[channelData.id];
            delete this.meterNodeReferences[channelData.id];
        });
        // create the channelsToAdd and add them to the channels array.
        channelsToAdd.forEach(channelData => {
            const newChannel = new Channel(channelData.id, this.instrumentReferences, this.meterNodeReferences)
                                          .reconcile(undefined, channelData);
            this.addChannel(newChannel);
        });
        // check each channelToPotentiallyUpdate to see if it actually needs updating, and perform the update
        // if it is needed.
        channelsToPotentiallyUpdate.forEach(channelData => {
            const prevChannelData = prev.find(el => el.id === channelData.id);
            if (isEqual(channelData, prevChannelData)) {
                return;
            }
            const channelInstance = this.channels.find(el => el.id === channelData.id);
            channelInstance.reconcile(prevChannelData, channelData);
        });
    }

    /**
     * Add a new channel to the channels array.
     * @param {*} newChannel - an instance of the Channel class
     */
    addChannel(newChannel) {
        if (!(newChannel instanceof Channel)) {
            throw new Error("You have tried to assign an invalid object as a channel");
        }
        this.channels.push(newChannel);
    }

    /**
     * Remove a channel from the channels array, and call the deleteChannel method on that channel to 
     * perform any necessary cleanup. 
     * @param {string} channelId - the id of the channel to remove.
     */
    removeChannel(channelId) {
        let channelToRemove = this.channels.find(channel => channel.id === channelId);
        channelToRemove.deleteChannel();
        this.channels = this.channels.filter(channel => channel.id !== channelId);
    }

    /**
     * Clear all channels from the channels array and call deleteChannel for each one. 
     */
    clearChannels() {
        for (let channel of this.channels) {
            channel.deleteChannel();
        }
    }
}

export default Bus;