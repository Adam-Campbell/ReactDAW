class Transport {
    constructor() {
        this.bpm = {
            value: 120
        }
        this.pause = jest.fn();
        this.start = jest.fn();
        this.stop = jest.fn();
    }

}

export default Transport;