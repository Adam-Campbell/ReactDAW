import React from 'react';
import { shallow } from 'enzyme';
import Compressor from './Compressor';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Compressor 
            effectId="6156266754586526"
            effectData={effectData.compressor}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});