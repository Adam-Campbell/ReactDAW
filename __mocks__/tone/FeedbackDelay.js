class FeedbackDelay {
    constructor() {
        this.set = jest.fn();
        this.connect = jest.fn();
        this.disconnect = jest.fn();
    }
}

export default FeedbackDelay;