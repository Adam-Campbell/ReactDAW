import Tone from 'tone';
import Bus from './Bus';
import Channel from './Channel';
import Section from './Section';
import DrumKit from './DrumKit';
import Drum from './Drum';
jest.mock('tone');

/*

Testing strategy:

Create an instance of the Bus class.

Create a series of successive states to run through the reconcile() method of the class. These will represent
the prev props and current props of a number of successive actions in the program. 

At each step, make assertions about the program to ensure it is behaving as would be expected. 

Steps we will look at, starting from empty state:

1. Add a channel
2. Add a second channel.
3. Add a section to the first channel. 
4. Add a note to that section.
5. Add another note to that section
6. Add a section to the second channel.
7. Add a note to that section.
8. Copy the section in the first channel and paste it back into the first channel after the first section.
9. Delete the second section on channel one.
10. Change the instrument type for the first channel. 
11. Change some instrument settings for the first channel. 
12. Add an effect to the first channel. 
13. Change the value of that effect.
14. Delete the second channel. 
15. play the track
16. pause the track
17. stop the track
18. Change the master volume. 
19. Change the bpm. 
20. Mute channel 1.
21. Unmute channel 1
22. Solo channel 1.
23. Unsolo channel 1
24. Change the volume of channel 1.
25. Change the panning of channel 1. 

*/


const bus = new Bus();

/*
Step 1 - added channel with id 8941019455169234
*/

test('adds a channel', () => {
    const step1Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[]}`);
    const step1Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`)
    // verify that the channels array was empty before reconciliation, and that the correct channel was added
    // during reconciliation
    expect(bus.channels).toHaveLength(0);
    bus.reconcile(step1Prev, step1Curr);
    expect(bus.channels).toHaveLength(1);
    expect(bus.channels[0] instanceof Channel).toBe(true);
    expect(bus.channels[0].id).toBe('8941019455169234');
});

/*
Step 2 - added second channel with id 9477783661757503
*/

test('order preserved when multiple channels added', () => {
    const step2Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step2Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the second channel was correctly added, and that the correct order of the two channels was 
    // preserved.
    expect(bus.channels).toHaveLength(1);
    bus.reconcile(step2Prev, step2Curr);
    expect(bus.channels).toHaveLength(2);
    expect(bus.channels[0].id).toBe('8941019455169234');
    expect(bus.channels[1].id).toBe('9477783661757503');
});

/*
Step 3 - added section with id 8421747018250227 to first channel
*/
test('adds section to channel', () => {
    const step3Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step3Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the sectionStore was empty before reconciliation, and afterwards container a new instance of 
    // the Section class under the correct key.
    expect(bus.channels[0].sectionStore).toEqual({});
    bus.reconcile(step3Prev, step3Curr);
    expect(bus.channels[0].sectionStore['8421747018250227'] instanceof Section).toBe(true);
});

/*
Step 4 - added note with id 1697997020157033 to section 8421747018250227 on first channel
*/
test('adds a note', () => {
    const step4Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step4Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const section = bus.channels[0].sectionStore['8421747018250227'];
    // verify that the noteStore was empty before reconciliation, then during reconciliation the correct
    // note was added to the noteStore, and the add method was called with the correct argument.
    expect(section.noteStore).toEqual({});
    expect(section._part.add).toHaveBeenCalledTimes(0);
    bus.reconcile(step4Prev, step4Curr);
    expect(section.noteStore['1697997020157033']).toEqual({
        note: 'B3',
        time: '0:0:0',
        duration: '1:0:0',
        id: '1697997020157033',
        velocity: 1,
    });
    expect(section._part.add).toHaveBeenCalledTimes(1);
    expect(section._part.add).toHaveBeenCalledWith({
        note: 'B3',
        time: '0:0:0',
        duration: '1:0:0',
        id: '1697997020157033',
        velocity: 1,
    })
});

