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
        const effect = new Tone.AutoFilter();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createBitCrusher(data) {
        const effect = new Tone.BitCrusher();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createChorus(data) {
        const effect = new Tone.Chorus();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createCompressor(data) {
        const effect = new Tone.Compressor();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createDistortion(data) {
        const effect = new Tone.Distortion();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createEQ3(data) {
        const effect = new Tone.EQ3();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createFeedbackDelay(data) {
        const effect = new Tone.FeedbackDelay();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createFilter(data) {
        const effect = new Tone.Filter();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createFreeverb(data) {
        const effect = new Tone.Freeverb();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createGate(data) {
        const effect = new Tone.Gate();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createJCReverb(data) {
        const effect = new Tone.JCReverb();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createLFO(data) {
        const effect = new Tone.LFO();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createLimiter(data) {
        const effect = new Tone.Limiter();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createMultibandCompressor(data) {
        const effect = new Tone.MultibandCompressor();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createPhaser(data) {
        const effect = new Tone.Phaser();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createPingPongDelay(data) {
        const effect = new Tone.PingPongDelay();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createPitchShift(data) {
        const effect = new Tone.PitchShift();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createTremolo(data) {
        const effect = new Tone.Tremolo();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

    _createVibrato(data) {
        const effect = new Tone.Vibrato();
        if (data) {
            effect.set(data);
        }
        return effect;
    }

}

export default EffectFactory;