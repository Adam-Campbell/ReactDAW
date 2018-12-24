import React from 'react';
import { shallow } from 'enzyme';
import LFO from './LFO';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <LFO 
            effectId="6156266754586526"
            effectData={effectData.lfo}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
