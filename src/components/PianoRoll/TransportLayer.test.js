import React from 'react';
import { shallow } from 'enzyme';
import TransportLayer from './TransportLayer';
import { createTransportBarNumbersArray } from './PianoRollUtils';

const transportBarNumbersArray = createTransportBarNumbersArray({
    sectionStart: '0:0:0',
    sectionBars: 4
});

test('renders correctly', () => {
    const component = shallow(
        <TransportLayer 
            transportLayerRef={React.createRef()}
            canvasWidth={1536}
            transportBarNumbersArray={transportBarNumbersArray}
            seekerLineRef={React.createRef()}
            seekerLayerRef={React.createRef()}
            snap="16n"
            sectionStart="0:0:0"
            containerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});

