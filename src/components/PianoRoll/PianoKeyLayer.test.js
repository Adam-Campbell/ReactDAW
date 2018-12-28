import React from 'react';
import PianoKeyLayer from './PianoKeyLayer';
import { Rect } from 'react-konva';
import { shallow } from 'enzyme';
import { createPitchesArray } from '../../sharedUtils';

const mockedHandleClick = jest.fn();

test('renders correctly', () => {
    const component = shallow(
        <PianoKeyLayer 
            pianoKeyLayerRef={React.createRef()}
            handlePianoKeyClick={mockedHandleClick}
            pitchesArray={createPitchesArray()}
        />
    );
    expect(component).toMatchSnapshot();
});

test('correctly identifies the key clicked and passes that information to the callback', () => {
    const component = shallow(
        <PianoKeyLayer 
            pianoKeyLayerRef={React.createRef()}
            handlePianoKeyClick={mockedHandleClick}
            pitchesArray={createPitchesArray()}
        />
    );
    const C5Key = component.find(Rect).find({ pitch: 'C5' });
    C5Key.simulate('click', {});
    expect(mockedHandleClick).toHaveBeenCalled();
    expect(mockedHandleClick).toHaveBeenCalledWith({}, 'C5');
});