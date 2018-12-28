import React from 'react';
import { TrackInfoContainer } from './';
import TrackInfo from './TrackInfo';
import TrackColorSwatch from './TrackColorSwatch';
import { shallow } from 'enzyme';
import { UIColors } from '../../constants';

const channelsState = [
    {
      id: '2481615053298156',
      name: 'Channel 1',
      color: '#d86597',
      instrumentId: '1496404507349548',
      effectIds: [],
      sectionIds: [],
      isMuted: false,
      isSolo: false,
      volume: 0,
      pan: 0
    },
    {
      id: '0271578528326165',
      name: 'Channel 2',
      color: '#d86597',
      instrumentId: '0446480036600608',
      effectIds: [],
      sectionIds: [],
      isMuted: false,
      isSolo: false,
      volume: 0,
      pan: 0
    },
    {
      id: '9060864310622598',
      name: 'Channel 3',
      color: '#d86597',
      instrumentId: '8229538223456731',
      effectIds: [],
      sectionIds: [],
      isMuted: false,
      isSolo: false,
      volume: 0,
      pan: 0
    }
];

test('container component renders correctly', () => {
    const component = shallow(
        <TrackInfoContainer 
           trackId="2481615053298156"
           isSelected={false}
           updateSelectedChannel={jest.fn()}
           channels={channelsState}
           updateChannelName={jest.fn()}
           updateChannelColor={jest.fn()}
           removeChannel={jest.fn()}
           openWindow={jest.fn()} 
        />
    );
    expect(component).toMatchSnapshot();
});

test('presentational component renders correctly', () => {
    const component = shallow(
        <TrackInfo 
            inputRef={React.createRef()}
            swatchNodeRef={React.createRef()}
            isSelected={false}
            isEditingName={false}
            isEditingTrackColor={false}
            isMuted={false}
            isSolo={false}
            trackName="Channel 1"
            trackColor={UIColors.pink}
            handleContainerClick={jest.fn()}
            updateTrackName={jest.fn()}
            handleInputKeyPress={jest.fn()}
            enterNameEditMode={jest.fn()}
            handleMuteButtonClick={jest.fn()}
            handleSoloButtonClick={jest.fn()}
            handleSettingsButtonClick={jest.fn()}
            handleDeleteButtonClick={jest.fn()}
            enterColorEditMode={jest.fn()}
            exitColorEditMode={jest.fn()}
            handleColorSwatchClick={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});
