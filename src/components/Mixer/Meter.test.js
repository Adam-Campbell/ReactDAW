import React from 'react';
import { shallow } from 'enzyme';
import Meter from './Meter';

test('renders correctly', () => {
    const component = shallow(
        <Meter 
            trackId="2812513466104156"
        />
    );
    expect(component).toMatchSnapshot();
});