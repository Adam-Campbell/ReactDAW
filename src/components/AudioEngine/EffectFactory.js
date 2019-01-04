import Tone from 'tone';
import { effectTypes } from '../../constants';

class EffectFactory {

    create(effectType, data) {
        switch(effectType) {
            case effectTypes.autoFilter:
                return this._createAutoFilter(data);

            case effectTypes.bitCrusher:
                return this._createBitCrusher(data);

            case effectTypes.chorus:
                return this._createChorus(data);

            case effectTypes.compressor:
                return this._createCompressor(data);

            case effectTypes.distortion:
                return this._createDistortion(data);

            case effectTypes.eq3:
                return this._createEQ3(data);

            case effectTypes.feedbackDelay:
                return this._createFeedbackDelay(data);

            case effectTypes.filter:
                return this._createFilter(data);

            case effectTypes.freeverb:
                return this._createFreeverb(data);

            case effectTypes.gate:
                return this._createGate(data);

            case effectTypes.jcReverb:
                return this._createJCReverb(data);

            case effectTypes.lfo:
                return this._createLFO(data);

            case effectTypes.limiter:
                return this._createLimiter(data);

            case effectTypes.multibandCompressor:
                return this._createMultiBandCompressor(data);

            case effectTypes.phaser:
                return this._createPhaser(data);

            case effectTypes.pingPongDelay:
                return this._createPingPongDelay(data);

            case effectTypes.pitchShift:
                return this._createPitchShift(data);

            case effectTypes.tremolo:
                return this._createTremolo(data);

            case effectTypes.vibrato:
                return this._createVibrato(data);

            default:
                return new Tone.Effect(data);
        }
    }

    _createAutoFilter(data) {
        const effect = new Tone.AutoFilter(data);
        return effect;
    }

    _createBitCrusher(data) {
        const effect = new Tone.BitCrusher(data);
        return effect;
    }

    _createChorus(data) {
        const effect = new Tone.Chorus(data);
        return effect;
    }

    _createCompressor(data) {
        const effect = new Tone.Compressor(data);
        return effect;
    }

    _createDistortion(data) {
        const effect = new Tone.Distortion(data);
        return effect;
    }

    _createEQ3(data) {
        const effect = new Tone.EQ3(data);
        return effect;
    }

    _createFeedbackDelay(data) {
        const effect = new Tone.FeedbackDelay(data);
        return effect;
    }

    _createFilter(data) {
        const effect = new Tone.Filter(data);
        return effect;
    }

    _createFreeverb(data) {
        const effect = new Tone.Freeverb(data);
        return effect;
    }

    _createGate(data) {
        const effect = new Tone.Gate(data);
        return effect;
    }

    _createJCReverb(data) {
        const effect = new Tone.JCReverb(data);
        return effect;
    }

    _createLFO(data) {
        const effect = new Tone.LFO(data);
        return effect;
    }

    _createLimiter(data) {
        const effect = new Tone.Limiter(data);
        return effect;
    }

    _createMultibandCompressor(data) {
        const effect = new Tone.MultibandCompressor(data);
        return effect;
    }

    _createPhaser(data) {
        const effect = new Tone.Phaser(data);
        return effect;
    }

    _createPingPongDelay(data) {
        const effect = new Tone.PingPongDelay(data);
        return effect;
    }

    _createPitchShift(data) {
        const effect = new Tone.PitchShift(data);
        return effect;
    }

    _createTremolo(data) {
        const effect = new Tone.Tremolo(data);
        return effect;
    }

    _createVibrato(data) {
        const effect = new Tone.Vibrato(data);
        return effect;
    }

}

export default EffectFactory;