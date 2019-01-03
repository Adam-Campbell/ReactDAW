import Tone from 'tone';
import { isEqual, isEqualWith, differenceWith, intersectionWith } from 'lodash';

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
        console.log(`section contstructor called with id ${id} and start ${start}`);
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

    reconcile(prev=[], curr) {
        console.log('prev notes are: ', prev);
        console.log('curr notes are: ', curr);
        if (isEqual(prev, curr)) {
            return this;
        }

        // Will return the notes that are only in prev state and therefore need to be removed.
        const notesToRemove = differenceWith(prev, curr, (a, b) => a._id === b._id);
        // Will return the channels that are only in curr state and therefore need to be added.
        const notesToAdd = differenceWith(curr, prev, (a, b) => a._id === b._id);
        
        // remove the necessary notes
        notesToRemove.forEach(noteData => this.removeNote(noteData._id));

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
        const noteRef = this.noteStore[noteId];
        if (noteRef) {
            this._part.remove(noteRef.time, noteRef);
            delete this.noteStore[noteId];
        } 
    }


    delete() {
        this._part.dispose();
    }

}




