import React from 'react';
import { shallow } from 'enzyme';
import Phaser from './Phaser';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <Phaser 
            effectId="6156266754586526"
            effectData={effectData.phaser}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
