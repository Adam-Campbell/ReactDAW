class Part {
    constructor() {
        this.start = jest.fn();
        this.callback = () => {};
        this.add = jest.fn();
        this.remove = jest.fn();
        this.dispose = jest.fn();
    }
}

export default Part;