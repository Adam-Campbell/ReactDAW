import React from 'react';
import { shallow } from 'enzyme';
import EffectDetailItem from './EffectDetailItem';

test('renders correctly', () => {
    const component = shallow(
        <EffectDetailItem 
            handleOpen={jest.fn()}
            handleRemove={jest.fn()}
            effectType="chorus"
            effectId="3666421382061490"
        />
    );
    expect(component).toMatchSnapshot();
});