/*
Step 5 - added note with id 8136955010985072 to section 8421747018250227 on first channel
*/
test('adds a second note', () => {
    const step5Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step5Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const section = bus.channels[0].sectionStore['8421747018250227'];
    // verify that the correct note was added to the noteStore, and that the add method was called with the
    // correct argument.
    expect(section._part.add).toHaveBeenCalledTimes(1);
    bus.reconcile(step5Prev, step5Curr);
    expect(section.noteStore['8136955010985072']).toEqual({
        note: 'D#4',
        time: '0:0:0',
        duration: '1:0:0',
        id: '8136955010985072',
        velocity: 1,
    });
    expect(section._part.add).toHaveBeenCalledTimes(2);
    expect(section._part.add).toHaveBeenCalledWith({
        note: 'D#4',
        time: '0:0:0',
        duration: '1:0:0',
        id: '8136955010985072',
        velocity: 1,
    });
});

/*
Step 6 - add section with id 4772107362473252 to the second channel
*/
test('adds section to additional channel', () => {
    const step6Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step6Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the sectionStore was empty before reconciliation, and afterwards it contained an instance of
    // the Section class under the correct key.
    expect(bus.channels[1].sectionStore).toEqual({});
    bus.reconcile(step6Prev, step6Curr);
    expect(bus.channels[1].sectionStore['4772107362473252'] instanceof Section).toBe(true);
});
/*
Step 7 -  added note with id 7324543873054694 to section 4772107362473252 on the second channel
*/
test('adds note to section on additional channel', () => {
    const step7Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step7Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const section = bus.channels[1].sectionStore['4772107362473252'];
    // verify that the add method has not been called and the noteStore is empty before reconciliation
    expect(section._part.add).toHaveBeenCalledTimes(0);
    expect(section.noteStore).toEqual({});
    bus.reconcile(step7Prev, step7Curr);
    // verify that the correct note was added to the noteStore, and that the add method was called with the 
    // correct argument.
    expect(section.noteStore['7324543873054694']).toEqual({
        note: 'E4',
        time: '0:0:0',
        duration: '0:2:0',
        id: '7324543873054694',
        velocity: 1,
    });
    expect(section._part.add).toHaveBeenCalledTimes(1);
    expect(section._part.add).toHaveBeenCalledWith({
        note: 'E4',
        time: '0:0:0',
        duration: '0:2:0',
        id: '7324543873054694',
        velocity: 1,
    })
});
/*
Step 8 - copied first section and pasted as section 3617295418782006 on first channel
*/
test('adds a new section and its notes simultaneously for copy paste operation', () => {
    const step8Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step8Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1},{"id":"3617295418782006","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1389698571481637","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"2644829906357649","x":0,"y":896,"width":384}],"start":"1:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that section 3617295418782006 was not present before reconciliation.
    expect(bus.channels[0].sectionStore.hasOwnProperty('3617295418782006')).toBe(false);
    bus.reconcile(step8Prev, step8Curr);
    // verify that section 3617295418782006 is present after reconciliation, and is an instance of Section class.
    expect(bus.channels[0].sectionStore['3617295418782006'] instanceof Section).toBe(true);
    const section = bus.channels[0].sectionStore['3617295418782006'];
    // verify that the correct notes are in the noteStore, and that the add method was called the correct amount
    // of times with the correct arguments.
    expect(section.noteStore['1389698571481637']).toEqual({
        note: 'B3',
        time: '0:0:0',
        duration: '1:0:0',
        id: '1389698571481637',
        velocity: 1,
    });
    expect(section.noteStore['2644829906357649']).toEqual({
        note: 'D#4',
        time: '0:0:0',
        duration: '1:0:0',
        id: '2644829906357649',
        velocity: 1,
    });
    expect(section._part.add).toHaveBeenCalledTimes(2);
    expect(section._part.add).toHaveBeenCalledWith({
        note: 'B3',
        time: '0:0:0',
        duration: '1:0:0',
        id: '1389698571481637',
        velocity: 1,
    })
    expect(section._part.add).toHaveBeenCalledWith({
        note: 'D#4',
        time: '0:0:0',
        duration: '1:0:0',
        id: '2644829906357649',
        velocity: 1,
    });
});
/*
Step 9 - deleted section 3617295418782006 on first channel
*/
test('deletes a section', () => {
    const step9Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1},{"id":"3617295418782006","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1389698571481637","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"2644829906357649","x":0,"y":896,"width":384}],"start":"1:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step9Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the section 3617295418782006 was removed from the sectionStore during reconciliation
    expect(bus.channels[0].sectionStore.hasOwnProperty('3617295418782006')).toBe(true);
    bus.reconcile(step9Prev, step9Curr);
    expect(bus.channels[0].sectionStore.hasOwnProperty('3617295418782006')).toBe(false);
});

