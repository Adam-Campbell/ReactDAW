import Tone from 'tone';
import Channel from './Channel';
import { isEqual, differenceWith, intersectionWith } from 'lodash';

class Bus {
    constructor(masterVolumeNodeRef, instrumentReferences, meterNodeReferences) {
        this.channels = [];
        this.masterVolumeNodeRef = masterVolumeNodeRef;
        this.instrumentReferences = instrumentReferences;
        this.meterNodeReferences = meterNodeReferences;
    }

    reconcile(prev, curr) {
        this.reconcilePlayer(prev.playerInfo, curr.playerInfo);
        this.reconcileChannels(prev.channels, curr.channels);
    }

    reconcilePlayer(prev, curr) {
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

    reconcileChannels(prev, curr) {
        if (isEqual(prev, curr)) {
            return;
        }
        // Will return the channels that are only in prev state and therefore need to be removed.
        const channelsToRemove = differenceWith(prev, curr, (a, b) => a.id === b.id);
        // Will return the channels that are only in curr state and therefore need to be added.
        const channelsToAdd = differenceWith(curr, prev, (a, b) => a.id === b.id);
        // Will return the channels that are in both the prev and curr states, and so potentially may
        // need to be updated. The channel data included will be the data from the curr state, so the
        // data the engine needs to be in sync with. 
        const channelsToPotentiallyUpdate = intersectionWith(curr, prev, (a, b) => a.id === b.id);
        
        channelsToRemove.forEach(channelData => {
            this.removeChannel(channelData.id);
            delete this.instrumentReferences[channelData.id];
            delete this.meterNodeReferences[channelData.id];
        });

        channelsToAdd.forEach(channelData => {
            const newChannel = new Channel(channelData.id, this.instrumentReferences, this.meterNodeReferences)
                                          .reconcile(undefined, channelData);
            this.addChannel(newChannel);
        });

        channelsToPotentiallyUpdate.forEach(channelData => {
            const prevChannelData = prev.find(el => el.id === channelData.id);
            if (isEqual(channelData, prevChannelData)) {
                return;
            }
            const channelInstance = this.channels.find(el => el.id === channelData.id);
            channelInstance.reconcile(prevChannelData, channelData);
        });
    }


    addChannel(newChannel) {
        this.channels.push(newChannel);
    }

    removeChannel(channelId) {
        let channelToRemove = this.channels.find(channel => channel.id === channelId);
        channelToRemove.deleteChannel();
        this.channels = this.channels.filter(channel => channel.id !== channelId);
    }

    toggleMute() {
        Tone.Master.mute = !Tone.Master.mute;
    }

    get volume() {
        return Tone.Master.volume.value;
    }

    set volume(newVolume) {
        // note that volume is measured in decibels and therefore is logarithmic. Each additional
        // 10 decibels doubles the volumn, subtracting 10 decibels halves the volume. 
        Tone.Master.volume.value = newVolume;
    }

    clear() {
        for (let channel of this.channels) {
            channel.deleteChannel();
        }
    }
}

export default Bus;