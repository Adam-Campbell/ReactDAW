import React from 'react';
import { shallow } from 'enzyme';
import NoteLayer from './NoteLayer';

const notesState = [
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
];


test('renders correctly', () => {
    const component = shallow(
        <NoteLayer 
            noteLayerRef={React.createRef()}
            sectionNotes={notesState}
            currentlySelectedNotes={[]}
            handleNoteClick={jest.fn()}
            canvasHeight={600}
            canvasWidth={650}
            handleMouseDown={jest.fn()}
            handleMouseUp={jest.fn()}
            handleMouseMove={jest.fn()}
            overlayRectRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});

test('renders selected notes with a different fill color', () => {
    const component = shallow(
        <NoteLayer 
            noteLayerRef={React.createRef()}
            handleNoteClick={jest.fn()}
            sectionNotes={notesState}
            currentlySelectedNotes={['5675315161385905']}
            canvasHeight={600}
            canvasWidth={650}
            handleMouseDown={jest.fn()}
            handleMouseUp={jest.fn()}
            handleMouseMove={jest.fn()}
            overlayRectRef={React.createRef()}
        />
    );
    const selectedNoteWrapper = component.find({ _id: '5675315161385905' });
    const unselectedNoteWrapper = component.find({ _id: '0867355891830822' });
    expect(selectedNoteWrapper).toHaveLength(1);
    expect(unselectedNoteWrapper).toHaveLength(1);
    expect(selectedNoteWrapper.first().props().fill).toBe('#222222');
    expect(unselectedNoteWrapper.first().props().fill).toBe('#ed90b9');
});