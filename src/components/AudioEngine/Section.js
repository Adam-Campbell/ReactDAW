import Tone from 'tone';

function generateId() {
    let str = '';
    for (let i = 0; i < 16; i++) {
        str += Math.floor(Math.random() * 10).toString();
    }
    return str;
} 

window.t = Tone.Transport;

export default class Section {
    constructor(id, start) {
        this._part = new Tone.Part();
        this._id = id;
        this._instrument = new Tone.PolySynth(12, Tone.Synth).toMaster();
        //window.i = this._instrument;
        this._start = start || "0:0:0";
        this._part.start(this._start);
        this._part.callback = this._partCallback.bind(this);
        this.noteStore = {};
        // only temp
        this._part.loop = true;
        this._part.loopStart = "0:0:0";
        this._part.loopEnd = "4:0:0";
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
        // if (!(instrument instanceof Tone.Instrument)) {
        //     throw new Error("You have tried to set the instrument on a Section with an invalid object");
        //     return;
        // }
        this._instrument = instrument;
    }

    _partCallback(time, value) {
        this.instrument.triggerAttackRelease(value.note, value.duration, time, value.velocity);
    }

    addNote(noteData) {
        //const canBeAdded = this._checkIfNoteIsValid(noteData);
        //console.log(noteData);
        this._part.add(noteData);
        this.noteStore[noteData.id] = noteData;
        //this.instrument.triggerAttackRelease(noteData.note, '8n');
        // if (canBeAdded) {
        //     //const id = generateId();
        //     //noteData.id = id;
        //     this._part.add(noteData);
        //     this.noteStore[noteData.id] = noteData;
        //     console.log('note successfully added');
        //     return Promise.resolve(noteData);
        // } else {
        //     console.log('note could not be added.');
        //     return Promise.reject(new Error('Note conflicts with existing notes'));
        // }
    }

    removeNote(noteId) {
        const noteRef = this.noteStore[noteId];
        if (noteRef) {
            this._part.remove(noteRef.time, noteRef);
            delete this.noteStore[noteId];
        }
        // const noteId = this.getNoteId(pitch, measure);
        // const noteRef = this.noteStore[noteId];
        // if (noteRef) {
        //     this._part.remove(noteRef.time, noteRef);
        //     delete this.noteStore[noteId];
        //     return Promise.resolve(noteRef);
        // } else {
        //     return Promise.reject(new Error("You have tried to delete a note that doesn't exist"));
        // }
    }

    /**
     * Given a pitch and measure, get the id of the note with that pitch and measure.
     * @param {String} pitch 
     * @param {String} measure 
     * @returns {String} the id of the note matching the criteria
     */
    getNoteId(pitch, measure) {
        for (let noteId in this.noteStore) {
            let note = this.noteStore[noteId];
            if (note.note === pitch && note.time === measure) {
                return noteId;
            } 
        }
    }

    /**
     * Converts a ToneJS time string (in the form '0:0:0') into a sixteenth note
     * based value.
     * @param {String} measure 
     */
    _convertTimeToSixteenths(time) {
        // 1st * 16, 2nd * 4, 3rd * 1
        let bars = parseInt(time.charAt(0)) * 16;
        let beats = parseInt(time.charAt(2)) * 4;
        let sixteenths = parseInt(time.charAt(4));
        return bars + beats + sixteenths;
    }

    /**
     * Convert a ToneJS duration string into a sixteenth note based value.
     * @param {String} duration 
     */
    _convertDurationToSixteenths(duration) {
        switch (duration) {
            case '16n':
                return 1;
            case '8n':
                return 2;
            case '4n':
                return 4;
            case '2n':
                return 8;
            case '1m':
                return 16;
        }
    }

    /**
     * Given a new note object, see if there are any conflicting notes already there which would 
     * prevent the new note from being properly added. Return true if no such notes are found and
     * the new note can be added, return false if such a note was found and the new note therefore
     * cannot be added.
     * @param {Object} noteToCheck - a note object
     * @returns {Boolean} - true if noteToCheck can be added, otherwise false. 
     */
    _checkIfNoteIsValid(noteToCheck) {
        const startOfNoteToCheck = this._convertTimeToSixteenths(noteToCheck.time);
        const endOfNoteToCheck = startOfNoteToCheck + this._convertDurationToSixteenths(noteToCheck.duration) - 1;
        for (let noteId in this.noteStore) {
            if (this.noteStore[noteId].note === noteToCheck.note) {
                let currentNote = this.noteStore[noteId];
                let startOfCurrentNote = this._convertTimeToSixteenths(currentNote.time);
                let endOfCurrentNote = startOfCurrentNote + this._convertDurationToSixteenths(currentNote.duration) - 1;
                if (startOfNoteToCheck >= startOfCurrentNote && startOfNoteToCheck <= endOfCurrentNote) {
                    return false;
                } else if (endOfNoteToCheck >= startOfCurrentNote && endOfNoteToCheck <= endOfCurrentNote) {
                    return false;
                } else if (startOfCurrentNote >= startOfNoteToCheck && startOfCurrentNote <= endOfNoteToCheck) {
                    return false;
                } else if (endOfCurrentNote >= startOfNoteToCheck && endOfCurrentNote <=endOfNoteToCheck) {
                    return false;
                }
            }
        }
        return true;
    }

    delete() {
        this._part.dispose();
        // clean up the other props as well.
    }

}




