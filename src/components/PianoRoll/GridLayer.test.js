import React from 'react';
import GridLayer from './GridLayer';
import { shallow } from 'enzyme';
import { createGridLinesArray } from './PianoRollUtils';
import Tone from 'tone';

jest.mock('tone');

const gridLinesArray = createGridLinesArray({
    sectionBars: 4,
    canvasWidth: 1536,
    canvasGridHeight: 1728,
    currentQuantizeValue: '16n'
});

test('renders correctly', () => {
    const component = shallow(
        <GridLayer 
            gridLayerRef={React.createRef()}
            canvasWidth={1536}
            gridLinesArray={gridLinesArray}
        />
    );
    expect(component).toMatchSnapshot();
});