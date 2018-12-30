import React from 'react';
import { shallow } from 'enzyme';
import { Mixer } from './';
import { MixerItemContainer } from './MixerItemContainer';

const channelsState = [
    {
      id: '2812513466104156',
      name: 'Channel 1',
      color: '#d86597',
      instrumentId: '8516328939937592',
      effectIds: [],
      sectionIds: [],
      volume: 0,
      isMuted: false,
      isSolo: false,
      pan: 0
    },
    {
      id: '3880564538936934',
      name: 'Channel 2',
      color: '#d86597',
      instrumentId: '1050717713415613',
      effectIds: [],
      sectionIds: [],
      volume: 0,
      isMuted: false,
      isSolo: false,
      pan: 0
    },
    {
      id: '7214036741073003',
      name: 'Channel 3',
      color: '#d86597',
      instrumentId: '4150723633346982',
      effectIds: [],
      sectionIds: [],
      volume: 0,
      isMuted: false,
      isSolo: false,
      pan: 0
    }
];


test('renders correctly', () => {
    const component = shallow(
        <Mixer 
            channels={channelsState}
        />
    );
    expect(component).toMatchSnapshot();
});



const sampleState = {
    playerInfo: {
      isPlaying: false,
      isMuted: false,
      volume: 0,
      bpm: 120
    },
    activeWindows: [],
    channels: [
      {
        id: '2812513466104156',
        name: 'Channel 1',
        color: '#d86597',
        instrumentId: '8516328939937592',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false,
        isSolo: false,
        pan: 0
      },
      {
        id: '3880564538936934',
        name: 'Channel 2',
        color: '#d86597',
        instrumentId: '1050717713415613',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false,
        isSolo: false,
        pan: 0
      },
      {
        id: '7214036741073003',
        name: 'Channel 3',
        color: '#d86597',
        instrumentId: '4150723633346982',
        effectIds: [],
        sectionIds: [],
        volume: 0,
        isMuted: false,
        isSolo: false,
        pan: 0
      }
    ],
    sections: {},
    instruments: {
      '8516328939937592': {
        id: '8516328939937592',
        channelId: '2812513466104156',
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
      '1050717713415613': {
        id: '1050717713415613',
        channelId: '3880564538936934',
        type: 'amSynth',
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
      '4150723633346982': {
        id: '4150723633346982',
        channelId: '7214036741073003',
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
    effects: {}
  }