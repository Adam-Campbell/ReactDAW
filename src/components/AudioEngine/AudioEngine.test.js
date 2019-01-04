import Tone from 'tone';

jest.mock('tone');

test('tone mock', () => {
    expect(Tone.Master.volume.value).toBe(0);
    expect(Tone.Transport.start).toHaveBeenCalledTimes(0);
    Tone.Transport.start();
    expect(Tone.Transport.start).toHaveBeenCalledTimes(1);
});

test('resets between tests', () => {
    expect(Tone.Transport.start).not.toHaveBeenCalledTimes(0);
});

test('creates subclasses', () => {
    const volumeNode = new Tone.Volume();
    expect(volumeNode instanceof Tone.Volume).toBe(true);
});