import React from 'react';
import { shallow } from 'enzyme';
import AMSynth from './AMSynth';
import { instrumentData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <AMSynth 
            instrumentData={instrumentData.amSynth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});