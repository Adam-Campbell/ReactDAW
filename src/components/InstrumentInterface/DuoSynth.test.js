import React from 'react';
import { shallow } from 'enzyme';
import DuoSynth from './DuoSynth';
import { synthData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <DuoSynth 
            instrumentData={synthData.duoSynth}
            instrumentId="5542150612118159"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});