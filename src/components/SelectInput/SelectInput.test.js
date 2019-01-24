import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from './';

const mockedHandleChange = jest.fn();

test('renders correctly', () => {
    const component = shallow(
        <SelectInput 
            inputId="test-select-input"
            label="Just for testing"
            value="optionOne"
            handleChange={mockedHandleChange}
            options={[
                { value: 'optionOne', text: 'Option One' },
                { value: 'optionTwo', text: 'Option Two' }
            ]}
        />
    );
    expect(component).toMatchSnapshot();
});

test('passes props through correctly', () => {
    const firstOption = shallow(
        <SelectInput 
            inputId="test-select-input"
            label="First option selected"
            value="optionOne"
            handleChange={mockedHandleChange}
            options={[
                { value: 'optionOne', text: 'Option One' },
                { value: 'optionTwo', text: 'Option Two' }
            ]}
        />
    );
    const labelOne = <label className="select-input__label pink " htmlFor="test-select-input">First option selected</label>;
    expect(firstOption.contains(labelOne)).toEqual(true);
    expect(firstOption.find('select.select-input').props().value).toBe('optionOne');

    const secondOption = shallow(
        <SelectInput 
            inputId="test-select-input"
            label="Second option selected"
            value="optionTwo"
            handleChange={mockedHandleChange}
            options={[
                { value: 'optionOne', text: 'Option One' },
                { value: 'optionTwo', text: 'Option Two' }
            ]}
        />
    );
    const labelTwo = <label className="select-input__label pink " htmlFor="test-select-input">Second option selected</label>;
    expect(secondOption.contains(labelTwo)).toEqual(true);
    expect(secondOption.find('select.select-input').props().value).toBe('optionTwo');
});

test('calls the callback function when change event occurs', () => {
    const component = shallow(
        <SelectInput 
            inputId="test-select-input"
            label="Just for testing"
            value="optionOne"
            handleChange={mockedHandleChange}
            options={[
                { value: 'optionOne', text: 'Option One' },
                { value: 'optionTwo', text: 'Option Two' }
            ]}
        />
    ); 
    expect(mockedHandleChange).not.toHaveBeenCalled();
    component.find('select.select-input').simulate('change', { target: { value: 'optionTwo' } });
    expect(mockedHandleChange).toHaveBeenCalledTimes(1);
});

