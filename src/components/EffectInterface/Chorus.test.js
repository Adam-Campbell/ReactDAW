import React from 'react';
import { shallow } from 'enzyme';
import Chorus from './Chorus';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Chorus 
            effectId="6156266754586526"
            effectData={effectData.chorus}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});