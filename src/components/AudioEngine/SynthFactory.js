import Tone from 'tone';
import { synthTypes } from '../../constants';

class SynthFactory {

    static listTypes() {
        console.log(`
            Synth types available are:
            Synth
            AM Synth
            FM Synth
            Duo Synth
            Mono Synth
        `);
    }

    create(synthType, data) {
        switch (synthType) {
            case synthTypes.default:
                return this._createSynth(data);

            case synthTypes.am:
                return this._createAMSynth(data);

            case synthTypes.fm:
                return this._createFMSynth(data);

            case synthTypes.duo:
                return this._createDuoSynth(data);

            case synthTypes.mono:
                return this._createMonoSynth(data);

            default:
                return new Tone.PolySynth(6, Tone.Synth);
        }
    }

    _createSynth(data) {
        console.log(data);
        const synth = new Tone.PolySynth(6, Tone.Synth);
        if (data) {
            synth.set(data);
        }
        return synth;
        // const synth = new Synth(data);
        // return synth;
    }

    _createAMSynth(data) {
        const synth = new Tone.PolySynth(6, Tone.AMSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createFMSynth(data) {
        const synth = new Tone.PolySynth(6, Tone.FMSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createDuoSynth(data) {
        const synth = new Tone.PolySynth(6, Tone.DuoSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createMonoSynth(data) {
        const synth = new Tone.PolySynth(6, Tone.MonoSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

}

export default SynthFactory;