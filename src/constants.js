export const UIColors = {
    deepPurple: '#201826',
    lightPurple: '#47426c',
    pink: '#d86597',
    offWhite: '#e0e0e0',
    brightBlue: '#00bff3',
    brightYellow: '#f4ab54',
    brightRed: '#e23340',
    brightGreen: '#25e452',
    darkGrey: '#222222'
};

export const modalTypes = {
    open: 'Open',
    saveAs: 'Save As',
    help: 'help'
}

export const instrumentTypes = {
    default: 'synth',
    am: 'amSynth',
    fm: 'fmSynth',
    duo: 'duoSynth',
    mono: 'monoSynth',
    drumKit: 'drumKit'
};

export const effectTypes = {
    autoFilter: 'autoFilter',
    bitCrusher: 'bitCrusher',
    chorus: 'chorus',
    compressor: 'compressor',
    distortion: 'distortion',
    eq3: 'eq3',
    feedbackDelay: 'feedbackDelay',
    filter: 'filter',
    freeverb: 'freeverb',
    gate: 'gate',
    jcReverb: 'jcReverb',
    lfo: 'lfo',
    limiter: 'limiter',
    multibandCompressor: 'multibandCompressor',
    phaser: 'phaser',
    pingPongDelay: 'pingPongDelay',
    pitchShift: 'pitchShift',
    tremolo: 'tremolo',
    vibrato: 'vibrato'
};

export const defaultSynthData = {
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
}

