import React from 'react';
import { shallow } from 'enzyme';
import ComposerControls from './ComposerControls';

test('renders correctly', () => {
    const component = shallow(
        <ComposerControls 
            cursorValue="pointer"
            updateCursorValue={jest.fn()}
            durationValue={4}
            updateDurationValue={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});