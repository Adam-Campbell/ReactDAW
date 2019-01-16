import React from 'react';
import { shallow } from 'enzyme';
import SaveModal from './SaveModal';

test('renders correctly', () => {
    const wrapper = shallow(
        <SaveModal 
            saveName="Project"
            updateSaveName={jest.fn()}
            handleClose={jest.fn()}
            handleSave={jest.fn()}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('saveName prop is passed to input element correctly', () => {
    const wrapper = shallow(
        <SaveModal 
            saveName="Project"
            updateSaveName={jest.fn()}
            handleClose={jest.fn()}
            handleSave={jest.fn()}
        />
    );
    expect(wrapper.find('.modal__text-input').first().prop('value')).toBe('Project');
});

test('updateSaveName function is called onChange', () => {
    const mockedUpdateSaveName = jest.fn();
    const wrapper = shallow(
        <SaveModal 
            saveName="Project"
            updateSaveName={mockedUpdateSaveName}
            handleClose={jest.fn()}
            handleSave={jest.fn()}
        />
    );
    wrapper.find('.modal__text-input').first().simulate('change', { target: { value: 'new project name' } });
    expect(mockedUpdateSaveName.mock.calls[0][0]).toEqual({ target: { value: 'new project name' } });
});

test('handleSave is called when the appropriate action is taken', () => {
    const mockedHandleSave = jest.fn();
    const wrapper = shallow(
        <SaveModal 
            saveName="Project"
            updateSaveName={jest.fn()}
            handleClose={jest.fn()}
            handleSave={mockedHandleSave}
        />
    );
    wrapper.find('.button').at(1).simulate('click');
    expect(mockedHandleSave).toHaveBeenCalledTimes(1);
});

test('handleClose is called when the appropriate actin is taken', () => {
    const mockedHandleClose = jest.fn();
    const wrapper = shallow(
        <SaveModal 
            saveName="Project"
            updateSaveName={jest.fn()}
            handleClose={mockedHandleClose}
            handleSave={jest.fn()}
        />
    );
    wrapper.find('.button').at(0).simulate('click');
    expect(mockedHandleClose).toHaveBeenCalledTimes(1);
});