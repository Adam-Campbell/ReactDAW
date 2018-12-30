import React from 'react';
import { shallow } from 'enzyme';
import { MasterSliderContainer } from './MasterSliderContainer';

test('renders correctly', () => {
    const component = shallow(
        <MasterSliderContainer 
            volume={0}
            setMasterVolume={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});