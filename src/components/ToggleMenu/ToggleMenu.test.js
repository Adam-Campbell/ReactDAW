import React from 'react';
import { shallow } from 'enzyme';
import ToggleMenu from './';

test('calls children with isOpen false by default', () => {
    const mockedChildren = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildren}
        </ToggleMenu>
    );
    const arg = mockedChildren.mock.calls[0][0];
    expect(arg.isOpen).toBe(false);
});

test('toggleMenu method alternates isOpen between true and false', () => {
    const mockedChildren = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildren}
        </ToggleMenu>
    );
    const instance = wrapper.instance();
    expect(mockedChildren.mock.calls[0][0].isOpen).toBe(false);
    instance.toggleMenu();
    expect(mockedChildren.mock.calls[1][0].isOpen).toBe(true);
    instance.toggleMenu();
    expect(mockedChildren.mock.calls[2][0].isOpen).toBe(false);
});

test('openMenu calls children with isOpen set to true', () => {
    const mockedChildren = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildren}
        </ToggleMenu>
    );
    const instance = wrapper.instance();
    expect(mockedChildren.mock.calls[0][0].isOpen).toBe(false);
    instance.openMenu();
    expect(mockedChildren.mock.calls[1][0].isOpen).toBe(true);
    instance.openMenu();
    expect(mockedChildren.mock.calls[2][0].isOpen).toBe(true);
});

test('closeMenu calls children with isOpen set to false', () => {
    const mockedChildren = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildren}
        </ToggleMenu>
    );
    const instance = wrapper.instance(); 
    expect(mockedChildren.mock.calls[0][0].isOpen).toBe(false);
    instance.closeMenu();
    expect(mockedChildren.mock.calls[1][0].isOpen).toBe(false);
    instance.openMenu();
    expect(mockedChildren.mock.calls[2][0].isOpen).toBe(true);
    instance.closeMenu();
    expect(mockedChildren.mock.calls[3][0].isOpen).toBe(false);
});