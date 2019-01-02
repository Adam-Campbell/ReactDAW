import Tone from 'tone';
import { isEqual } from 'lodash';

class Bus {
    constructor(masterVolumeNodeRef) {
        this.channels = [];
        this.masterVolumeNodeRef = masterVolumeNodeRef;
    }

    reconcile(prev, curr) {
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