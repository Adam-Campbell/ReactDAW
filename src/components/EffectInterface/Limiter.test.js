import React from 'react';
import { shallow } from 'enzyme';
import Limiter from './Limiter';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Limiter 
            effectId="6156266754586526"
            effectData={effectData.limiter}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
