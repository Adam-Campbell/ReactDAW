import React from 'react';
import { shallow } from 'enzyme';
import VelocityLayer from './VelocityLayer';
import { Rect } from 'react-konva';
import { createSelectedAndUnselectedNoteArrays } from './PianoRollUtils';
import { UIColors } from '../../constants';

const sectionState = {
  notes: [
    {
      pitch: 'D4',
      time: '0:0:0',
      duration: '0:1:2',
      velocity: 1,
      _id: '5675315161385905',
      x: 0,
      y: 912,
      width: 144
    },
    {
      pitch: 'F4',
      time: '0:0:0',
      duration: '0:1:2',
      velocity: 1,
      _id: '0867355891830822',
      x: 0,
      y: 864,
      width: 144
    },
    {
      pitch: 'A4',
      time: '0:0:0',
      duration: '0:1:2',
      velocity: 1,
      _id: '4358545451844674',
      x: 0,
      y: 800,
      width: 144
    },
    {
      pitch: 'C4',
      time: '0:1:2',
      duration: '0:2:2',
      velocity: 1,
      _id: '9730238095311558',
      x: 144,
      y: 944,
      width: 240
    },
    {
      pitch: 'E4',
      time: '0:1:2',
      duration: '0:2:2',
      velocity: 1,
      _id: '6565913234069669',
      x: 144,
      y: 880,
      width: 240
    },
    {
      pitch: 'G4',
      time: '0:1:2',
      duration: '0:2:2',
      velocity: 1,
      _id: '6963004214787889',
      x: 144,
      y: 832,
      width: 240
    },
    {
      pitch: 'A3',
      time: '1:0:0',
      duration: '0:1:2',
      velocity: 1,
      _id: '3960778105288814',
      x: 384,
      y: 992,
      width: 144
    },
    {
      pitch: 'C4',
      time: '1:0:0',
      duration: '0:1:2',
      velocity: 1,
      _id: '5510520817714730',
      x: 384,
      y: 944,
      width: 144
    },
    {
      pitch: 'E4',
      time: '1:0:0',
      duration: '0:1:2',
      velocity: 1,
      _id: '0820163710562363',
      x: 384,
      y: 880,
      width: 144
    },
    {
      pitch: 'A#3',
      time: '1:1:2',
      duration: '0:2:2',
      velocity: 1,
      _id: '7970239089395446',
      x: 528,
      y: 976,
      width: 240
    },
    {
      pitch: 'D4',
      time: '1:1:2',
      duration: '0:2:2',
      velocity: 1,
      _id: '5322941918243851',
      x: 528,
      y: 912,
      width: 240
    },
    {
      pitch: 'F4',
      time: '1:1:2',
      duration: '0:2:2',
      velocity: 1,
      _id: '3869152627264943',
      x: 528,
      y: 864,
      width: 240
    }
  ]
};

const currentlySelectedNotes = ['5675315161385905', '0867355891830822', '4358545451844674'];

const { selectedNotes, unselectedNotes } = createSelectedAndUnselectedNoteArrays({
    currentlySelectedNotes,
    allSectionNotes: sectionState.notes
});


test('renders correctly', () => {
    const component = shallow(
        <VelocityLayer 
            stageHeight={600}
            canvasWidth={1536}
            velocityLayerRef={React.createRef()}
            selectedNotes={selectedNotes}
            unselectedNotes={unselectedNotes}
            addNotes={jest.fn()}
            removeNotes={jest.fn()}
            containerRef={React.createRef()}
            currentlySelectedNotes={currentlySelectedNotes}
            updateCurrentlySelectedNotes={jest.fn()}
            section={sectionState}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders selected and unselected velocity bars differently', () => {
    const component = shallow(
        <VelocityLayer 
            stageHeight={600}
            canvasWidth={1536}
            velocityLayerRef={React.createRef()}
            selectedNotes={selectedNotes}
            unselectedNotes={unselectedNotes}
            addNotes={jest.fn()}
            removeNotes={jest.fn()}
            containerRef={React.createRef()}
            currentlySelectedNotes={currentlySelectedNotes}
            updateCurrentlySelectedNotes={jest.fn()}
            section={sectionState}
        />
    );
    expect(component.find(Rect).filter({ fill: UIColors.pink })).toHaveLength(9);
    expect(component.find(Rect).filter({ fill: UIColors.lightPurple })).toHaveLength(3);
});