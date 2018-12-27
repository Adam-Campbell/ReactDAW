import Tone from 'tone';
import { drumSampleURLs } from '../../constants';

/*
TODO:::

Look into adding an audio node as a member of this class, and all of the individual Players
that are used for each drum are permanently connected to that audio node. Then in my connect and
disconnect methods I can just connect and disconnect that one audio node, rather than having to
manually connect and disconnect each Player seperately. 

Also potentiallu look at exporting some methods into a util file. At the very least move the createPitchesArray
function from the PianoRollUtils file into the sharedUtils file, and then for this class instead of having 
createPitchesArray as a class method just import from sharedUtils. 

*/

class DrumKit {
    constructor() {
        
        this.drums = {
            kick: new Tone.Player(drumSampleURLs.kick001),
            snare: new Tone.Player(drumSampleURLs.snare001),
            clap: new Tone.Player(drumSampleURLs.clap001),
            closedHat: new Tone.Player(drumSampleURLs.closedHat001),
            openHat: new Tone.Player(drumSampleURLs.openHat001),
            crash: new Tone.Player(drumSampleURLs.crash001),
            ride: new Tone.Player(drumSampleURLs.ride001),
            highTom: new Tone.Player(drumSampleURLs.highTom001),
            midTom: new Tone.Player(drumSampleURLs.midTom001),
            lowTom: new Tone.Player(drumSampleURLs.lowTom001),
            fx: new Tone.Player(drumSampleURLs.fx001)
        };
        this.drums.kick.retrigger = true;
        this.drums.snare.retrigger = true;
        this.drums.clap.retrigger = true;
        this.drums.closedHat.retrigger = true;
        this.drums.openHat.retrigger = true;
        this.drums.crash.retrigger = true;
        this.drums.ride.retrigger = true;
        this.drums.highTom.retrigger = true;
        this.drums.midTom.retrigger = true;
        this.drums.lowTom.retrigger = true;
        this.drums.fx.retrigger = true;
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

    /**
     * Takes in a number between 0 and 10 (inclusive), and returns a corresponding string representing
     * one of the drum types.
     * @param {number} indexValue
     * @returns {string} drum type string 
     */
    mapIndexValueToDrumString(indexValue) {
        switch (indexValue) {
            case 0:
                return 'kick';
            case 1: 
                return 'snare';
            case 2:
                return 'clap';
            case 3:
                return 'closedHat';
            case 4:
                return 'openHat';
            case 5:
                return 'crash';
            case 6:
                return 'ride';
            case 7:
                return 'highTom';
            case 8:
                return 'midTom';
            case 9:
                return 'lowTom';
            case 10:
                return 'fx';
            default:
                return 'kick';
        }
    }

    /**
     * Takes the pitch of a note and maps it to a drum type.
     * @param {string} pitch - a note pitch
     * @returns {string} the drum type string
     */
    convertPitchToDrum(pitch) {
        const pitchIndex = this.pitchesArray.indexOf(pitch);
        const adjustedIndex = pitchIndex % 11;
        const drumString = this.mapIndexValueToDrumString(adjustedIndex);
        return drumString; 
    }

    /**
     * Mimics the triggerAttackRelease methods on the various instrument classes in the Tone library. 
     * Enables other parts of the program to treat this class the same as any of the Tone instrument 
     * classes. Note that duration and velocity are not required by this class, they are merely passed
     * in so that other parts of the program can call this triggerAttackRelease method the same as they
     * would on any other instrument class. 
     * @param {string} pitch - 'C5' 
     * @param {string} duration - '0:1:0' 
     * @param {string} time - '0:1:0' 
     * @param {number} velocity - 1 
     */
    triggerAttackRelease(pitch, duration, time, velocity) {
        const drum = this.convertPitchToDrum(pitch);
        this.drums[drum].start(time);
    }

    /**
     * Updates the sample loaded into one of the drums. 
     * @param {string} drum - the drum to update
     * @param {string} newSampleURL - the new sample to update it with
     */
    updateSample(drum, newSampleURL) {
        this.drums[drum].load(newSampleURL);
    }

    /**
     * Analagous to the connect method on any of the Tone instrument classes.
     * @param {object} node - a valid node that can accept connections 
     */
    connect(node) {
        for (let key in this.drums) {
            this.drums[key].connect(node);
        }
    }

    /**
     * Analagous to the disconnect method on any of the Tone instrument classes.
     * @param {object} node - a valid node that can accept connections 
     */
    disconnect(node) {
        for (let key in this.drums) {
            this.drums[key].disconnect(node);
        }
    }

    /**
     * Analagous to the set method on any of the Tone instrument classes.
     * @param {object} data - the new data to update the DrumKit with.
     */
    set(data) {
        for (let key in data) {
            this.updateSample(key, data[key]);
        }
    }
}

export default DrumKit;