import React from 'react';
import { shallow } from 'enzyme';
import SectionsLayer from './SectionsLayer';
import { createSectionRectsArray } from './ComposerUtils';
import { UIColors } from '../../constants';

const channelsState = [
    {
      id: '6984087700822156',
      name: 'Channel 1',
      color: UIColors.pink,
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

const sectionRectsArray = createSectionRectsArray({
    allChannels: channelsState,
    allSections: sectionsState
});

test('renders correctly', () => {
    const component = shallow(
        <SectionsLayer 
            sectionsLayerRef={React.createRef()}
            updateCurrentlySelectedSections={jest.fn()}
            sectionRectsArray={sectionRectsArray}
            currentlySelectedSections={[]}
            canvasHeight={320}
            canvasWidth={1200}
            handleMouseDown={jest.fn()}
            handleMouseUp={jest.fn()}
            handleMouseMove={jest.fn()}
            overlayRectRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders selected and unselected sections with different fill colors', () => {
    const noSelection = shallow(
        <SectionsLayer 
            sectionsLayerRef={React.createRef()}
            updateCurrentlySelectedSections={jest.fn()}
            sectionRectsArray={sectionRectsArray}
            currentlySelectedSections={[]}
            canvasHeight={320}
            canvasWidth={1200}
            handleMouseDown={jest.fn()}
            handleMouseUp={jest.fn()}
            handleMouseMove={jest.fn()}
            overlayRectRef={React.createRef()}
        />
    );
    const withSelection = shallow(
        <SectionsLayer 
            sectionsLayerRef={React.createRef()}
            updateCurrentlySelectedSections={jest.fn()}
            sectionRectsArray={sectionRectsArray}
            currentlySelectedSections={['7009247242625234']}
            canvasHeight={320}
            canvasWidth={1200}
            handleMouseDown={jest.fn()}
            handleMouseUp={jest.fn()}
            handleMouseMove={jest.fn()}
            overlayRectRef={React.createRef()}
        />
    );
    expect(noSelection.find({ sectionId: '7009247242625234' }).props().fill)
    .toBe(UIColors.pink);
    expect(withSelection.find({ sectionId: '7009247242625234' }).props().fill)
    .toBe(UIColors.darkGrey);
});

