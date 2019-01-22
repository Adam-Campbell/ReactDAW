import React from 'react';
import { shallow } from 'enzyme';
import { NoteSettingsMenu } from './NoteSettingsMenu';
import { snapSettings, noteDurationSettings } from '../../constants';
import SelectInput from '../SelectInput';

test('renders correctly', () => {
    const wrapper = shallow(
        <NoteSettingsMenu 
            snap={snapSettings._16n}
            noteDuration={noteDurationSettings._16n}
            setSnap={jest.fn()}
            setNoteDuration={jest.fn()}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test('renders a SelectInputs for snap and noteDuration', () => {
    const wrapper = shallow(
        <NoteSettingsMenu 
            snap={snapSettings._16n}
            noteDuration={noteDurationSettings._16n}
            setSnap={jest.fn()}
            setNoteDuration={jest.fn()}
        />
    );
    expect(wrapper.find(SelectInput)).toHaveLength(2);
    expect(wrapper.find(SelectInput).at(0).prop('value')).toBe(snapSettings._16n);
    expect(wrapper.find(SelectInput).at(1).prop('value')).toBe(noteDurationSettings._16n);
});

test('SelectInputs properly reflect the props passed in', () => {
    const firstStateWrapper = shallow(
        <NoteSettingsMenu 
            snap={snapSettings._16n}
            noteDuration={noteDurationSettings._16n}
            setSnap={jest.fn()}
            setNoteDuration={jest.fn()}
        />
    );
    expect(firstStateWrapper.find(SelectInput).at(0).prop('value')).toBe(snapSettings._16n);
    expect(firstStateWrapper.find(SelectInput).at(1).prop('value')).toBe(noteDurationSettings._16n);

    const secondStateWrapper = shallow(
        <NoteSettingsMenu 
            snap={snapSettings._8n}
            noteDuration={noteDurationSettings._4n}
            setSnap={jest.fn()}
            setNoteDuration={jest.fn()}
        />
    );
    expect(secondStateWrapper.find(SelectInput).at(0).prop('value')).toBe(snapSettings._8n);
    expect(secondStateWrapper.find(SelectInput).at(1).prop('value')).toBe(noteDurationSettings._4n);
});

test('SelectInputs call the correct callback functions on change, with the correct arguments', () => {
    const mockedSetSnap = jest.fn();
    const mockedSetNoteDuration = jest.fn();
    const wrapper = shallow(
        <NoteSettingsMenu 
            snap={snapSettings._16n}
            noteDuration={noteDurationSettings._16n}
            setSnap={mockedSetSnap}
            setNoteDuration={mockedSetNoteDuration}
        />
    );
    wrapper.find(SelectInput).at(0).shallow().find('.select-input').simulate('change', {
        target: {
            value: snapSettings._2n
        }
    });
    expect(mockedSetSnap).toHaveBeenCalledTimes(1);
    expect(mockedSetSnap.mock.calls[0][0]).toBe(snapSettings._2n);

    wrapper.find(SelectInput).at(1).shallow().find('.select-input').simulate('change', {
        target: {
            value: noteDurationSettings._4n
        }
    });
    expect(mockedSetNoteDuration).toHaveBeenCalledTimes(1);
    expect(mockedSetNoteDuration.mock.calls[0][0]).toBe(noteDurationSettings._4n);
});