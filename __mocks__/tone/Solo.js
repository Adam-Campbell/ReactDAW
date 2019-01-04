class Solo {
    constructor() {
        this.solo = false;
        this.connect = jest.fn();
        this.disconnect = jest.fn();
    }
}

export default Solo;