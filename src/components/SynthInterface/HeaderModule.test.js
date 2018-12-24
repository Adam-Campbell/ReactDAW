import React from 'react';
import { shallow } from 'enzyme';
import HeaderModule from './HeaderModule';

test('renders correctly', () => {
    const component = shallow(
        <HeaderModule 
            synthTitle="Synth"
        />
    );
    expect(component).toMatchSnapshot();
});