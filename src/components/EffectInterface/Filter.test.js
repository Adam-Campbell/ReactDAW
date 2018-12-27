import React from 'react';
import { shallow } from 'enzyme';
import Filter from './Filter';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Filter 
            effectId="6156266754586526"
            effectData={effectData.filter}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});