import React from 'react';
import { shallow } from 'enzyme';
import XSDial from './';

test('renders correctly', () => {
    const wrapper = shallow(
        <XSDial 
            label="Test Dial"
            startInteraction={jest.fn()}
            updateInteraction={jest.fn()}
            endInteraction={jest.fn()}
            updateValueCallback={jest.fn()}
            handleKeyDown={jest.fn()}
            handleClick={jest.fn()}
            dialRef={React.createRef()}
            angle={-180}
            value={50}
            dataMin={0}
            dataMax={100}
            stepSize={5}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('the angle passed as a prop is used to set the style prop on the dial node', () => {
    const wrapper = shallow(
        <XSDial 
            label="Test Dial"
            startInteraction={jest.fn()}
            updateInteraction={jest.fn()}
            endInteraction={jest.fn()}
            updateValueCallback={jest.fn()}
            handleKeyDown={jest.fn()}
            handleClick={jest.fn()}
            dialRef={React.createRef()}
            angle={-83}
            value={50}
            dataMin={0}
            dataMax={100}
            stepSize={5}
        />
    );
    expect(wrapper.find('.xs-dial').first().prop('style')).toEqual({ transform: 'rotate(-83deg)' });
});

test(`the functions for starting, updating and ending interactions with the dial are fired 
    appropriately for mouse and touch events`, () => {
    const mockedStartInteraction = jest.fn();
    const mockedUpdateInteraction = jest.fn();
    const mockedEndInteraction = jest.fn();
    const wrapper = shallow(
        <XSDial 
            label="Test Dial"
            startInteraction={mockedStartInteraction}
            updateInteraction={mockedUpdateInteraction}
            endInteraction={mockedEndInteraction}
            updateValueCallback={jest.fn()}
            handleKeyDown={jest.fn()}
            handleClick={jest.fn()}
            dialRef={React.createRef()}
            angle={-83}
            value={50}
            dataMin={0}
            dataMax={100}
            stepSize={5}
        />
    );
    // test mouse events
    wrapper.find('.xs-dial__container').first().simulate('mouseDown');
    expect(mockedStartInteraction).toHaveBeenCalledTimes(1);
    wrapper.find('.xs-dial__container').first().simulate('mouseMove', { clientX: 50, clientY: 30, persist: () => {} });
    expect(mockedUpdateInteraction).toHaveBeenCalledTimes(1);
    expect(mockedUpdateInteraction.mock.calls[0][0]).toEqual(
        expect.objectContaining({
            clientX: 50,
            clientY: 30
        })
    );
    wrapper.find('.xs-dial__container').first().simulate('mouseUp');
    expect(mockedEndInteraction).toHaveBeenCalledTimes(1);
    // test touch events
    wrapper.find('.xs-dial__container').first().simulate('touchStart');
    expect(mockedStartInteraction).toHaveBeenCalledTimes(2);
    wrapper.find('.xs-dial__container').first().simulate('touchMove', { 
        clientX: 60, 
        clientY: 40, 
        persist: () => {},
        preventDefault: () => {} 
    });
    expect(mockedUpdateInteraction).toHaveBeenCalledTimes(2);
    expect(mockedUpdateInteraction.mock.calls[1][0]).toEqual(
        expect.objectContaining({
            clientX: 60,
            clientY: 40
        })
    );
    wrapper.find('.xs-dial__container').first().simulate('touchEnd');
    expect(mockedEndInteraction).toHaveBeenCalledTimes(2);
});

test('handleKeyDown and handleClick functions are fired when their corresponding events occur', () => {
    const mockedHandleKeyDown = jest.fn();
    const mockedHandleClick = jest.fn();
    const wrapper = shallow(
        <XSDial 
            label="Test Dial"
            startInteraction={jest.fn()}
            updateInteraction={jest.fn()}
            endInteraction={jest.fn()}
            updateValueCallback={jest.fn()}
            handleKeyDown={mockedHandleKeyDown}
            handleClick={mockedHandleClick}
            dialRef={React.createRef()}
            angle={-83}
            value={50}
            dataMin={0}
            dataMax={100}
            stepSize={5}
        />
    );
    wrapper.find('.xs-dial__container').first().simulate('keyDown', { key: 'A' });
    expect(mockedHandleKeyDown).toHaveBeenCalledTimes(1);
    expect(mockedHandleKeyDown.mock.calls[0][0]).toEqual({ key: 'A' });
    wrapper.find('.xs-dial__container').first().simulate('click');
    expect(mockedHandleClick).toHaveBeenCalledTimes(1);
});

test('updateValueCallback function gets called correctly', () => {
    const mockedUpdateValueCallback = jest.fn();
    const wrapper = shallow(
        <XSDial 
            label="Test Dial"
            startInteraction={jest.fn()}
            updateInteraction={jest.fn()}
            endInteraction={jest.fn()}
            updateValueCallback={mockedUpdateValueCallback}
            handleKeyDown={jest.fn()}
            handleClick={jest.fn()}
            dialRef={React.createRef()}
            angle={-83}
            value={50}
            dataMin={0}
            dataMax={100}
            stepSize={5}
        />
    );
    wrapper.find('.xs-dial__number-input').first().simulate('change', { target: { value: '45' } });
    expect(mockedUpdateValueCallback).toHaveBeenCalledTimes(1);
    expect(mockedUpdateValueCallback.mock.calls[0][0]).toEqual(45);
});