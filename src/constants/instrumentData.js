// export const drumSampleURLs = {
//     kick001: 'drum-samples/kicks/kick_001.mp3',
//     kick002: 'drum-samples/kicks/kick_002.mp3',
//     kick003: 'drum-samples/kicks/kick_003.mp3',
//     kick004: 'drum-samples/kicks/kick_004.mp3',
//     kick005: 'drum-samples/kicks/kick_005.mp3',
//     kick006: 'drum-samples/kicks/kick_006.mp3',
//     kick007: 'drum-samples/kicks/kick_007.mp3',
//     kick008: 'drum-samples/kicks/kick_008.mp3',
//     kick009: 'drum-samples/kicks/kick_009.mp3',
//     kick010: 'drum-samples/kicks/kick_010.mp3',
//     snare001: 'drum-samples/snares/snare_001.mp3',
//     snare002: 'drum-samples/snares/snare_002.mp3',
//     snare003: 'drum-samples/snares/snare_003.mp3',
//     snare004: 'drum-samples/snares/snare_004.mp3',
//     snare005: 'drum-samples/snares/snare_005.mp3',
//     snare006: 'drum-samples/snares/snare_006.mp3',
//     snare007: 'drum-samples/snares/snare_007.mp3',
//     clap001: 'drum-samples/claps/clap_001.mp3',
//     clap002: 'drum-samples/claps/clap_002.mp3',
//     clap003: 'drum-samples/claps/clap_003.mp3',
//     clap004: 'drum-samples/claps/clap_004.mp3',
//     closedHat001: 'drum-samples/closed-hats/closed-hat_001.mp3',
//     closedHat002: 'drum-samples/closed-hats/closed-hat_002.mp3',
//     closedHat003: 'drum-samples/closed-hats/closed-hat_003.mp3',
//     closedHat004: 'drum-samples/closed-hats/closed-hat_004.mp3',
//     closedHat005: 'drum-samples/closed-hats/closed-hat_005.mp3',
//     closedHat006: 'drum-samples/closed-hats/closed-hat_006.mp3',
//     openHat001: 'drum-samples/open-hats/open-hat_001.mp3',
//     openHat002: 'drum-samples/open-hats/open-hat_002.mp3',
//     openHat003: 'drum-samples/open-hats/open-hat_003.mp3',
//     openHat004: 'drum-samples/open-hats/open-hat_004.mp3',
//     openHat005: 'drum-samples/open-hats/open-hat_005.mp3',
//     crash001: 'drum-samples/crashes/crash_001.mp3',
//     crash002: 'drum-samples/crashes/crash_002.mp3',
//     crash003: 'drum-samples/crashes/crash_003.mp3',
//     crash004: 'drum-samples/crashes/crash_004.mp3',
//     ride001: 'drum-samples/rides/ride_001.mp3',
//     ride002: 'drum-samples/rides/ride_002.mp3',
//     ride003: 'drum-samples/rides/ride_003.mp3',
//     highTom001: 'drum-samples/high-toms/high-tom_001.mp3',
//     highTom002: 'drum-samples/high-toms/high-tom_002.mp3',
//     highTom003: 'drum-samples/high-toms/high-tom_003.mp3',
//     midTom001: 'drum-samples/mid-toms/mid-tom_001.mp3',
//     midTom002: 'drum-samples/mid-toms/mid-tom_002.mp3',
//     midTom003: 'drum-samples/mid-toms/mid-tom_003.mp3',
//     lowTom001: 'drum-samples/low-toms/low-tom_001.mp3',
//     lowTom002: 'drum-samples/low-toms/low-tom_002.mp3',
//     fx001: 'drum-samples/fx/fx_001.mp3',
//     fx002: 'drum-samples/fx/fx_002.mp3',
//     fx003: 'drum-samples/fx/fx_003.mp3',
//     fx004: 'drum-samples/fx/fx_004.mp3'
// };

import drumSampleURLs from '../soundFiles';

