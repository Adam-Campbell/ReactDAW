export const synthTypes = {
    default: 'synth',
    am: 'amSynth',
    fm: 'fmSynth',
    duo: 'duoSynth',
    mono: 'monoSynth'
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
        frequency: 440,
        mute: false,
        phase: 0,
        type: 'triangle',
        volume: 0
    },
    portamento: 0,
    volume: 0
}