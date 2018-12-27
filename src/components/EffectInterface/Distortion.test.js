import React from 'react';
import { shallow } from 'enzyme';
import Distortion from './Distortion';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Distortion 
            effectId="6156266754586526"
            effectData={effectData.distortion}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});