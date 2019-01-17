import React from 'react';
import { shallow } from 'enzyme';
import Switch from './';

test('renders correctly', () => {
    const wrapper = shallow(
        <Switch 
            value="option-one"
            handleChange={jest.fn()}
            rowDescription="Switch"
            optionsData={[
                { name: 'options', value: 'option-one', id: 'option-one', text: 'Option One' },
                { name: 'options', value: 'option-two', id: 'option-two', text: 'Option Two' },
            ]}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('a radio button and label are created for each option object passed in as a prop', () => {
    const wrapper = shallow(
        <Switch 
            value="option-one"
            handleChange={jest.fn()}
            rowDescription="Switch"
            optionsData={[
                { name: 'options', value: 'option-one', id: 'option-one', text: 'Option One' },
                { name: 'options', value: 'option-two', id: 'option-two', text: 'Option Two' },
            ]}
        />
    );
    const radioButtonsWrapper = wrapper.find('.switch__radio-button');
    const labelsWrapper = wrapper.find('.switch__label');
    expect(radioButtonsWrapper).toHaveLength(2);
    expect(labelsWrapper).toHaveLength(2);
    expect(radioButtonsWrapper.at(0).prop('id')).toBe('option-one');
    expect(radioButtonsWrapper.at(1).prop('id')).toBe('option-two');
    expect(labelsWrapper.at(0).prop('htmlFor')).toBe('option-one');
    expect(labelsWrapper.at(1).prop('htmlFor')).toBe('option-two');
});

test('handleChange is called when a change event is fired', () => {
    const mockedHandleChange = jest.fn();
    const wrapper = shallow(
        <Switch 
            value="option-one"
            handleChange={mockedHandleChange}
            rowDescription="Switch"
            optionsData={[
                { name: 'options', value: 'option-one', id: 'option-one', text: 'Option One' },
                { name: 'options', value: 'option-two', id: 'option-two', text: 'Option Two' },
            ]}
        />
    );
    expect(mockedHandleChange).toHaveBeenCalledTimes(0);
    wrapper.find('.switch__radio-button').at(1).simulate('change', { target: { value: 'option-two' } });
    expect(mockedHandleChange).toHaveBeenCalledTimes(1);
    expect(mockedHandleChange.mock.calls[0][0]).toBe('option-two');
});