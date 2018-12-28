import React from 'react';
import { shallow } from 'enzyme';
import DrumKit from './Drumkit';
import { instrumentData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <DrumKit 
            instrumentData={instrumentData.drumKit}
            instrumentId="4326432946537512"
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});