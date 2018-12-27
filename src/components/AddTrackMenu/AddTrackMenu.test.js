import React from 'react';
import { shallow } from 'enzyme';
import { AddTrackMenuContainer } from './';
import AddTrackMenu from './AddTrackMenu';

const mockedAddChannel = jest.fn();

test('container component renders correctly', () => {
    const component = shallow(
        <AddTrackMenuContainer 
            numberOfChannels={0}
            addChannel={mockedAddChannel}
        />
    );
    expect(component).toMatchSnapshot();
    expect(component.find(AddTrackMenu)).toHaveLength(1);
});

test('presentational component renders correctly', () => {
    const component = shallow(
        <AddTrackMenu 
            menuIsOpen={true}
            openMenu={jest.fn()}
            closeMenu={jest.fn()}
            handleAddChannel={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});

test('component handles switching between open and closed states correctly', () => {
    const component = shallow(
        <AddTrackMenuContainer 
            numberOfChannels={0}
            addChannel={mockedAddChannel}
        /> 
    );
    expect(component.find(AddTrackMenu).props().menuIsOpen).toEqual(false);
    component.instance().openMenu();
    expect(component.find(AddTrackMenu).props().menuIsOpen).toEqual(true);
    component.instance().closeMenu();
    expect(component.find(AddTrackMenu).props().menuIsOpen).toEqual(false);
});

test('component calls the addTrack handler when a list item is clicked', () => {
    const component = shallow(
        <AddTrackMenuContainer 
            numberOfChannels={2}
            addChannel={mockedAddChannel}
        /> 
    );
    const presentational = component.first().shallow();
    expect(mockedAddChannel).not.toHaveBeenCalled();
    presentational.find('li.add-track-menu__menu-item').first().simulate('click');
    expect(mockedAddChannel).toHaveBeenCalledTimes(1);
    expect(mockedAddChannel.mock.calls[mockedAddChannel.mock.calls.length-1][1]).toBe('Channel 3');
});