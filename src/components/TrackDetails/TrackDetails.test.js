import React from 'react';
import { TrackDetails } from './';
import InstrumentDetails from './InstrumentDetails';
import EffectsDetails from './EffectsDetails';
import { shallow } from 'enzyme';

const channelsState = [
    {
        id: '3821569482884337',
        name: 'Channel 1',
        color: '#d86597',
        instrumentId: '5870129581156841',
        effectIds: [
            '3666421382061490'
        ],
        sectionIds: []
    }
];

const instrumentsState = {
    '5870129581156841': {
        id: '5870129581156841',
        channelId: '3821569482884337',
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
};

const effectsState = {
    '3666421382061490': {
        id: '3666421382061490',
        type: 'chorus',
        channelId: '3821569482884337',
        effectData: {
            delayTime: 3.5,
            depth: 0.7,
            frequency: 1.5,
            spread: 180,
            type: 'sine',
            wet: 1
        }
    }
};

test('renders correctly', () => {
    const component = shallow(
        <TrackDetails 
            trackId="3821569482884337"
            channels={channelsState}
            instruments={instrumentsState}
            effects={effectsState}
            addInstrument={jest.fn()}
            removeInstrument={jest.fn()}
            openWindow={jest.fn()}
            addEffect={jest.fn()}
            removeEffect={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
    expect(component.find(InstrumentDetails)).toHaveLength(1);
    expect(component.find(EffectsDetails)).toHaveLength(1);
});