export const instrumentData = {
    synth: {
        envelope: {
            attack: 0.005,
            attackCurve: 'linear',
            decay: 0.1,
            release: 1,
            releaseCurve: 'exponential',
            sustain: 0.3
        },
        oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'triangle',
            volume: 0
        },
        portamento: 0,
        volume: 0
    },
    amSynth: {
        detune: 0,
        envelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0.01,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
        },
        harmonicity: 3,
        modulation: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'square',
            volume: 0
        },
        modulationEnvelope: {
            attack: 0.5,
            attackCurve: 'linear',
            decay: 0,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
        },
        oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'triangle',
            volume: 0
        },
        portamento: 0,
        volume: 0
    },
    fmSynth: {
        detune: 0,
        envelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0.01,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
        },
        harmonicity: 3,
        modulation: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'square',
            volume: 0
        },
        modulationEnvelope: {
            attack: 0.5,
            attackCurve: 'linear',
            decay: 0,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
        },
        modulationIndex: 10,
        oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'triangle',
            volume: 0
        },
        portamento: 0,
        volume: 0
    },
    duoSynth: {
        harmonicity: 1.5,
        portamento: 0,
        vibratoAmount: 0.5,
        vibratoRate: 5,
        voice0: {
            detune: 0,
            envelope: {
                attack: 0.01,
                attackCurve: 'linear',
                decay: 0,
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
            },
            filter: {
                Q: 6,
                frequency: 350,
                gain: 0,
                rolloff: -24,
                type: 'lowpass'
            },
            filterEnvelope: {
                attack: 0.01,
                attackCurve: 'linear',
                baseFrequency: 200,
                decay: 0,
                exponent: 2,
                octaves: 7,
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
            },
            oscillator: {
                detune: 0,
                mute: false,
                phase: 0,
                type: 'sine',
                volume: 0
            },
            portamento: 0,
            volume: -9.999999999999998
        },
        voice1: {
            detune: 0,
            envelope: {
                attack: 0.01,
                attackCurve: 'linear',
                decay: 0,
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
            },
            filter: {
                Q: 6,
                frequency: 350,
                gain: 0,
                rolloff: -24,
                type: 'lowpass'
            },
            filterEnvelope: {
                attack: 0.01,
                attackCurve: 'linear',
                baseFrequency: 200,
                decay: 0,
                exponent: 2,
                octaves: 7,
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
            },
            oscillator: {
                detune: 0,
                mute: false,
                phase: 0,
                type: 'sine',
                volume: 0
            },
            portamento: 0,
            volume: -9.999999999999998
        },
        volume: 0
    },
    monoSynth: {
        detune: 0,
        envelope: {
            attack: 0.005,
            attackCurve: 'linear',
            decay: 0.1,
            release: 1,
            releaseCurve: 'exponential',
            sustain: 0.9
        },
        filter: {
            Q: 6,
            frequency: 350,
            gain: 0,
            rolloff: -24,
            type: 'lowpass'
        },
        filterEnvelope: {
            attack: 0.06,
            attackCurve: 'linear',
            baseFrequency: 200,
            decay: 0.2,
            exponent: 2,
            octaves: 7,
            release: 2,
            releaseCurve: 'exponential',
            sustain: 0.5
        },
        oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'square',
            volume: 0
        },
        portamento: 0,
        volume: 0
    },
    drumKit: {
        kick: {
            sample: drumSampleURLs.kick001,
            volume: 0,
            pan: 0
        },
        snare: {
            sample: drumSampleURLs.snare001,
            volume: 0,
            pan: 0
        },
        openHat: {
            sample: drumSampleURLs.openHat001,
            volume: 0,
            pan: 0
        },
        closedHat: {
            sample: drumSampleURLs.closedHat001,
            volume: 0,
            pan: 0
        },
        clap: {
            sample: drumSampleURLs.clap001,
            volume: 0,
            pan: 0
        },
        crash: {
            sample: drumSampleURLs.crash001,
            volume: 0,
            pan: 0
        },
        ride: {
            sample: drumSampleURLs.ride001,
            volume: 0,
            pan: 0
        },
        highTom: {
            sample: drumSampleURLs.highTom001,
            volume: 0,
            pan: 0
        },
        midTom: {
            sample: drumSampleURLs.midTom001,
            volume: 0,
            pan: 0
        },
        lowTom: {
            sample: drumSampleURLs.lowTom001,
            volume: 0,
            pan: 0
        },
        fx: {
            sample: drumSampleURLs.fx001,
            volume: 0,
            pan: 0
        }
    }
};
