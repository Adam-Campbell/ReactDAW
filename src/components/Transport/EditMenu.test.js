import React from 'react';
import { EditMenu } from './EditMenu';
import { shallow } from 'enzyme';

test('renders closed state correctly', () => {
    const component = shallow(
        <EditMenu 
            isOpen={false}
            toggleMenu={jest.fn()}
            containerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders open state correctly', () => {
    const component = shallow(
        <EditMenu 
            isOpen={true}
            toggleMenu={jest.fn()}
            containerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot(); 
});