export const drumSampleURLs = {
    kick001: 'drum-samples/kicks/kick_001.wav',
    kick002: 'drum-samples/kicks/kick_002.wav',
    kick003: 'drum-samples/kicks/kick_003.wav',
    kick004: 'drum-samples/kicks/kick_004.wav',
    kick005: 'drum-samples/kicks/kick_005.wav',
    kick006: 'drum-samples/kicks/kick_006.wav',
    kick007: 'drum-samples/kicks/kick_007.wav',
    kick008: 'drum-samples/kicks/kick_008.wav',
    kick009: 'drum-samples/kicks/kick_009.wav',
    kick010: 'drum-samples/kicks/kick_010.wav',
    kick011: 'drum-samples/kicks/kick_011.wav',
    kick012: 'drum-samples/kicks/kick_012.wav',
    kick013: 'drum-samples/kicks/kick_013.wav',
    kick014: 'drum-samples/kicks/kick_014.wav',
    kick015: 'drum-samples/kicks/kick_015.wav',
    kick016: 'drum-samples/kicks/kick_016.wav',
    kick017: 'drum-samples/kicks/kick_017.wav',
    kick018: 'drum-samples/kicks/kick_018.wav',
    kick019: 'drum-samples/kicks/kick_019.wav',
    kick020: 'drum-samples/kicks/kick_020.wav',
    snare001: 'drum-samples/snares/snare_001.wav',
    snare002: 'drum-samples/snares/snare_002.wav',
    snare003: 'drum-samples/snares/snare_003.wav',
    snare004: 'drum-samples/snares/snare_004.wav',
    snare005: 'drum-samples/snares/snare_005.wav',
    snare006: 'drum-samples/snares/snare_006.wav',
    snare007: 'drum-samples/snares/snare_007.wav',
    snare008: 'drum-samples/snares/snare_008.wav',
    snare009: 'drum-samples/snares/snare_009.wav',
    snare010: 'drum-samples/snares/snare_010.wav',
    snare011: 'drum-samples/snares/snare_011.wav',
    snare012: 'drum-samples/snares/snare_012.wav',
    snare013: 'drum-samples/snares/snare_013.wav',
    snare014: 'drum-samples/snares/snare_014.wav',
    snare015: 'drum-samples/snares/snare_015.wav',
    snare016: 'drum-samples/snares/snare_016.wav',
    snare017: 'drum-samples/snares/snare_017.wav',
    snare018: 'drum-samples/snares/snare_018.wav',
    snare019: 'drum-samples/snares/snare_019.wav',
    snare020: 'drum-samples/snares/snare_020.wav',
    snare021: 'drum-samples/snares/snare_021.wav',
    snare022: 'drum-samples/snares/snare_022.wav',
    clap001: 'drum-samples/claps/clap_001.wav',
    clap002: 'drum-samples/claps/clap_002.wav',
    clap003: 'drum-samples/claps/clap_003.wav',
    clap004: 'drum-samples/claps/clap_004.wav',
    clap005: 'drum-samples/claps/clap_005.wav',
    clap006: 'drum-samples/claps/clap_006.wav',
    clap007: 'drum-samples/claps/clap_007.wav',
    clap008: 'drum-samples/claps/clap_008.wav',
    clap009: 'drum-samples/claps/clap_009.wav',
    clap010: 'drum-samples/claps/clap_010.wav',
    closedHat001: 'drum-samples/closed-hats/closed-hat_001.wav',
    closedHat002: 'drum-samples/closed-hats/closed-hat_002.wav',
    closedHat003: 'drum-samples/closed-hats/closed-hat_003.wav',
    closedHat004: 'drum-samples/closed-hats/closed-hat_004.wav',
    closedHat005: 'drum-samples/closed-hats/closed-hat_005.wav',
    closedHat006: 'drum-samples/closed-hats/closed-hat_006.wav',
    closedHat007: 'drum-samples/closed-hats/closed-hat_007.wav',
    closedHat008: 'drum-samples/closed-hats/closed-hat_008.wav',
    closedHat009: 'drum-samples/closed-hats/closed-hat_009.wav',
    closedHat010: 'drum-samples/closed-hats/closed-hat_010.wav',
    closedHat011: 'drum-samples/closed-hats/closed-hat_011.wav',
    closedHat012: 'drum-samples/closed-hats/closed-hat_012.wav',
    closedHat013: 'drum-samples/closed-hats/closed-hat_013.wav',
    closedHat014: 'drum-samples/closed-hats/closed-hat_014.wav',
    closedHat015: 'drum-samples/closed-hats/closed-hat_015.wav',
    closedHat016: 'drum-samples/closed-hats/closed-hat_016.wav',
    openHat001: 'drum-samples/open-hats/open-hat_001.wav',
    openHat002: 'drum-samples/open-hats/open-hat_002.wav',
    openHat003: 'drum-samples/open-hats/open-hat_003.wav',
    openHat004: 'drum-samples/open-hats/open-hat_004.wav',
    openHat005: 'drum-samples/open-hats/open-hat_005.wav',
    openHat006: 'drum-samples/open-hats/open-hat_006.wav',
    openHat007: 'drum-samples/open-hats/open-hat_007.wav',
    openHat008: 'drum-samples/open-hats/open-hat_008.wav',
    openHat009: 'drum-samples/open-hats/open-hat_009.wav',
    crash001: 'drum-samples/crashes/crash_001.wav',
    crash002: 'drum-samples/crashes/crash_002.wav',
    crash003: 'drum-samples/crashes/crash_003.wav',
    crash004: 'drum-samples/crashes/crash_004.wav',
    crash005: 'drum-samples/crashes/crash_005.wav',
    ride001: 'drum-samples/rides/ride_001.wav',
    ride002: 'drum-samples/rides/ride_002.wav',
    ride003: 'drum-samples/rides/ride_003.wav',
    ride004: 'drum-samples/rides/ride_004.wav',
    ride005: 'drum-samples/rides/ride_005.wav',
    ride006: 'drum-samples/rides/ride_006.wav',
    ride007: 'drum-samples/rides/ride_007.wav',
    highTom001: 'drum-samples/high-toms/high-tom_001.wav',
    highTom002: 'drum-samples/high-toms/high-tom_002.wav',
    highTom003: 'drum-samples/high-toms/high-tom_003.wav',
    highTom004: 'drum-samples/high-toms/high-tom_004.wav',
    highTom005: 'drum-samples/high-toms/high-tom_005.wav',
    midTom001: 'drum-samples/mid-toms/mid-tom_001.wav',
    midTom002: 'drum-samples/mid-toms/mid-tom_002.wav',
    midTom003: 'drum-samples/mid-toms/mid-tom_003.wav',
    midTom004: 'drum-samples/mid-toms/mid-tom_004.wav',
    midTom005: 'drum-samples/mid-toms/mid-tom_005.wav',
    midTom006: 'drum-samples/mid-toms/mid-tom_006.wav',
    lowTom001: 'drum-samples/low-toms/low-tom_001.wav',
    lowTom002: 'drum-samples/low-toms/low-tom_002.wav',
    lowTom003: 'drum-samples/low-toms/low-tom_003.wav',
    lowTom004: 'drum-samples/low-toms/low-tom_004.wav',
    lowTom005: 'drum-samples/low-toms/low-tom_005.wav',
    fx001: 'drum-samples/fx/fx_001.wav',
    fx002: 'drum-samples/fx/fx_002.wav',
    fx003: 'drum-samples/fx/fx_003.wav',
    fx004: 'drum-samples/fx/fx_004.wav',
    fx005: 'drum-samples/fx/fx_005.wav',
    fx006: 'drum-samples/fx/fx_006.wav',
    fx007: 'drum-samples/fx/fx_007.wav',
    fx008: 'drum-samples/fx/fx_008.wav',
};

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


