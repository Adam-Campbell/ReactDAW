import React from 'react';
import { shallow } from 'enzyme';
import Vibrato from './Vibrato';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Vibrato 
            effectId="6156266754586526"
            effectData={effectData.vibrato}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
