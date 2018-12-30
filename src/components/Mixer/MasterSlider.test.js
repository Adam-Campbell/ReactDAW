import React from 'react';
import { shallow } from 'enzyme';
import MasterSlider from './MasterSlider';

test('renders correctly', () => {
    const component = shallow(
        <MasterSlider 
            volume={0}
            trackId="master"
            handleVolumeChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});