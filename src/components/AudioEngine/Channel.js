import Tone from 'tone';
import Section from './Section';


/*

Before worrying about the effects chain implementation

add the members:

volumeNode - Tone.Volume
soloNode - Tone.Solo
pannerNode - Tone.Panner

They need a method to connect them to each other and then to Master. 

volumeNode should replace Master as the last item in the effects chain for now. 

create methods to update these nodes - 

setVolume
muteTrack
unMuteTrack
soloTrack
unsoloTrack
setPanning

Every time the audio engine updates its internal state it can call upon these methods to update the
track as needed. 
*/


class Channel {
    constructor(channelId, instrument) {
        this.id = channelId;
        this.volumeNode = new Tone.Volume();
        this.soloNode = new Tone.Solo();
        this.pannerNode = new Tone.Panner();
        this.volumeNode.connect(this.soloNode);
        this.soloNode.connect(this.pannerNode);
        this._instrument = instrument || new Tone.PolySynth(6, Tone.Synth);
        this._effectChain = [this._instrument, this.volumeNode];
        this.sectionStore = {};
        this.connectEffectChain();
    }

    get instrument() {
        return this._instrument;
    }

    set instrument(instrument) {
        // if (!(instrument instanceof Tone.Instrument)) {
        //     throw new Error("You have tried to set the instrument on a channel with an invalid object");
        //     return;
        // }
        this._instrument = instrument;
        this._updateInstrumentInEffectChain(instrument);
        for (let section in this.sectionStore) {
            this.sectionStore[section].instrument = instrument;
        }
    }

    get effectChain() {
        return this._effectChain;
    }

    set effectChain(effectChain) {
        this._effectChain = effectChain;
    }

    connectEffectChain() {
        for (let i = 0, len = this._effectChain.length - 1; i < len; i++) {
            this._effectChain[i].connect(this._effectChain[i+1]);
        }
        this.pannerNode.connect(Tone.Master);
    }

    disconnectEffectChain() {
        for (let i = 0, len = this._effectChain.length - 1; i < len; i++) {
            this._effectChain[i].disconnect(this._effectChain[i+1]);
        }
        this.pannerNode.disconnect(Tone.Master);
    }

    addToEffectChain(effect, index) {
        // Value of index is the index position that we want to place the effect AFTER. So to
        // place an effect as the first effect in the chain, we would use the index 0. This
        // is because the instrument is the first element in the chain (so occupies index 0), 
        // and so we want to place our effect directly after this element.

        // handle the connections:
        // disconnect the node either side of the location we want to insert effect
        this.effectChain[index].disconnect(this.effectChain[index+1]);
        // connect effect to its predecessor in chain
        this.effectChain[index].connect(effect);
        // connect effect to its successor in chain
        effect.connect(this.effectChain[index+1]);

        // handle the effectChain array itself:
        // create the new chain to store in state, consisting of all of effects predecessors,
        // followed by effect, followed by all of its successors.
        const newEffectChain = [
            ...this.effectChain.slice(0, index+1),
            effect,
            ...this.effectChain.slice(index+1)
        ];
        // update effectChain property with this new array of effects.
        this.effectChain = newEffectChain;
    }

    removeFromEffectChain(index) {
        // Here index is the index of the effect that we want to remove.
        
        // disconnect effect to be removed from its predecessor and successor in the chain, 
        // and connect the predecessor and successor together. 
        const prev = this.effectChain[index-1];
        const effect = this._effectChain[index];
        const next = this.effectChain[index+1];
        prev.disconnect(effect);
        effect.disconnect(next);
        prev.connect(next);

        this.effectChain = this.effectChain.filter(node => node !== effect);
    }

    _updateInstrumentInEffectChain(newInstrument) {
        const oldInstrument = this.effectChain[0];
        const nextNode = this.effectChain[1];
        oldInstrument.disconnect(nextNode);
        newInstrument.connect(nextNode);
        this.effectChain = [
            newInstrument,
            ...this.effectChain.slice(1)
        ];
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
