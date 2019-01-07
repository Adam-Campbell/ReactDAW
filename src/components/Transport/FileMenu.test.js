import React from 'react';
import { FileMenu } from './FileMenu';
import { shallow } from 'enzyme';

test('renders closed state correctly', () => {
    const component = shallow(
        <FileMenu 
            isOpen={false}
            toggleMenu={jest.fn()}
            containerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders open state correctly', () => {
    const component = shallow(
        <FileMenu 
            isOpen={true}
            toggleMenu={jest.fn()}
            containerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot(); 
});