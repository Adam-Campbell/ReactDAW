import React from 'react';
import { shallow } from 'enzyme';
import FMSynth from './FMSynth';
import { synthData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <FMSynth 
            instrumentData={synthData.fmSynth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});