import React from 'react';
import { shallow } from 'enzyme';
import { SaveModalContainer } from './';
import SaveModal from './SaveModal';

test('renders the presentational component', () => {
    const wrapper = shallow(
        <SaveModalContainer 
            saveState={jest.fn()}
            closeModal={jest.fn()}
            setCompositionSaveName={jest.fn()}
        />
    );
    expect(wrapper.find(SaveModal)).toHaveLength(1);
});

test('updates state.saveName correctly', () => {
    const wrapper = shallow(
        <SaveModalContainer 
            saveState={jest.fn()}
            closeModal={jest.fn()}
            setCompositionSaveName={jest.fn()}
        />
    );
    expect(wrapper.state('saveName')).toBe('');
    wrapper.instance().updateSaveName({ target: { value: 'new project name' } });
    expect(wrapper.state('saveName')).toBe('new project name');
});

test('handleSave method calls the appropriate functions with the correct arguments', () => {
    const mockedSaveState = jest.fn();
    const mockedCloseModal = jest.fn();
    const mockedSetCompositionName = jest.fn();
    const wrapper = shallow(
        <SaveModalContainer 
            saveState={mockedSaveState}
            closeModal={mockedCloseModal}
            setCompositionSaveName={mockedSetCompositionName}
        />
    );
    wrapper.instance().updateSaveName({ target: { value: 'new project name' } });
    wrapper.instance().handleSave();
    expect(mockedSetCompositionName).toHaveBeenCalledTimes(1);
    expect(mockedSetCompositionName.mock.calls[0][0]).toBe('new project name');
    expect(mockedSaveState).toHaveBeenCalledTimes(1);
    expect(mockedSaveState.mock.calls[0][0]).toBe('[track_name] new project name');
    expect(mockedCloseModal).toHaveBeenCalledTimes(1);
});
