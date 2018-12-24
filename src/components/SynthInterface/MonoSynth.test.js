import React from 'react';
import { shallow } from 'enzyme';
import MonoSynth from './MonoSynth';
import { synthData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <MonoSynth 
            instrumentData={synthData.monoSynth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});