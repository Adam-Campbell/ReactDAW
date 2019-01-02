import Tone from 'tone';
import Section from './Section';

class Channel {
    constructor(channelId, instrument) {
        this.id = channelId;
        this.volumeNode = new Tone.Volume();
        this.soloNode = new Tone.Solo();
        this.pannerNode = new Tone.Panner();
        this.meterNode = new Tone.Meter();
        this.volumeNode.connect(this.meterNode);
        this.meterNode.connect(this.soloNode)
        this.soloNode.connect(this.pannerNode);
        this._instrument = instrument || new Tone.PolySynth(6, Tone.Synth);
        this._effectChain = [];
        this.sectionStore = {};
        this.connectEffectChain();
    }

    get instrument() {
        return this._instrument;
    }

    set instrument(instrument) {
        const oldInstrument = this._instrument;
        const nextNode = this.effectChain.length ? this.effectChain[0] : this.volumeNode;
        oldInstrument.disconnect(nextNode);
        this._instrument = instrument;
        instrument.connect(nextNode);
        for (let section in this.sectionStore) {
            this.sectionStore[section].instrument = instrument;
        }
    }

    get effectChain() {
        return this._effectChain;
    }

    set effectChain(effectChain) {
        this.disconnectEffectChain();
        this._effectChain = effectChain;
        this.connectEffectChain();
    }

    connectEffectChain() {
        const completeChain = [
            this.instrument,
            ...this.effectChain,
            this.volumeNode
        ];
        for (let i = 0, len = completeChain.length - 1; i < len; i++) {
            completeChain[i].connect(completeChain[i+1]);
        }
        this.pannerNode.connect(Tone.Master);
    }

    disconnectEffectChain() {
        const completeChain = [
            this.instrument,
            ...this.effectChain,
            this.volumeNode
        ];
        for (let i = 0, len = completeChain.length - 1; i < len; i++) {
            completeChain[i].disconnect(completeChain[i+1]);
        }
        this.pannerNode.disconnect(Tone.Master);
    }

    setVolume(newVolume) {
        this.volumeNode.volume.value = newVolume;
    }

    mute() {
        this.volumeNode.mute = true;
    }

    unmute() {
        this.volumeNode.mute = false;
    }

    solo() {
        this.soloNode.solo = true;
    }

    unsolo() {
        this.soloNode.solo = false;
    }

    setPan(newPan) {
        this.pannerNode.pan.value = newPan;
    }
    
    addSection(section, startTime) {
        if (!(section instanceof Section)) {
            throw new Error("You have tried to assign an invalid object as a channel section");
        }
        this.sectionStore[section._id] = section;
        section.start = startTime;
        section.instrument = this.instrument;
    }

    deleteSection(sectionId) {
        const sectionToDelete = this.sectionStore[sectionId];
        sectionToDelete.delete();
        delete this.sectionStore[sectionId];
    }

    deleteChannel() {
        for (let sectionKey in this.sectionStore) {
            this.deleteSection(sectionKey);
        }
        this.disconnectEffectChain();
    }

}

export default Channel;
