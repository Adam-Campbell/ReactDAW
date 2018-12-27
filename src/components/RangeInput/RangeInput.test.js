import React from 'react';
import { shallow } from 'enzyme';
import RangeInput from './';

const mockedHandleChange = jest.fn();

test('renders correctly', () => {
    const component = shallow(
        <RangeInput 
            inputId="test-range-input"
            label="Just for testing"
            min={0}
            max={100}
            step={1}
            value={5}
            handleChange={mockedHandleChange}
        />
    );
    expect(component).toMatchSnapshot();
});

test('passes props through correctly', () => {
    const first = shallow(
        <RangeInput 
            inputId="test-range-input"
            label="Value is 10"
            min={0}
            max={100}
            step={1}
            value={10}
            handleChange={mockedHandleChange}
        />
    );
    const labelOne = <label className="range-input__label" htmlFor="test-range-input">Value is 10</label>;
    expect(first.contains(labelOne)).toEqual(true);
    expect(first.find('input.range-input').props().value).toBe(10);
    const second = shallow(
        <RangeInput 
            inputId="test-range-input"
            label="Value is 25"
            min={0}
            max={100}
            step={1}
            value={25}
            handleChange={mockedHandleChange}
        />
    );
    const labelTwo = <label className="range-input__label" htmlFor="test-range-input">Value is 25</label>;
    expect(second.contains(labelTwo)).toEqual(true);
    expect(second.find('input.range-input').props().value).toBe(25);
});

test('calls the callback function when a change event occurs', () => {
    const component = shallow(
        <RangeInput 
            inputId="test-range-input"
            label="Just for testing"
            min={0}
            max={100}
            step={1}
            value={5}
            handleChange={mockedHandleChange}
        />
    );
    expect(component).toMatchSnapshot();
    expect(mockedHandleChange).not.toHaveBeenCalled();
    component.find('input.range-input').simulate('change', { target: { value: 10 } });
    expect(mockedHandleChange).toHaveBeenCalledTimes(1);
});

