import Tone from 'tone';

class Bus {
    constructor() {
        this.channels = [];
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