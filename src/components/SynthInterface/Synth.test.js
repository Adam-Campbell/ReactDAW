import React from 'react';
import { shallow } from 'enzyme';
import Synth from './Synth';
import { synthData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Synth 
            instrumentData={synthData.synth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});