import React from 'react';
import { shallow } from 'enzyme';
import FeedbackDelay from './FeedbackDelay';
import { effectData } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <FeedbackDelay 
            effectId="6156266754586526"
            effectData={effectData.feedbackDelay}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
