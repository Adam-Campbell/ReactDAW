import React from 'react';
import { shallow } from 'enzyme';
import ToggleMenu from './';
import { FileMenu } from '../Transport/FileMenu';

test('will render the component passed as a child to this component', () => {
    const wrapper = shallow(
        <ToggleMenu>
            {(props) => <FileMenu {...props} saveName='Project' />}
        </ToggleMenu>
    );
    expect(wrapper.find(FileMenu)).toHaveLength(1);
});

test('props are correctly passed into the child render prop', () => {
    const mockedChildRenderProp = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildRenderProp}
        </ToggleMenu>
    );
    expect(mockedChildRenderProp.mock.calls[0][0]).toEqual(
        expect.objectContaining({
            isOpen: expect.any(Boolean),
            openMenu: expect.any(Function),
            closeMenu: expect.any(Function),
            toggleMenu: expect.any(Function),
            containerRef: expect.any(Object)
        })
    );
});

test('calls children with isOpen false by default', () => {
    const mockedChildRenderProp = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildRenderProp}
        </ToggleMenu>
    );
    expect(mockedChildRenderProp.mock.calls[0][0].isOpen).toBe(false);
});

test('toggleMenu method alternates isOpen between true and false', () => {
    const mockedChildRenderProp = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildRenderProp}
        </ToggleMenu>
    );
    expect(mockedChildRenderProp.mock.calls[0][0].isOpen).toBe(false);
    wrapper.instance().toggleMenu();
    expect(mockedChildRenderProp.mock.calls[1][0].isOpen).toBe(true);
    wrapper.instance().toggleMenu();
    expect(mockedChildRenderProp.mock.calls[2][0].isOpen).toBe(false);
});

test('openMenu calls children with isOpen set to true', () => {
    const mockedChildRenderProp = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildRenderProp}
        </ToggleMenu>
    );
    expect(mockedChildRenderProp.mock.calls[0][0].isOpen).toBe(false);
    wrapper.instance().openMenu();
    expect(mockedChildRenderProp.mock.calls[1][0].isOpen).toBe(true);
    wrapper.instance().openMenu();
    expect(mockedChildRenderProp.mock.calls[2][0].isOpen).toBe(true);
});

test('closeMenu calls children with isOpen set to false', () => {
    const mockedChildRenderProp = jest.fn();
    const wrapper = shallow(
        <ToggleMenu>
            {mockedChildRenderProp}
        </ToggleMenu>
    );
    expect(mockedChildRenderProp.mock.calls[0][0].isOpen).toBe(false);
    wrapper.instance().closeMenu();
    expect(mockedChildRenderProp.mock.calls[1][0].isOpen).toBe(false);
    wrapper.instance().openMenu();
    expect(mockedChildRenderProp.mock.calls[2][0].isOpen).toBe(true);
    wrapper.instance().closeMenu();
    expect(mockedChildRenderProp.mock.calls[3][0].isOpen).toBe(false);
});