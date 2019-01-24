import React from 'react';
import Tone from 'tone';
import { PianoRollContainer } from './';
import { shallow } from 'enzyme';

jest.mock('tone');
Tone.Transport.position = '0:0:0';

const mockedStore = {
    sectionInfo: {
      notes: []
    },
    playerInfo: {
      isPlaying: false,
      isMuted: false,
      volume: 0,
      bpm: 120
    },
    activeWindows: [
      {
        id: '7943665839704739',
        type: 'section'
      }
    ],
    channels: [
      {
        id: '0443540104839537',
        name: 'Channel 1',
        color: '#d86597',
        instrumentId: '0653100838795197',
        effectIds: [],
        sectionIds: [
          '7943665839704739'
        ]
      }
    ],
    sections: {
      '7943665839704739': {
        id: '7943665839704739',
        channelId: '0443540104839537',
        notes: [],
        start: '0:0:0',
        numberOfBars: 4
      }
    },
    instruments: {
      '0653100838795197': {
        id: '0653100838795197',
        channelId: '0443540104839537',
        type: 'synth',
        synthData: {
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
      }
    },
    effects: {}
};

test('renders correctly', () => {
    const containerComponent = shallow(
        <PianoRollContainer 
            id={mockedStore.activeWindows[0].id}
            section={mockedStore.sections[mockedStore.activeWindows[0].id]}
            isPlaying={mockedStore.playerInfo.isPlaying}
            isPaused={false}
            toolType="cursor"
            snap="16n"
            noteDuration="16n"
        />
    );
    const presentationalComponent = containerComponent.first().shallow();
    expect(containerComponent).toMatchSnapshot();
    expect(presentationalComponent).toMatchSnapshot();
});