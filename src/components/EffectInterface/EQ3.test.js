import React from 'react';
import { shallow } from 'enzyme';
import EQ3 from './EQ3';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <EQ3 
            effectId="6156266754586526"
            effectData={effectData.eq3}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});