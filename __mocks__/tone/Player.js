class Player {
    constructor() {
        this.volume = {
            value: 0,
            setValueAtTime: jest.fn()
        };
        this.retrigger = false;
        this.connect = jest.fn();
        this.disconnect = jest.fn();
        this.start = jest.fn();
        this.load = jest.fn();
    }
}

export default Player;
