class Panner {
    constructor() {
        this.pan = {
            value: 0
        };
        this.connect = jest.fn();
        this.disconnect = jest.fn();
    }
}

export default Panner;