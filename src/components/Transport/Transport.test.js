import React from 'react';
import { shallow } from 'enzyme';
import { TransportContainer } from './';
import Transport from './Transport';
import Tone from 'tone';

jest.mock('tone');
Tone.Transport = { position: '0:0:0' };

test('container component renders correctly', () => {
    const component = shallow(
        <TransportContainer 
            isPlaying={false}
            isPaused={false}
            isMuted={false}
            bpm={120}
            volume={0}
            playTrack={jest.fn()}
            stopTrack={jest.fn()}
            pauseTrack={jest.fn()}
            setBPM={jest.fn()}
            saveState={jest.fn()}
            loadState={jest.fn()}
            openWindow={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
    expect(component.find(Transport)).toHaveLength(1);
});

test('container component dispatches playTrack and stopTrack actions correctly', () => {
    const mockedPlayTrack = jest.fn();
    const mockedStopTrack = jest.fn();
    const mockedPauseTrack = jest.fn();
    const component = shallow(
        <TransportContainer 
            isPlaying={false}
            isPaused={false}
            isMuted={false}
            bpm={120}
            volume={0}
            playTrack={mockedPlayTrack}
            stopTrack={mockedStopTrack}
            pauseTrack={mockedPauseTrack}
            setBPM={jest.fn()}
            saveState={jest.fn()}
            loadState={jest.fn()}
            openWindow={jest.fn()}
        />
    );
    expect(mockedPlayTrack).not.toHaveBeenCalled();
    component.first().shallow().find('button').at(0).simulate('click');
    expect(mockedPlayTrack).toHaveBeenCalledTimes(1);
    expect(mockedPauseTrack).not.toHaveBeenCalled();
    component.first().shallow().find('button').at(1).simulate('click');
    expect(mockedPauseTrack).toHaveBeenCalledTimes(1);
    expect(mockedStopTrack).not.toHaveBeenCalled();
    component.first().shallow().find('button').at(2).simulate('click');
    expect(mockedStopTrack).toHaveBeenCalledTimes(1);
});

test('presentational component renders correctly', () => {
    const component = shallow(
        <Transport 
            handleTransportBarClick={jest.fn()}
            playTrack={jest.fn()}
            stopTrack={jest.fn()}
            pauseTrack={jest.fn()}
            handleSkipToStart={jest.fn()}
            transportPosition={'1:2:3'}
            isEditingBPM={false}
            editedBPM={120}
            handleBPMChange={jest.fn()}
            inputRef={React.createRef()}
            enterBPMEditingMode={jest.fn()}
            bpm={120}
            handleLoadState={jest.fn()}
            handleSaveState={jest.fn()}
            enterSavingState={jest.fn()}
            exitSavingState={jest.fn()}
            enterLoadingState={jest.fn()}
            exitLoadingState={jest.fn()}
            isLoading={false}
            isSaving={false}
            handleOpenMixer={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});