/*
Step 10 - changed first channels instrument to AMSynth with id 0557207319634046
*/
test('changes instrument type', () => {
    const step10Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"2483356422099476","channelId":"8941019455169234","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step10Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the instruments before and after reconciliation are both instances of Tone.PolySynth
    expect(bus.channels[0].instrument instanceof Tone.PolySynth).toBe(true);
    const instrumentBefore = bus.channels[0].instrument;
    bus.reconcile(step10Prev, step10Curr);
    expect(bus.channels[0].instrument instanceof Tone.PolySynth).toBe(true);
    const instrumentAfter = bus.channels[0].instrument;
    // verify that the instruments from before and after reconciliation are not the same instance
    expect(instrumentBefore).not.toBe(instrumentAfter);
    // verify that the new instruments set method has been called with the correct data.
    expect(instrumentAfter.set).toHaveBeenCalledTimes(1);
    expect(instrumentAfter.set).toHaveBeenCalledWith({
        detune:0,
        envelope: {
            attack: 0.01,
            attackCurve: "linear",
            decay: 0.01,
            release: 0.5,
            releaseCurve: "exponential",
            sustain: 1
        },
        harmonicity: 3,
        modulation: {
            detune: 0,
            mute: false,
            phase: 0,
            type: "square",
            volume: 0
        },
        modulationEnvelope: {
            attack: 0.5,
            attackCurve: "linear",
            decay: 0,
            release: 0.5,
            releaseCurve: "exponential",
            sustain: 1
        },
        oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: "triangle",
            volume: 0
        },
        portamento: 0,
        volume:0
    });
});

/*
Step 11 - changed the oscillator type to sawtooth for instrument 0557207319634046
*/
test('updates an instruments settings', () => {
    const step11Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step11Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const instrument = bus.channels[0].instrument;
    // verify that the instruments set method was called and that it was called with the correct data
    expect(instrument.set).toHaveBeenCalledTimes(1);
    bus.reconcile(step11Prev, step11Curr);
    expect(instrument.set).toHaveBeenCalledTimes(2);
    expect(instrument.set).toHaveBeenCalledWith({
        detune:0,
        envelope: {
            attack: 0.01,
            attackCurve: "linear",
            decay: 0.01,
            release: 0.5,
            releaseCurve: "exponential",
            sustain: 1
        },
        harmonicity: 3,
        modulation: {
            detune: 0,
            mute: false,
            phase: 0,
            type: "square",
            volume: 0
        },
        modulationEnvelope: {
            attack: 0.5,
            attackCurve: "linear",
            decay: 0,
            release: 0.5,
            releaseCurve: "exponential",
            sustain: 1
        },
        oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: "sawtooth",
            volume: 0
        },
        portamento: 0,
        volume:0
    });
});
/*
Step 12 - added effect with id 4096226341020639 to first channel
*/
test('adds an effect', () => {
    const step12Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step12Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the effect chain is empty before reconciliation
    expect(bus.channels[0].effectChain).toEqual([]);
    // verify that the instrument instance has been connected once and never disconnected before reconciliation
    expect(bus.channels[0].instrument.connect).toHaveBeenCalledTimes(1);
    expect(bus.channels[0].instrument.disconnect).toHaveBeenCalledTimes(0);
    // perform reconciliation
    bus.reconcile(step12Prev, step12Curr);
    // verify that the instrument was disconnected and connected again during reconciliation
    expect(bus.channels[0].instrument.disconnect).toHaveBeenCalledTimes(1);
    expect(bus.channels[0].instrument.connect).toHaveBeenCalledTimes(2);
    const effectAdded = bus.channels[0].effectChain[0];
    // verify that the effect added is an instance of the correct class, that it was connected and that it was
    // set with the default data.
    expect(effectAdded instanceof Tone.FeedbackDelay).toBe(true);
    expect(effectAdded.connect).toHaveBeenCalledTimes(1);
    expect(effectAdded.set).toHaveBeenCalledTimes(1);
    expect(effectAdded.set).toHaveBeenCalledWith({
        delayTime: "8n",
        feedback: 0.125,
        wet: 1
    });
});
/*
Step 13 - changed the delay time of effect 4096226341020639 to '8d'
*/
test('upates an effects settings', () => {
    const step13Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step13Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const effect = bus.channels[0].effectChain[0];
    expect(effect.set).toHaveBeenCalledTimes(1);
    // perform reconciliation
    bus.reconcile(step13Prev, step13Curr);
    // verify that the set method has been called an additional time on the effect instance
    expect(effect.set).toHaveBeenCalledTimes(2);
    // verify that the set method was called with the new effect data
    expect(effect.set).toHaveBeenCalledWith({
        delayTime: "8n.",
        feedback: 0.125,
        wet: 1
    });
});

