import React from 'react';
import { shallow } from 'enzyme';
import { InstrumentInterface } from './';
import AMSynth from './AMSynth';
import DuoSynth from './DuoSynth';
import FMSynth from './FMSynth';
import MonoSynth from './MonoSynth';
import Synth from './Synth';

const instrumentsState = {
    '5542150612118159': {
      id: '5542150612118159',
      channelId: '8908196355388611',
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
    '8648077917817056': {
      id: '8648077917817056',
      channelId: '5873553984803034',
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
    '2262175587269012': {
      id: '2262175587269012',
      channelId: '0912182842906441',
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
    '5195256613888219': {
      id: '5195256613888219',
      channelId: '4291527807108257',
      type: 'duoSynth',
      instrumentData: {
        harmonicity: 1.5,
        portamento: 0,
        vibratoAmount: 0.5,
        vibratoRate: 5,
        voice0: {
          detune: 0,
          envelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
          },
          filter: {
            Q: 6,
            frequency: 350,
            gain: 0,
            rolloff: -24,
            type: 'lowpass'
          },
          filterEnvelope: {
            attack: 0.01,
            attackCurve: 'linear',
            baseFrequency: 200,
            decay: 0,
            exponent: 2,
            octaves: 7,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
          },
          oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'sine',
            volume: 0
          },
          portamento: 0,
          volume: -9.999999999999998
        },
        voice1: {
          detune: 0,
          envelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
          },
          filter: {
            Q: 6,
            frequency: 350,
            gain: 0,
            rolloff: -24,
            type: 'lowpass'
          },
          filterEnvelope: {
            attack: 0.01,
            attackCurve: 'linear',
            baseFrequency: 200,
            decay: 0,
            exponent: 2,
            octaves: 7,
            release: 0.5,
            releaseCurve: 'exponential',
            sustain: 1
          },
          oscillator: {
            detune: 0,
            mute: false,
            phase: 0,
            type: 'sine',
            volume: 0
          },
          portamento: 0,
          volume: -9.999999999999998
        },
        volume: 0
      }
    },
    '9041179439617252': {
      id: '9041179439617252',
      channelId: '5590500931486529',
      type: 'monoSynth',
      instrumentData: {
        detune: 0,
        envelope: {
          attack: 0.005,
          attackCurve: 'linear',
          decay: 0.1,
          release: 1,
          releaseCurve: 'exponential',
          sustain: 0.9
        },
        filter: {
          Q: 6,
          frequency: 350,
          gain: 0,
          rolloff: -24,
          type: 'lowpass'
        },
        filterEnvelope: {
          attack: 0.06,
          attackCurve: 'linear',
          baseFrequency: 200,
          decay: 0.2,
          exponent: 2,
          octaves: 7,
          release: 2,
          releaseCurve: 'exponential',
          sustain: 0.5
        },
        oscillator: {
          detune: 0,
          mute: false,
          phase: 0,
          type: 'square',
          volume: 0
        },
        portamento: 0,
        volume: 0
      }
    }
};

const mockedUpdateOneInstrumentSetting = jest.fn();

test('renders correctly', () => {
    const component = shallow(
        <InstrumentInterface 
            instrument={instrumentsState["5542150612118159"]}
            instrumentId="5542150612118159"
            updateOneInstrumentSetting={mockedUpdateOneInstrumentSetting}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders the correct instrument type according to supplied props', () => {
    const withSynth = shallow(
        <InstrumentInterface 
            instrument={instrumentsState["5542150612118159"]}
            instrumentId="5542150612118159"
            updateOneInstrumentSetting={mockedUpdateOneInstrumentSetting}
        />
    );
    expect(withSynth.find(Synth)).toHaveLength(1);
    const withAMSynth = shallow(
        <InstrumentInterface 
            instrument={instrumentsState["8648077917817056"]}
            instrumentId="8648077917817056"
            updateOneInstrumentSetting={mockedUpdateOneInstrumentSetting}
        />
    );
    expect(withAMSynth.find(AMSynth)).toHaveLength(1);
    const withFMSynth = shallow(
        <InstrumentInterface 
            instrument={instrumentsState["2262175587269012"]}
            instrumentId="2262175587269012"
            updateOneInstrumentSetting={mockedUpdateOneInstrumentSetting}
        />
    );
    expect(withFMSynth.find(FMSynth)).toHaveLength(1);
    const withDuoSynth = shallow(
        <InstrumentInterface 
            instrument={instrumentsState["5195256613888219"]}
            instrumentId="5195256613888219"
            updateOneInstrumentSetting={mockedUpdateOneInstrumentSetting}
        />
    );
    expect(withDuoSynth.find(DuoSynth)).toHaveLength(1);
    const withMonoSynth = shallow(
        <InstrumentInterface 
            instrument={instrumentsState["9041179439617252"]}
            instrumentId="9041179439617252"
            updateOneInstrumentSetting={mockedUpdateOneInstrumentSetting}
        />
    );
    expect(withMonoSynth.find(MonoSynth)).toHaveLength(1);
});