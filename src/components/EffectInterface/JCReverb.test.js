import React from 'react';
import { shallow } from 'enzyme';
import JCReverb from './JCReverb';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <JCReverb 
            effectId="6156266754586526"
            effectData={effectData.jcReverb}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
