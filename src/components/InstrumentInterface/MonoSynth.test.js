import React from 'react';
import { shallow } from 'enzyme';
import MonoSynth from './MonoSynth';
import { instrumentData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <MonoSynth 
            instrumentData={instrumentData.monoSynth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});