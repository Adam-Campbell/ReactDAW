import React from 'react';
import { shallow } from 'enzyme';
import { ToolSelectionMenu } from './ToolSelectionMenu';
import { toolTypes } from '../../constants';

test('renders correctly', () => {
    const wrapper = shallow(
        <ToolSelectionMenu 
            toolType={toolTypes.cursor}
            setToolType={jest.fn()}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('renders a radio button for each tool type', () => {
    const wrapper = shallow(
        <ToolSelectionMenu 
            toolType={toolTypes.cursor}
            setToolType={jest.fn()}
        />
    );

    const radioButtonsWrapper = wrapper.find('.tool-selection-menu__radio-button');
    expect(radioButtonsWrapper).toHaveLength(3);
    expect(radioButtonsWrapper.at(0).prop('value')).toBe(toolTypes.cursor);
    expect(radioButtonsWrapper.at(1).prop('value')).toBe(toolTypes.pencil);
    expect(radioButtonsWrapper.at(2).prop('value')).toBe(toolTypes.selection); 
});

test(`the checked property on each checkbox is properly computed based on the value of the toolType prop 
passed to the component`, () => {
    const withCursorWrapper = shallow(
        <ToolSelectionMenu 
            toolType={toolTypes.cursor}
            setToolType={jest.fn()}
        />
    );
    const withCursorRBWrapper = withCursorWrapper.find('.tool-selection-menu__radio-button');
    expect(withCursorRBWrapper.at(0).prop('checked')).toBe(true);
    expect(withCursorRBWrapper.at(1).prop('checked')).toBe(false);
    expect(withCursorRBWrapper.at(2).prop('checked')).toBe(false);

    const withPencilWrapper = shallow(
        <ToolSelectionMenu 
            toolType={toolTypes.pencil}
            setToolType={jest.fn()}
        />
    );
    const withPencilRBWrapper = withPencilWrapper.find('.tool-selection-menu__radio-button');
    expect(withPencilRBWrapper.at(0).prop('checked')).toBe(false);
    expect(withPencilRBWrapper.at(1).prop('checked')).toBe(true);
    expect(withPencilRBWrapper.at(2).prop('checked')).toBe(false);
});

test('correctly calls the supplied callback when a change event occurs', () => {
    const mockedSetToolType = jest.fn();
    const wrapper = shallow(
        <ToolSelectionMenu 
            toolType={toolTypes.cursor}
            setToolType={mockedSetToolType}
        />
    );
    wrapper.find('.tool-selection-menu__radio-button').at(1).simulate('change', { 
        target: { 
            value: toolTypes.pencil 
        } 
    });
    expect(mockedSetToolType).toHaveBeenCalledTimes(1);
    expect(mockedSetToolType.mock.calls[0][0]).toBe(toolTypes.pencil);
    wrapper.find('.tool-selection-menu__radio-button').at(2).simulate('change', { 
        target: { 
            value: toolTypes.selection 
        } 
    });
    expect(mockedSetToolType).toHaveBeenCalledTimes(2);
    expect(mockedSetToolType.mock.calls[1][0]).toBe(toolTypes.selection);
});