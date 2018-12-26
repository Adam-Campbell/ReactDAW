import React from 'react';
import { shallow } from 'enzyme';
import InstrumentDetails from './InstrumentDetails';

test('renders correctly', () => {
    const component = shallow(
        <InstrumentDetails 
            instrumentType="synth"
            handleChange={jest.fn()}
            handleOpen={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});