export const effectData = {
    autoFilter: {
        baseFrequency: 200,
        depth: 1,
        filter: {
            Q: 1,
            gain: 0,
            rolloff: -12,
            type: 'lowpass'
        },
        frequency: 1,
        octaves: 2.6,
        type: 'sine',
        wet: 1
    },
    bitCrusher: {
        bits: 4,
        wet: 1
    },
    chorus: {
        delayTime: 3.5,
        depth: 0.7,
        frequency: 1.5,
        spread: 180,
        type: 'sine',
        wet: 1
    },
    compressor: {
        attack: 0.003,
        knee: 30,
        ratio: 12,
        release: 0.25,
        threshold: -24
    },
    distortion: {
        distortion: 0.4,
        oversample: 'none',
        wet: 1
    },
    eq3: {
        high: 0,
        highFrequency: 2500,
        low: 0,
        lowFrequency: 400,
        mid: 0
    },
    feedbackDelay: {
        delayTime: '8n',
        feedback: 0.125,
        wet: 1
    },
    filter: {
        Q: 1,
        frequency: 350,
        gain: 0,
        rolloff: -12,
        type: 'lowpass'
    },
    freeverb: {
        dampening: 3000,
        roomSize: 0.7,
        wet: 1
    },
    gate: {
        attack: 0.1, 
        release: 0.1,
        threshold: -39.99999999999999
    },
    jcReverb: {
        roomSize: 0.5,
        wet: 1,
    },
    lfo: {
        amplitude: 1,
        frequency: 2,
        max: 1,
        min: 0,
        phase: 0,
        type: 'sine',
        units: 'number'
    },
    limiter: {
        threshold: -12
    },
    multibandCompressor: {
        high: {
            attack: 0.003,
            knee: 30,
            ratio: 12,
            release: 0.25,
            threshold: -24
        },
        highFrequency: 2500,
        low: {
            attack: 0.003,
            knee: 30,
            ratio: 12,
            release: 0.25,
            threshold: -24
        },
        lowFrequency: 400,
        mid: {
            attack: 0.003,
            knee: 30,
            ratio: 12,
            release: 0.25,
            threshold: -24
        }
    },
    phaser: {
        Q: 10,
        baseFrequency: 350,
        frequency: 0.5,
        octaves: 3,
        wet: 1
    },
    pingPongDelay: {
        delayTime: 0.25,
        wet: 1
    },
    pitchShift: {
        delayTime: 0,
        feedBack: 0,
        pitch: 0,
        wet: 1,
        windowSize: 0.1
    },
    tremolo: {
        depth: 0.5,
        frequency: 10,
        spread: 180,
        type: 'sine',
        wet: 1
    },
    vibrato: {
        depth: 0.1,
        frequency: 5,
        type: 'sine',
        wet: 1
    }
}
