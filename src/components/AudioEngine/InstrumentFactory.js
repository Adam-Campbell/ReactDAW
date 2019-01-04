import Tone from 'tone';
import { instrumentTypes } from '../../constants';
import DrumKit from './DrumKit';

class InstrumentFactory {

    create(instrumentType, data) {
        switch (instrumentType) {
            case instrumentTypes.default:
                return this._createSynth(data);

            case instrumentTypes.am:
                return this._createAMSynth(data);

            case instrumentTypes.fm:
                return this._createFMSynth(data);

            case instrumentTypes.duo:
                return this._createDuoSynth(data);

            case instrumentTypes.mono:
                return this._createMonoSynth(data);

            case instrumentTypes.drumKit:
                return this._createDrumKit(data);

            default:
                return new Tone.PolySynth(24, Tone.Synth);
        }
    }

    _createSynth(data) {
        const synth = new Tone.PolySynth(24, Tone.Synth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createAMSynth(data) {
        const synth = new Tone.PolySynth(24, Tone.AMSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createFMSynth(data) {
        const synth = new Tone.PolySynth(24, Tone.FMSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createDuoSynth(data) {
        const synth = new Tone.PolySynth(24, Tone.DuoSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createMonoSynth(data) {
        const synth = new Tone.PolySynth(24, Tone.MonoSynth);
        if (data) {
            synth.set(data);
        }
        return synth;
    }

    _createDrumKit(data) {
        const drumKit = new DrumKit();
        if (data) {
            drumKit.set(data);
        }
        return drumKit;
    }

}

export default InstrumentFactory;