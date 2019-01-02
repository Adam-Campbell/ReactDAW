import Tone from 'tone';
import { drumSampleURLs } from '../../constants';

class Drum {
    constructor(sampleUrl) {
        /*
            need to add the members:
            player - new Tone.Player()
            volume - new Tone.Volume()
            panner - new Tone.Panner()
        */
        this.playerNode = new Tone.Player(sampleUrl);
        this.pannerNode = new Tone.Panner();
        this.volumeNode = new Tone.Volume();
        this.playerNode.connect(this.pannerNode);
        this.pannerNode.connect(this.volumeNode);
        this.playerNode.retrigger = true;
    }

    /**
     * Takes a velocity value and maps it to a corresponding decibel level. Although this method is very simple
     * at the moment it will likely become more complex in future, which is why it has been split into its own
     * method. 
     * @param {number} velocity - a number between 0 and 1 (inclusive) 
     */
    getVolumeFromVelocity(velocity) {
        return velocity * 80 - 80;
    }

    /**
     * Triggers a hit on this drum using the time and velocity given, velocity is converted into a decibel
     * value for the playerNode to use.
     * @param {string} time 
     * @param {number} velocity 
     */
    triggerHit(time, velocity=1) {
        const volumeValue = this.getVolumeFromVelocity(velocity);
        this.playerNode.volume.setValueAtTime(volumeValue, time);
        this.playerNode.start(time);
    }

    /**
     * Will accept the data corresponding to this drum - the sample, volume and panning.
     * @param {object} data 
     */
    set(data) {
        this.playerNode.load(data.sample);
        this.volumeNode.volume.value = data.volume;
        this.pannerNode.pan.value = data.pan;
    }

    /**
     * Analagous to the connect method used on other Tone classes.
     * @param {object} node - any instance of a class that can be connected to
     */
    connect(node) {
        this.volumeNode.connect(node);
        return this;
    }
}

export default Drum;