import React from 'react';
import { shallow } from 'enzyme';
import ScrollBarLayer from './ScrollBarLayer';

test('renders correctly', () => {
    const component = shallow(
        <ScrollBarLayer 
            stageHeight={300}
            stageWidth={740}
            scrollPadding={10}
            canvasWidth={960}
            enterScrollBarActiveState={jest.fn()}
            gridLayerRef={React.createRef()}
            sectionsLayerRef={React.createRef()}
            transportLayerRef={React.createRef()}
            seekerLayerRef={React.createRef()}
            stageRef={React.createRef()}
            updateTrackInfoMenuTopScroll={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});