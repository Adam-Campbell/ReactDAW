import Tone from 'tone';
import { drumSampleURLs } from '../../constants';
import { createPitchesArray } from '../../sharedUtils';

class DrumKit {
    constructor() {
        this.outputNode = new Tone.Volume();
        this.drums = {
            kick: new Tone.Player(drumSampleURLs.kick001).connect(this.outputNode),
            snare: new Tone.Player(drumSampleURLs.snare001).connect(this.outputNode),
            clap: new Tone.Player(drumSampleURLs.clap001).connect(this.outputNode),
            closedHat: new Tone.Player(drumSampleURLs.closedHat001).connect(this.outputNode),
            openHat: new Tone.Player(drumSampleURLs.openHat001).connect(this.outputNode),
            crash: new Tone.Player(drumSampleURLs.crash001).connect(this.outputNode),
            ride: new Tone.Player(drumSampleURLs.ride001).connect(this.outputNode),
            highTom: new Tone.Player(drumSampleURLs.highTom001).connect(this.outputNode),
            midTom: new Tone.Player(drumSampleURLs.midTom001).connect(this.outputNode),
            lowTom: new Tone.Player(drumSampleURLs.lowTom001).connect(this.outputNode),
            fx: new Tone.Player(drumSampleURLs.fx001).connect(this.outputNode)
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
        this.pitchesArray = createPitchesArray();
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
        // for (let key in this.drums) {
        //     this.drums[key].connect(node);
        // }
        this.outputNode.connect(node);
    }

    /**
     * Analagous to the disconnect method on any of the Tone instrument classes.
     * @param {object} node - a valid node that can accept connections 
     */
    disconnect(node) {
        // for (let key in this.drums) {
        //     this.drums[key].disconnect(node);
        // }
        this.outputNode.disconnect(node);
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