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
        this._instrument = new Tone.PolySynth(6, Tone.Synth);
        // Will hold any effects that are currently assigned to this channel.
        this._effectChain = [];
        // A store for holding key/value paris for any sections currently on this channel, where the
        // sections id is the key and an object holding the sections data is the value.
        this.sectionStore = {};
        // Create instances of InstrumentFactory and EffectFactory for the instantiation of instances of
        // the various instrument and effect classes.
        this._instrumentFactory = new InstrumentFactory();
        this._effectFactory = new EffectFactory();
        /* 
            Create dedicated Volume, Solo, Panner and Meter nodes for this channel instance, and connect 
            these nodes together. The complete chain for each channel is:
            instrument => anything in the effects chain => Volume => Meter => Solo => Panner => Master
        */
        this.volumeNode = new Tone.Volume();
        this.soloNode = new Tone.Solo();
        this.pannerNode = new Tone.Panner();
        this.meterNode = new Tone.Meter();
        this.volumeNode.connect(this.meterNode);
        this.meterNode.connect(this.soloNode)
        this.soloNode.connect(this.pannerNode);
        this.connectEffectChain();
        // Save references to the instrument and meter node stores, and add this channels instrument
        // and meter nodes to the stores.
        this.instrumentReferences = instrumentReferences;
        this.meterNodeReferences = meterNodeReferences;
        this.instrumentReferences[this.id] = this.instrument;
        this.meterNodeReferences[this.id] = this.meterNode;
    }

    /**
     * The main reconciliation method for this class, delegates to more specific reconciliation methods.
     * @param {object} prevState - the previous state
     * @param {object} currState - the current state
     * @returns {object} - a reference to this instance of the class, for the purposes of chaining.
     */
    reconcile(prevState=channelSkeletonData, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        this.reconcileInstrument(prev.instrument, curr.instrument);
        this.reconcileEffects(prev.effects, curr.effects);
        this.reconcileSections(prev.sections, curr.sections);
        this.reconcileChannelSettings(prev, curr);
        return this;
    }

    /**
     * Reconciles the instrument for the channel
     * @param {object} prevState - the previous state
     * @param {object} currState - the current state
     */
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

    /**
     * Reconcile the effects for this class
     * @param {array} prevState - the previous state
     * @param {array} currState - the current state
     */
    reconcileEffects(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
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

    /**
     * Reconcile this channels sections
     * @param {array} prevState - the previous state
     * @param {array} currState - the current state
     */
    reconcileSections(prevState, currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        if (isEqual(prev, curr)) {
            return;
        }
        // Sections that are in prev but not in curr are marked as sectionsToRemove
        const sectionsToRemove = differenceWith(prev, curr, (a, b) => a.id === b.id);
        // Sections that are in cur but not in prev are marked as sectionsToAdd
        const sectionsToAdd = differenceWith(curr, prev, (a, b) => a.id === b.id);
        // Sections that are in curr and prev potentially need to be updated. The version that is
        // stored in this variable is the version from curr - the version that the engine will need
        // to be in sync with.
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

    /**
     * Reconciles this channels settings - volume, pan, isMuted and isSolo.
     * @param {object} prevState - the previous state 
     * @param {object} currState - the current state
     */
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

    /**
     * Simple getter method the instrument instance currently assigned to this channel.
     * @returns {object} - the instrument instance.
     */
    get instrument() {
        return this._instrument;
    }

    /**
     * Sets the instrument property to a new instrument instance. Performs additional tasks that are
     * required - disconnects the old instrument instance and connects the new instance in its place, 
     * as well as looping through this channels sections and updating their instrument references to 
     * use the new instrument instance.
     * @param {object} instrument - the new instrument instance
     */
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

    /**
     *  A simple getter method for this channels effectChain
     * @returns {array} - the effect chain. 
     */
    get effectChain() {
        return this._effectChain;
    }

    /**
     * Disconnects the previous effects chain, replaces it with the new effects chain and then connects the
     * new effects chain.
     * @param {array} - the new effects chain
     */
    set effectChain(effectChain) {
        this.disconnectEffectChain();
        this._effectChain = effectChain;
        this.connectEffectChain();
    }

    /**
     * Operates on the subsection of this channels chain starting at the instrument instance and ending
     * at the Volume instance (not inclusive). Connects each node within that subsection to the node
     * directly after it. Also connects the Panner to the master. All nodes within the subsection of this
     * channels chain between the Volume and Panner are permanently connects and thus are not affected by
     * the connectEffectChain and disconnectEffectChain methods. For an overview of the complete chain see
     * the class constructor. 
     */
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

    /**
     * Operates on the same subsection of the chain as connectEffectChain, but instead of connecting 
     * each node to it successor it disconnects them.
     */
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

    /**
     * Set a new volume for this channel. 
     * @param {number} newVolume - the new volume to set the channel to
     */
    setVolume(newVolume) {
        this.volumeNode.volume.value = newVolume;
    }

    /**
     * Mute this channel. Will have no effect if the channel is already muted.
     */
    mute() {
        this.volumeNode.mute = true;
    }

    /**
     * Unmute this channel. Will have no effect if the channel is already unmuted.
     */
    unmute() {
        this.volumeNode.mute = false;
    }

    /**
     * Solo this channel. Will have no effect if the channel is already soloed.
     */
    solo() {
        this.soloNode.solo = true;
    }

    /**
     * Unsolo this channel. Will have no effect if the channel is already unsoloed. 
     */
    unsolo() {
        this.soloNode.solo = false;
    }

    /**
     * Set a new pan value for this channel.
     * @param {number} newPan - the new pan value
     */
    setPan(newPan) {
        this.pannerNode.pan.value = newPan;
    }
    
    /**
     * Adds a new section this channels sectionStore, and updates the sections instrument to the instrument
     * instance assigned to this channel.
     * @param {object} section  - the Section instance to add.
     */
    addSection(section) {
        if (!(section instanceof Section)) {
            throw new Error("You have tried to assign an invalid object as a channel section");
        }
        this.sectionStore[section._id] = section;
        section.instrument = this.instrument;
    }

    /**
     * Delete a section by calling the delete method on that section, as well as removing it from the
     * sectionStore.
     * @param {string} sectionId - the id of the section to delete.
     */
    deleteSection(sectionId) {
        const sectionToDelete = this.sectionStore[sectionId];
        sectionToDelete.delete();
        delete this.sectionStore[sectionId];
    }

    /**
     * Deletes all of this channels sections and disconnects the channels chain. 
     */
    deleteChannel() {
        for (let sectionKey in this.sectionStore) {
            this.deleteSection(sectionKey);
        }
        this.disconnectEffectChain();
    }

}

export default Channel;
