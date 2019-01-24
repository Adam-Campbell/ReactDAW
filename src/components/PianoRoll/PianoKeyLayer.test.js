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
            pitchesArray={createPitchesArray()}
            channelId="9132467532619432"
        />
    );
    expect(component).toMatchSnapshot();
});

test('correctly identifies the key clicked and passes that information to the callback', () => {
    const mockedTriggerAttackRelease = jest.fn()
    global.instrumentReferences = {
        '9132467532619432': {
            triggerAttackRelease: mockedTriggerAttackRelease
        }
    };
    const component = shallow(
        <PianoKeyLayer 
            pianoKeyLayerRef={React.createRef()}
            pitchesArray={createPitchesArray()}
            channelId="9132467532619432"
        />
    );
    const C5Key = component.find(Rect).find({ pitch: 'C5' });
    C5Key.simulate('click', {});
    expect(mockedTriggerAttackRelease).toHaveBeenCalledTimes(1);
    expect(mockedTriggerAttackRelease).toHaveBeenCalledWith('C5', '8n');
});