class Meter {
    constructor() {
        this.getLevel = jest.fn();
        this.connect = jest.fn();
        this.disconnect = jest.fn();
    }
}

export default Meter;