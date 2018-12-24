import React from 'react';
import { shallow } from 'enzyme';
import Tremolo from './Tremolo';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Tremolo 
            effectId="6156266754586526"
            effectData={effectData.tremolo}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
