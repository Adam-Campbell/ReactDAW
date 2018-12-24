import React from 'react';
import PianoRollControls from './PianoRollControls';
import { shallow } from 'enzyme';

test('renders correctly', () => {
    const component = shallow(
        <PianoRollControls 
            quantizeValue={'16n'}
            updateQuantizeValue={jest.fn()}
            durationValue={'16n'}
            updateDurationValue={jest.fn()}
            cursorValue={'pointer'}
            updateCursorValue={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
}); 