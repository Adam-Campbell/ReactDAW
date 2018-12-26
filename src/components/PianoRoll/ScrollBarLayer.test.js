import React from 'react';
import { shallow } from 'enzyme';
import ScrollBarLayer from './ScrollBarLayer';

test('renders correctly', () => {
    const component = shallow(
        <ScrollBarLayer 
            stageHeight={600}
            stageWidth={800}
            padding={10}
            handleScrollBarClickEvents={jest.fn()}
            horizontalDragMove={jest.fn()}
            verticalDragMove={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
