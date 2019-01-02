import Tone from 'tone';
import Drum from './Drum';
import { drumSampleURLs } from '../../constants';
import { createPitchesArray } from '../../sharedUtils';

class DrumKit {
    constructor() {
        this.outputNode = new Tone.Volume();
        this.drums = {
            kick: new Drum(drumSampleURLs.kick001).connect(this.outputNode),
            snare: new Drum(drumSampleURLs.snare001).connect(this.outputNode),
            clap: new Drum(drumSampleURLs.clap001).connect(this.outputNode),
            closedHat: new Drum(drumSampleURLs.closedHat001).connect(this.outputNode),
            openHat: new Drum(drumSampleURLs.openHat001).connect(this.outputNode),
            crash: new Drum(drumSampleURLs.crash001).connect(this.outputNode),
            ride: new Drum(drumSampleURLs.ride001).connect(this.outputNode),
            highTom: new Drum(drumSampleURLs.highTom001).connect(this.outputNode),
            midTom: new Drum(drumSampleURLs.midTom001).connect(this.outputNode),
            lowTom: new Drum(drumSampleURLs.lowTom001).connect(this.outputNode),
            fx: new Drum(drumSampleURLs.fx001).connect(this.outputNode)
        };
        this.pitchesArray = createPitchesArray();
        window.drumPlayers = this.drums;
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
     * classes. Note that duration is not required by this class, it is merely passed in so that
     * other parts of the program can call this triggerAttackRelease method the same as they would
     * on any other instrument class. 
     * @param {string} pitch - 'C5' 
     * @param {string} duration - '0:1:0' 
     * @param {string} time - '0:1:0' 
     * @param {number} velocity - 1 
     */
    triggerAttackRelease(pitch, duration, time, velocity=1) {
        const drum = this.convertPitchToDrum(pitch);
        this.drums[drum].triggerHit(time, velocity);
    }

    /**
     * Analagous to the connect method on any of the Tone instrument classes.
     * @param {object} node - a valid node that can accept connections 
     */
    connect(node) {
        this.outputNode.connect(node);
    }

    /**
     * Analagous to the disconnect method on any of the Tone instrument classes.
     * @param {object} node - a valid node that can accept connections 
     */
    disconnect(node) {
        this.outputNode.disconnect(node);
    }

    /**
     * Analagous to the set method on any of the Tone instrument classes.
     * @param {object} data - the new data to update the DrumKit with.
     */
    set(data) {
        for (let key in data) {
            const drumData = data[key];
            this.drums[key].set(drumData);
        }
    }
}

export default DrumKit;