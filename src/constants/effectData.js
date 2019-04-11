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
};
