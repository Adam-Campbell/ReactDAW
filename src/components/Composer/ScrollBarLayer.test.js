import React from 'react';
import { shallow } from 'enzyme';
import ScrollBarLayer from './ScrollBarLayer';

test('renders correctly', () => {
    const component = shallow(
        <ScrollBarLayer 
            stageHeight={300}
            stageWidth={740}
            scrollPadding={10}
            verticalDragMove={jest.fn()}
            horizontalDragMove={jest.fn()}
            handleScrollBarClickEvents={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});