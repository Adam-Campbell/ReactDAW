import React from 'react';
import { shallow } from 'enzyme';
import MixerItem from './MixerItem';

test('renders correctly', () => {
    const component = shallow(
        <MixerItem 
            volume={0}
            pan={0}
            isMuted={false}
            isSolo={false}
            trackId="2812513466104156"
            name="Channel 1"
            handleVolumeChange={jest.fn()}
            handleMuteButtonClick={jest.fn()}
            handleSoloButtonClick={jest.fn()}
            handlePanChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});