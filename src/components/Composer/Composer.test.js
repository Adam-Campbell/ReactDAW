import React from 'react';
import { shallow } from 'enzyme';
import Composer from './Composer';
import { 
    createGridLinesArray,
    createSectionRectsArray 
} from './ComposerUtils';

const channelsState = [
    {
      id: '6984087700822156',
      name: 'Channel 1',
      color: '#d86597',
      instrumentId: '0374798538126734',
      effectIds: [],
      sectionIds: [
        '7009247242625234'
      ]
    }
];

const sectionsState = {
    '7009247242625234': {
      id: '7009247242625234',
      channelId: '6984087700822156',
      notes: [],
      start: '0:0:0',
      numberOfBars: 4
    }
};

const gridLinesArray = createGridLinesArray({
    canvasHeight: 320,
    canvasWidth: 9600,
    channelsArrayLength: 1
});

const sectionRectsArray = createSectionRectsArray({
    allChannels: channelsState,
    allSections: sectionsState
});

test('renders correctly', () => {
    const component = shallow(
        <Composer 
            stageRef={React.createRef()}
            gridLayerRef={React.createRef()}
            sectionsLayerRef={React.createRef()}
            transportLayerRef={React.createRef()}
            seekerLayerRef={React.createRef()}
            seekerLineRef={React.createRef()}
            canvasWidth={9600}
            canvasHeight={320}
            stageHeight={300}
            stageWidth={740}
            scrollPadding={10}
            gridLinesArray={gridLinesArray}
            sectionRectsArray={sectionRectsArray}
            cursorValue={'pointer'}
            durationValue={4}
            handleKeyDown={jest.fn()}
            handleKeyUp={jest.fn()}
            updateCursorValue={jest.fn()}
            updateDurationValue={jest.fn()}
            handleStageClick={jest.fn()}
            handleStageMouseDown={jest.fn()}
            handleStageMouseUp={jest.fn()}
            handleSectionClick={jest.fn()}
            handleSectionDoubleClick={jest.fn()}
            verticalDragMove={jest.fn()}
            horizontalDragMove={jest.fn()}
            updateSelectedChannel={jest.fn()}
            handleScrollBarClickEvents={jest.fn()}
            trackInfoMenuTopScroll={0}
            channels={channelsState}
            currentlySelectedSections={[]}
            currentlySelectedChannel='6984087700822156'
            shiftKeyPressed={false}
        />
    );
    expect(component).toMatchSnapshot();
});