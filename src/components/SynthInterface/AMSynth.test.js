import React from 'react';
import { shallow } from 'enzyme';
import AMSynth from './AMSynth';
import { synthData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <AMSynth 
            instrumentData={synthData.amSynth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});