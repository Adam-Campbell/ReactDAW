import Tone from 'tone';

class DrumKit {
    constructor() {
        this.kick = new Tone.Player('https://tonejs.github.io/examples/audio/505/kick.mp3').toMaster();
        this.kick.retrigger = true;
        this.snare = new Tone.Player('https://tonejs.github.io/examples/audio/505/snare.mp3').toMaster();
        this.snare.retrigger = true;
        this.hat = new Tone.Player('https://tonejs.github.io/examples/audio/505/hh.mp3').toMaster();
        this.hat.retrigger = true;
        this.pitchesArray = this.createPitchesArray();
    }

    createPitchesArray() {
        const onlyNotes = ['B', 'A#', 'A','G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];
        const onlyOctaves = ['8', '7', '6', '5', '4', '3', '2', '1', '0'];
        let pitchesArray = [];
        for (let octave of onlyOctaves) {
            for (let note of onlyNotes) {
                pitchesArray.push(note + octave);
            }
        }
        return pitchesArray;
    }

    mapIndexValueToDrumString(indexValue) {
        switch (indexValue) {
            case 0:
                return 'kick';
            case 1: 
                return 'snare';
            case 2:
                return 'hat';
            default:
                return 'kick';
        }
    }

    convertPitchToDrum(pitch) {
        const pitchIndex = this.pitchesArray.indexOf(pitch);
        const adjustedIndex = pitchIndex % 3;
        const drumString = this.mapIndexValueToDrumString(adjustedIndex);
        return drumString; 
    }

    triggerAttackRelease(pitch, duration, time, velocity) {
        const drum = this.convertPitchToDrum(pitch);
        this[drum].start(time);
    }

    updateSample(drum, newSampleURL) {
        this[drum].load(newSampleURL);
    }

    connect(node) {
        this.kick.connect(node);
        this.snare.connect(node);
        this.hat.connect(node);
    }

    disconnect(node) {
        this.kick.disconnect(node);
        this.snare.disconnect(node);
        this.hat.disconnect(node);
    }

    set(data) {
        // just a temp noop
    }

    // set(data) {
    //     for (let key in data) {
    //         this.updateSample(key, data[key]);
    //     }
    // }
}

export default DrumKit;