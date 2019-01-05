class PolySynth {
    constructor() {
        this.connect = jest.fn();
        this.disconnect = jest.fn();
        this.set = jest.fn();
        this.triggerAttackRelease = jest.fn();
    }
}

export default PolySynth;