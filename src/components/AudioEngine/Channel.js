import Tone from 'tone';
import Section from './Section';
import InstrumentFactory from './InstrumentFactory';
import EffectFactory from './EffectFactory';
import { 
    isEqual, 
    isEqualWith, 
    differenceWith, 
    intersectionWith,
    cloneDeep
} from 'lodash';

const channelSkeletonData = {
    id: '',
    effects: [],
    isMuted: false,
    isSolo: false,
    pan: 0,
    volume: 0,
    sections: [],
    instrument: {
        id: '',
        channelId: '',
        type: '',
        instrumentData: {}
    }
}

class Channel {
    constructor(channelId, instrumentReferences, meterNodeReferences) {
        this.id = channelId;
        this.volumeNode = new Tone.Volume();
        this.soloNode = new Tone.Solo();
        this.pannerNode = new Tone.Panner();
        this.meterNode = new Tone.Meter();
        this.volumeNode.connect(this.meterNode);
        this.meterNode.connect(this.soloNode)
        this.soloNode.connect(this.pannerNode);
        this._instrument = new Tone.PolySynth(6, Tone.Synth);
        this._effectChain = [];
        this.sectionStore = {};
        this._instrumentFactory = new InstrumentFactory();
        this._effectFactory = new EffectFactory();
        this.connectEffectChain();
        this.instrumentReferences = instrumentReferences;
        this.meterNodeReferences = meterNodeReferences;
        this.instrumentReferences[this.id] = this.instrument;
        this.meterNodeReferences[this.id] = this.meterNode;
    }

    reconcile(prevState=channelSkeletonData, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        this.reconcileInstrument(prev.instrument, curr.instrument);
        this.reconcileEffects(prev.effects, curr.effects);
        this.reconcileSections(prev.sections, curr.sections);
        this.reconcileChannelSettings(prev, curr);
        return this;
    }

    reconcileInstrument(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        // return early if nothing has changed
        if (isEqual(prev, curr)) {
            return this;
        }
        // if the id is the same just update the instrument to the new instrument settings
        if (prev.id === curr.id) {
            this.instrument.set(curr.instrumentData);
            // else remove the old instrument and build a new one
        } else {
            const newInstrument = this._instrumentFactory.create(curr.type, curr.instrumentData);
            this.instrument = newInstrument;
            this.instrumentReferences[this.id] = newInstrument;
        }
    }

    reconcileEffects(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        //console.log('prev effects: ', prev);
        //console.log('curr effects: ', curr);
        // if absolutely nothing has changed, just return early.
        if (isEqual(prev, curr)) {
            return;
        }
        // if only the settings of effects have changed, then just go through and update the settings for each
        // effect in the chain. 
        const onlySettingsHaveChanged = prev.length === curr.length && 
                                        isEqualWith(prev, curr, (a, b) => a.id === b.id);
        if (onlySettingsHaveChanged) {
            curr.forEach((effect, i) => {
                this.effectChain[i].set(effect.effectData);
            });
            // otherwise, replace the existing effectChain with a new one constructed using the data from curr. 
        } else {
            this.effectChain = curr.map(effect => {
                return this._effectFactory.create(
                    effect.type,
                    effect.effectData
                );
            });
        }
    }


    reconcileSections(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        if (isEqual(prev, curr)) {
            return;
        }
        // Will return the sections that are only in prev state and therefore need to be removed.
        const sectionsToRemove = differenceWith(prev, curr, (a, b) => a.id === b.id);
        // Will return the sections that are only in curr state and therefore need to be added.
        const sectionsToAdd = differenceWith(curr, prev, (a, b) => a.id === b.id);
        // Will return the sections that are in both the prev and curr states, and so potentially may
        // need to be updated. The section data included will be the data from the curr state, so the
        // data the engine needs to be in sync with. 
        const sectionsToPotentiallyUpdate = intersectionWith(curr, prev, (a, b) => a.id === b.id);

        // delete the necessary sections
        sectionsToRemove.forEach(sectionData => this.deleteSection(sectionData.id));

        // add the necessary sections
        sectionsToAdd.forEach(sectionData => {
            const newSection = new Section(sectionData.id, sectionData.start)
                                          .reconcile(undefined, sectionData.notes);
            this.addSection(newSection);
        });

        // update the necessary sections
        sectionsToPotentiallyUpdate.forEach(sectionData => {
            const prevSectionData = prev.find(el => el.id === sectionData.id);
            if (isEqual(prevSectionData, sectionData)) {
                return;
            } 
            const sectionInstance = this.sectionStore[sectionData.id];
            sectionInstance.reconcile(prevSectionData.notes, sectionData.notes);
        });
    }

    reconcileChannelSettings(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        if (prev.volume !== curr.volume) {
            this.setVolume(curr.volume);
        }
        if (prev.pan !== curr.pan) {
            this.setPan(curr.pan);
        }
        if (prev.isMuted !== curr.isMuted) {
            if (curr.isMuted) {
                this.mute();
            } else {
                this.unmute();
            }
        }
        if (prev.isSolo !== curr.isSolo) {
            if (curr.isSolo) {
                this.solo();
            } else {
                this.unsolo();
            }
        }
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
        //section.start = startTime;
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
