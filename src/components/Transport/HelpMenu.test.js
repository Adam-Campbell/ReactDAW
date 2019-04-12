import React from 'react';
import { HelpMenu } from './HelpMenu';
import { shallow } from 'enzyme';

test('renders closed state correctly', () => {
    const component = shallow(
        <ViewMenu 
            isOpen={false}
            toggleMenu={jest.fn()}
            containerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders open state correctly', () => {
    const component = shallow(
        <ViewMenu 
            isOpen={true}
            toggleMenu={jest.fn()}
            containerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot(); 
});