import React from 'react';
import { shallow } from 'enzyme';
import GridLayer from './GridLayer';
import { createGridLinesArray } from './ComposerUtils';

const gridLinesArray = createGridLinesArray({
    canvasHeight: 320,
    canvasWidth: 9600,
    channelsArrayLength: 1
});

test('renders correctly', () => {
    const component = shallow(
        <GridLayer 
            gridLayerRef={React.createRef()}
            canvasWidth={9600}
            canvasHeight={320}
            gridLinesArray={gridLinesArray}
        />
    );
    expect(component).toMatchSnapshot();
});