import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from './';

test('renders correctly', () => {
    const mockedHandleChange = jest.fn();
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
    const label = <label className="select-input__label pink" htmlFor="test-select-input">Just for testing</label>;
    expect(component).toMatchSnapshot();
    expect(component.contains(label)).toEqual(true);
});