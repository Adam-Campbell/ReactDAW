import React from 'react';
import { shallow } from 'enzyme';
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
        <MixerItemContainer 
            channels={channelsState}
            trackId="2812513466104156"
        />
    );
    expect(component).toMatchSnapshot();
});