import React from 'react';
import { shallow } from 'enzyme';
import EffectsDetails from './EffectsDetails';

const effectsState = [
    {
        id: '3666421382061490',
        type: 'chorus',
        channelId: '3821569482884337',
        effectData: {
            delayTime: 3.5,
            depth: 0.7,
            frequency: 1.5,
            spread: 180,
            type: 'sine',
            wet: 1
        }
    }
];

test('renders correctly', () => {
    const component = shallow(
        <EffectsDetails 
            handleOpen={jest.fn()}
            handleRemove={jest.fn()}
            handleAdd={jest.fn()}
            handleChange={jest.fn()}
            effects={effectsState}
            effectTypeToAdd="chorus"
        />
    );
    expect(component).toMatchSnapshot();
});

