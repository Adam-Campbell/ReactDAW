import React from 'react';
import { shallow } from 'enzyme';
import LoadModal from './LoadModal';

describe('LoadModal', () => {

    test('renders correctly', () => {
        const wrapper = shallow(
            <LoadModal 
                handleClose={jest.fn()}
                handleLoad={jest.fn()}
                savedTracks={['Track One', 'Track Two']}
            />
        ); 
        expect(wrapper).toMatchSnapshot();
    });

    test('renders a list item for each track in props.savedTracks', () => {
        const wrapper = shallow(
            <LoadModal 
                handleClose={jest.fn()}
                handleLoad={jest.fn()}
                savedTracks={['Track One', 'Track Two']}
            />
        ); 
        expect(wrapper.find('.modal__list-item')).toHaveLength(2);
        expect(wrapper.find('.modal__list-item').at(0).text()).toBe('Track One');
        expect(wrapper.find('.modal__list-item').at(1).text()).toBe('Track Two');
    });

    test('handleLoad is called with the appropriate argument depending on which list item is clicked on', () => {
        const mockedHandleLoad = jest.fn();
        const wrapper = shallow(
            <LoadModal 
                handleClose={jest.fn()}
                handleLoad={mockedHandleLoad}
                savedTracks={['Track One', 'Track Two']}
            />
        ); 
        wrapper.find('.modal__list-item').at(0).simulate('click');
        expect(mockedHandleLoad).toHaveBeenCalledTimes(1);
        expect(mockedHandleLoad.mock.calls[0][0]).toBe('Track One');
        wrapper.find('.modal__list-item').at(1).simulate('click');
        expect(mockedHandleLoad).toHaveBeenCalledTimes(2);
        expect(mockedHandleLoad.mock.calls[1][0]).toBe('Track Two');
    });

    test('handleClose is called when the appropriate action is taken', () => {
        const mockedHandleClose = jest.fn();
        const wrapper = shallow(
            <LoadModal 
                handleClose={mockedHandleClose}
                handleLoad={jest.fn()}
                savedTracks={['Track One', 'Track Two']}
            />
        ); 
        wrapper.find('.button').first().simulate('click');
        expect(mockedHandleClose).toHaveBeenCalledTimes(1);
    });

});