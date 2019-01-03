import Tone from 'tone';
import { differenceWith, cloneDeep } from 'lodash';

window.t = Tone.Transport;

const sectionSkeletonData = {
    channelId: '',
    id: '',
    notes: [],
    numberOfBars: 4,
    start: '0:0:0'
};

export default class Section {
    constructor(id, start) {
        //console.log(`section contstructor called with id ${id} and start ${start}`);
        this._part = new Tone.Part();
        this._id = id;
        this._instrument = new Tone.PolySynth(12, Tone.Synth);
        this._start = start || "0:0:0";
        this._part.start(this._start);
        this._part.callback = this._partCallback.bind(this);
        this.noteStore = {};
        // only temp
        //this._part.loop = true;
        //this._part.loopStart = "0:0:0";
        //this._part.loopEnd = "4:0:0";
    }

    reconcile(prevState=[], currState) {
        const prev = cloneDeep(prevState);
        const curr = cloneDeep(currState);
        // if (isEqual(prev, curr)) {
        //     return this;
        // }

        const notesToRemove = differenceWith(prev, curr, (a, b) => a._id === b._id);
        const notesToAdd = differenceWith(curr, prev, (a, b) => a._id === b._id);
        notesToRemove.forEach(noteData => this.removeNote(noteData._id));
        //console.log(prev, curr);

        // if (notesToAdd.length) {
        //     console.log(`section ${this._id} had a note added!`);
        //     console.log(prev, curr);
        // }

        // add the necessary notes
        notesToAdd.forEach(noteData => {
            this.addNote({
                note: noteData.pitch,
                time: noteData.time,
                duration: noteData.duration,
                id: noteData._id,
                velocity: noteData.velocity
            });
        });

        return this;
    }

    get start() {
        return this._start;
    }

    set start(newStartValue) {
        this._start = newStartValue;
        this._part.start(this._start);
    }

    get instrument() {
        return this._instrument;
    }

    set instrument(instrument) {
        this._instrument = instrument;
    }

    _partCallback(time, value) {
        this.instrument.triggerAttackRelease(value.note, value.duration, time, value.velocity);
    }

    addNote(noteData) {
        this._part.add(noteData);
        this.noteStore[noteData.id] = noteData;
    }

    removeNote(noteId) {
        console.log(`removeNote was called with noteId: ${noteId}`);
        const noteRef = this.noteStore[noteId];
        //console.log(noteRef);
        if (noteRef) {
            this._part.remove(noteRef.time, noteRef);
            delete this.noteStore[noteId];
        } 
    }


    delete() {
        this._part.dispose();
    }

}