/*
Step 14 - deleted second channel
*/
test('deletes a channel', () => {
    const step14Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0},{"id":"9477783661757503","instrument":{"id":"1268256334704224","channelId":"9477783661757503","type":"synth","instrumentData":{"envelope":{"attack":0.005,"attackCurve":"linear","decay":0.1,"release":1,"releaseCurve":"exponential","sustain":0.3},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"triangle","volume":0},"portamento":0,"volume":0}},"effects":[],"sections":[{"id":"4772107362473252","channelId":"9477783661757503","notes":[{"pitch":"E4","time":"0:0:0","duration":"0:2:0","velocity":1,"_id":"7324543873054694","x":0,"y":880,"width":192}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step14Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that there were two channels before reconciliation and one afterwards
    expect(bus.channels).toHaveLength(2);
    bus.reconcile(step14Prev, step14Curr);
    expect(bus.channels).toHaveLength(1);
    // verify that the correct channel was removed
    expect(bus.channels[0].id).toBe('8941019455169234');
});
/*
Step 15 - play the track
*/
test('plays the track', () => { 
    const step15Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step15Curr = JSON.parse(`{"playerInfo":{"isPlaying":true,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the start method was not called before reconciliation, but was afterwards.
    expect(Tone.Transport.start).toHaveBeenCalledTimes(0);
    bus.reconcile(step15Prev, step15Curr);
    expect(Tone.Transport.start).toHaveBeenCalledTimes(1);

});

/*
Step 16 - pause the track
*/
test('pauses the track', () => { 
    const step16Prev = JSON.parse(`{"playerInfo":{"isPlaying":true,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step16Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":true,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the pause method was not called before reconciliation, but was afterwards.
    expect(Tone.Transport.pause).toHaveBeenCalledTimes(0);
    bus.reconcile(step16Prev, step16Curr);
    expect(Tone.Transport.pause).toHaveBeenCalledTimes(1);
});
/*
Step 17 - stop the track
*/
test('stops the track', () => { 
    const step17Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":true,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step17Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the pause method was not called before reconciliation, but was afterwards.
    expect(Tone.Transport.stop).toHaveBeenCalledTimes(0);
    bus.reconcile(step17Prev, step17Curr);
    expect(Tone.Transport.stop).toHaveBeenCalledTimes(1);
});

/*
Step 18 - change master volume
*/
test('updates master volume', () => {
    const step18Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":0,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step18Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the master volume was 0 before reconciliation, and 2 afterwards.
    expect(bus.masterVolumeNode.volume.value).toBe(0);
    bus.reconcile(step18Prev, step18Curr);
    expect(bus.masterVolumeNode.volume.value).toBe(2);
});

/*
Step 19 - change bpm
*/
test('changes the bpm', () => { 
    const step19Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":120},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step19Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    // verify that the bpm 120 before reconciliation and 135 afterwards.
    expect(Tone.Transport.bpm.value).toBe(120);
    bus.reconcile(step19Prev, step19Curr);
    expect(Tone.Transport.bpm.value).toBe(135);
});

/*
Step 20 - mute channel 1
*/
test('mutes a channel', () => { 
    const step20Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step20Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":true,"isSolo":false,"pan":0}]}`);
    const volumeNode = bus.channels[0].volumeNode;
    // verify that volume nodes mute property was false before reconciliation and true afterwards.
    expect(volumeNode.mute).toBe(false);
    bus.reconcile(step20Prev, step20Curr);
    expect(volumeNode.mute).toBe(true);
});
/*
Step 21 - unmute channel 1
*/
test('unmutes a channel', () => { 
    const step21Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":true,"isSolo":false,"pan":0}]}`);
    const step21Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const volumeNode = bus.channels[0].volumeNode;
    // verify that volume nodes mute property was true before reconciliation and false afterwards.
    expect(volumeNode.mute).toBe(true);
    bus.reconcile(step21Prev, step21Curr);
    expect(volumeNode.mute).toBe(false);
});
/*
Step 22 - solo channel 1
*/
test('solos a channel', () => { 
    const step22Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step22Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":true,"pan":0}]}`);
    const soloNode = bus.channels[0].soloNode;
    // verify that the solo nodes solo property was false before reconciliation and true afterwards.
    expect(soloNode.solo).toBe(false);
    bus.reconcile(step22Prev, step22Curr);
    expect(soloNode.solo).toBe(true);
});

/*
Step 23 - unsolo channel 1
*/
test('unsolos a channel', () => { 
    const step23Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":true,"pan":0}]}`);
    const step23Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const soloNode = bus.channels[0].soloNode;
    // verify that the solo nodes solo property was true before reconciliation and false afterwards.
    expect(soloNode.solo).toBe(true);
    bus.reconcile(step23Prev, step23Curr);
    expect(soloNode.solo).toBe(false);
});

/*
Step 24 - change the volume of channel 1
*/
test('changes a channels volume', () => { 
    const step24Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":0,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step24Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":-2.5,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const volumeNode = bus.channels[0].volumeNode;
    // verify that the volume was 0 before reconciliation and -2.5 afterwards
    expect(volumeNode.volume.value).toBe(0);
    bus.reconcile(step24Prev, step24Curr);
    expect(volumeNode.volume.value).toBe(-2.5);
});

/*
Step 25 - change the panning of channel 1
*/
test('changes a channels panning', () => { 
    const step25Prev = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":-2.5,"isMuted":false,"isSolo":false,"pan":0}]}`);
    const step25Curr = JSON.parse(`{"playerInfo":{"isPlaying":false,"isPaused":false,"isMuted":false,"volume":2,"bpm":135},"channels":[{"id":"8941019455169234","instrument":{"id":"0557207319634046","channelId":"8941019455169234","type":"amSynth","instrumentData":{"detune":0,"envelope":{"attack":0.01,"attackCurve":"linear","decay":0.01,"release":0.5,"releaseCurve":"exponential","sustain":1},"harmonicity":3,"modulation":{"detune":0,"mute":false,"phase":0,"type":"square","volume":0},"modulationEnvelope":{"attack":0.5,"attackCurve":"linear","decay":0,"release":0.5,"releaseCurve":"exponential","sustain":1},"oscillator":{"detune":0,"mute":false,"phase":0,"type":"sawtooth","volume":0},"portamento":0,"volume":0}},"effects":[{"id":"4096226341020639","type":"feedbackDelay","channelId":"8941019455169234","effectData":{"delayTime":"8n.","feedback":0.125,"wet":1}}],"sections":[{"id":"8421747018250227","channelId":"8941019455169234","notes":[{"pitch":"B3","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"1697997020157033","x":0,"y":960,"width":384},{"pitch":"D#4","time":"0:0:0","duration":"1:0:0","velocity":1,"_id":"8136955010985072","x":0,"y":896,"width":384}],"start":"0:0:0","numberOfBars":1}],"volume":-2.5,"isMuted":false,"isSolo":false,"pan":0.5}]}`);
    const pannerNode = bus.channels[0].pannerNode;
    // verify that the panning was 0 before reconciliation and 0.5 afterwards
    expect(pannerNode.pan.value).toBe(0);
    bus.reconcile(step25Prev, step25Curr);
    expect(pannerNode.pan.value).toBe(0.5);
});







