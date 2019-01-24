import React from 'react';
import { ComposerContainer } from './';
import Composer from './Composer';
import { shallow } from 'enzyme';

const channelsState = [
    {
      id: '6984087700822156',
      name: 'Channel 1',
      color: '#d86597',
      instrumentId: '0374798538126734',
      effectIds: [],
      sectionIds: [
        '7009247242625234'
      ]
    }
];

const sectionsState = {
    '7009247242625234': {
      id: '7009247242625234',
      channelId: '6984087700822156',
      notes: [],
      start: '0:0:0',
      numberOfBars: 4
    }
};

test('renders correctly', () => {
    document.querySelector = jest.fn(() => ({
        getBoundingClientRect: () => ({
            height: 50
        })
    }));
    const component = shallow(
        <ComposerContainer 
            channels={channelsState}
            sections={sectionsState}
            isPlaying={false}
            addChannel={jest.fn()}
            removeChannel={jest.fn()}
            addSection={jest.fn()}
            removeSection={jest.fn()}
            openWindow={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
    expect(component.find(Composer)).toHaveLength(1);
    expect(component.find(Composer).first().props().channels).toEqual(channelsState);
});
