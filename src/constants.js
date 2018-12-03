export const synthTypes = {
    default: 'synth',
    am: 'amSynth',
    fm: 'fmSynth',
    duo: 'duoSynth',
    mono: 'monoSynth'
};

export const UIColors = {
    deepPurple: '#201826',
    lightPurple: '#47426c',
    pink: '#d86597',
    offWhite: '#e0e0e0',
    brightBlue: '#00bff3',
    brightYellow: '#f4ab54',
    brightRed: '#e23340',
    brightGreen: '#25e452'
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

export const synthData = {
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
        delayTime: 0.25,
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