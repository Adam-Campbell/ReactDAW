import React from 'react';
import { shallow } from 'enzyme';
import Synth from './Synth';
import { instrumentData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Synth 
            instrumentData={instrumentData.synth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});