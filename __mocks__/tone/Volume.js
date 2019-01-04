class Volume {
    constructor() {
        this.volume = {
            value: 0
        };
        this.mute = false;
        this.connect = jest.fn();
        this.disconnect = jest.fn();
    }

}

export default Volume;
