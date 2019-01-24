import React from 'react';
import { shallow } from 'enzyme';
import ScrollBarLayer from './ScrollBarLayer';

test('renders correctly', () => {
    const component = shallow(
        <ScrollBarLayer 
            stageHeight={600}
            stageWidth={800}
            padding={10}
            canvasWidth={1536}
            enterScrollBarActiveState={jest.fn()}
            gridLayerRef={React.createRef()}
            noteLayerRef={React.createRef()}
            transportLayerRef={React.createRef()}
            seekerLayerRef={React.createRef()}
            velocityLayerRef={React.createRef()}
            stageRef={React.createRef()}
            pianoKeyLayerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});
