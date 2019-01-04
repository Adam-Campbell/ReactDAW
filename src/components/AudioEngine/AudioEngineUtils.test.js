import { normalizedStateToTree } from './AudioEngineUtils';

test('normalizedStateToTree', () => {
    const normalizedState = {
        playerInfo: {
          isPlaying: false,
          isPaused: false,
          isMuted: false,
          volume: 0,
          bpm: 120
        },
        activeWindows: [],
        channels: [
          {
            id: '6614664483913780',
            name: 'Channel 1',
            color: '#d86597',
            instrumentId: '3791894282878717',
            effectIds: [
              '4718180386201546'
            ],
            sectionIds: [
              '6599562252311882'
            ],
            volume: 0,
            isMuted: false,
            isSolo: false,
            pan: 0
          },
          {
            id: '2251693844992352',
            name: 'Channel 2',
            color: '#d86597',
            instrumentId: '5921994415215819',
            effectIds: [],
            sectionIds: [],
            volume: 0,
            isMuted: false,
            isSolo: false,
            pan: 0
          }
        ],
        sections: {
          '6599562252311882': {
            id: '6599562252311882',
            channelId: '6614664483913780',
            notes: [
              {
                pitch: 'A2',
                time: '0:0:0',
                duration: '1:0:0',
                velocity: 1,
                _id: '4195836532338002',
                x: 0,
                y: 1184,
                width: 384
              },
              {
                pitch: 'C#3',
                time: '0:0:0',
                duration: '1:0:0',
                velocity: 1,
                _id: '7222521330204897',
                x: 0,
                y: 1120,
                width: 384
              },
              {
                pitch: 'E3',
                time: '0:0:0',
                duration: '1:0:0',
                velocity: 1,
                _id: '0168358548317993',
                x: 0,
                y: 1072,
                width: 384
              }
            ],
            start: '0:0:0',
            numberOfBars: 1
          }
        },
        instruments: {
          '3791894282878717': {
            id: '3791894282878717',
            channelId: '6614664483913780',
            type: 'synth',
            instrumentData: {
              envelope: {
                attack: 0.005,
                attackCurve: 'linear',
                decay: 0.1,
                release: 1,
                releaseCurve: 'exponential',
                sustain: 0.3
              },
              oscillator: {
                detune: 0,
                mute: false,
                phase: 0,
                type: 'triangle',
                volume: 0
              },
              portamento: 0,
              volume: 0
            }
          },
          '5921994415215819': {
            id: '5921994415215819',
            channelId: '2251693844992352',
            type: 'fmSynth',
            instrumentData: {
              detune: 0,
              envelope: {
                attack: 0.01,
                attackCurve: 'linear',
                decay: 0.01,
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
              },
              harmonicity: 3,
              modulation: {
                detune: 0,
                mute: false,
                phase: 0,
                type: 'square',
                volume: 0
              },
              modulationEnvelope: {
                attack: 0.5,
                attackCurve: 'linear',
                decay: 0,
                release: 0.5,
                releaseCurve: 'exponential',
                sustain: 1
              },
              modulationIndex: 10,
              oscillator: {
                detune: 0,
                mute: false,
                phase: 0,
                type: 'triangle',
                volume: 0
              },
              portamento: 0,
              volume: 0
            }
          }
        },
        effects: {
          '4718180386201546': {
            id: '4718180386201546',
            type: 'feedbackDelay',
            channelId: '6614664483913780',
            effectData: {
              delayTime: '8n.',
              feedback: 0.125,
              wet: 0.465
            }
          }
        }
    }
    const expectedResult = {
        playerInfo: {
            isPlaying: false,
            isPaused: false,
            isMuted: false,
            volume: 0,
            bpm: 120
        },
        channels: [
            {
                id: '6614664483913780',
                volume: 0,
                isMuted: false,
                isSolo: false,
                pan: 0,
                instrument: {
                    id: '3791894282878717',
                    channelId: '6614664483913780',
                    type: 'synth',
                    instrumentData: {
                      envelope: {
                        attack: 0.005,
                        attackCurve: 'linear',
                        decay: 0.1,
                        release: 1,
                        releaseCurve: 'exponential',
                        sustain: 0.3
                      },
                      oscillator: {
                        detune: 0,
                        mute: false,
                        phase: 0,
                        type: 'triangle',
                        volume: 0
                      },
                      portamento: 0,
                      volume: 0
                    }
                },
                effects: [
                    {
                        id: '4718180386201546',
                        type: 'feedbackDelay',
                        channelId: '6614664483913780',
                        effectData: {
                          delayTime: '8n.',
                          feedback: 0.125,
                          wet: 0.465
                        }
                    }
                ],
                sections: [
                    {
                        id: '6599562252311882',
                        channelId: '6614664483913780',
                        notes: [
                          {
                            pitch: 'A2',
                            time: '0:0:0',
                            duration: '1:0:0',
                            velocity: 1,
                            _id: '4195836532338002',
                            x: 0,
                            y: 1184,
                            width: 384
                          },
                          {
                            pitch: 'C#3',
                            time: '0:0:0',
                            duration: '1:0:0',
                            velocity: 1,
                            _id: '7222521330204897',
                            x: 0,
                            y: 1120,
                            width: 384
                          },
                          {
                            pitch: 'E3',
                            time: '0:0:0',
                            duration: '1:0:0',
                            velocity: 1,
                            _id: '0168358548317993',
                            x: 0,
                            y: 1072,
                            width: 384
                          }
                        ],
                        start: '0:0:0',
                        numberOfBars: 1
                    }
                ]
            },
            {
                id: '2251693844992352',
                volume: 0,
                isMuted: false,
                isSolo: false,
                pan: 0,
                instrument: {
                    id: '5921994415215819',
                    channelId: '2251693844992352',
                    type: 'fmSynth',
                    instrumentData: {
                      detune: 0,
                      envelope: {
                        attack: 0.01,
                        attackCurve: 'linear',
                        decay: 0.01,
                        release: 0.5,
                        releaseCurve: 'exponential',
                        sustain: 1
                      },
                      harmonicity: 3,
                      modulation: {
                        detune: 0,
                        mute: false,
                        phase: 0,
                        type: 'square',
                        volume: 0
                      },
                      modulationEnvelope: {
                        attack: 0.5,
                        attackCurve: 'linear',
                        decay: 0,
                        release: 0.5,
                        releaseCurve: 'exponential',
                        sustain: 1
                      },
                      modulationIndex: 10,
                      oscillator: {
                        detune: 0,
                        mute: false,
                        phase: 0,
                        type: 'triangle',
                        volume: 0
                      },
                      portamento: 0,
                      volume: 0
                    }
                },
                effects: [],
                sections: []
            }
        ]
    }
    expect(normalizedStateToTree(normalizedState)).toEqual(expectedResult);
}); 
