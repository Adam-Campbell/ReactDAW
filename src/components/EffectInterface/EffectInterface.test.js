import React from 'react';
import { shallow } from 'enzyme';
import { EffectInterface } from './';
import { effectData } from '../../constants';
import Chorus from './Chorus';
import Compressor from './Compressor';
import Distortion from './Distortion';
import EQ3 from './EQ3';
import FeedbackDelay from './FeedbackDelay';
import Filter from './Filter';
import Freeverb from './Freeverb';
import Gate from './Gate';
import JCReverb from './JCReverb';
import LFO from './LFO';
import Limiter from './Limiter';
import Phaser from './Phaser';
import Tremolo from './Tremolo';
import Vibrato from './Vibrato';

const effectsState = {
    '6156266754586526': {
      id: '6156266754586526',
      type: 'chorus',
      channelId: '4671718008322373',
      effectData: {
        delayTime: 3.5,
        depth: 0.7,
        frequency: 1.5,
        spread: 180,
        type: 'sine',
        wet: 1
      }
    },
    '7704989127047688': {
      id: '7704989127047688',
      type: 'feedbackDelay',
      channelId: '4671718008322373',
      effectData: {
        delayTime: '8n',
        feedback: 0.125,
        wet: 1
      }
    },
    '1283195051913401': {
      id: '1283195051913401',
      type: 'tremolo',
      channelId: '8516637889667141',
      effectData: {
        depth: 0.5,
        frequency: 10,
        spread: 180,
        type: 'sine',
        wet: 1
      }
    }
}

const mockedUpdateOneEffectSetting = jest.fn();

test('renders correctly', () => {
    const component = shallow(
        <EffectInterface 
            effects={effectsState}
            effectId="6156266754586526"
            updateOneEffectSetting={mockedUpdateOneEffectSetting}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders the correct effect component depending on the props passed in', () => {
    const withFeedbackDelay = shallow(
        <EffectInterface 
            effects={effectsState}
            effectId="7704989127047688"
            updateOneEffectSetting={mockedUpdateOneEffectSetting}
        />
    );
    expect(withFeedbackDelay.find(FeedbackDelay)).toHaveLength(1);
    const withTremolo = shallow(
        <EffectInterface 
            effects={effectsState}
            effectId="1283195051913401"
            updateOneEffectSetting={mockedUpdateOneEffectSetting}
        />
    );
    expect(withTremolo.find(Tremolo)).toHaveLength(1);
});
