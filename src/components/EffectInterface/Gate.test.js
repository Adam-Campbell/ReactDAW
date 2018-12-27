import React from 'react';
import { shallow } from 'enzyme';
import Gate from './Gate';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Gate 
            effectId="6156266754586526"
            effectData={effectData.gate}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
