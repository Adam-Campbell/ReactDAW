import React from 'react';
import { shallow } from 'enzyme';
import Freeverb from './Freeverb';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Freeverb 
            effectId="6156266754586526"
            effectData={effectData.freeverb}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
