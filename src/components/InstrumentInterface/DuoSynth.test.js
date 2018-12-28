import React from 'react';
import { shallow } from 'enzyme';
import DuoSynth from './DuoSynth';
import { instrumentData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <DuoSynth 
            instrumentData={instrumentData.duoSynth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});