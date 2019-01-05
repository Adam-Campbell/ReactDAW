class Master {
    constructor() {
        this.volume = {
            value: 0
        };
        this.mute = false;
        this.chain = jest.fn();
    }
}

export default Master;