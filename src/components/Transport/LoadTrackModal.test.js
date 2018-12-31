import React from 'react';
import { shallow } from 'enzyme';
import LoadTrackModal from './LoadTrackModal';

test('renders correctly', () => {
    const component = shallow(
        <LoadTrackModal 
            handleClose={jest.fn()}
            handleLoad={jest.fn()}
            savedTracks={['Track one', 'Track two']}
        />
    );
    expect(component).toMatchSnapshot();
});