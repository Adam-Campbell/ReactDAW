import React from 'react';
import { shallow } from 'enzyme';
import TransportLayer from './TransportLayer';

test('renders correctly', () => {
    const component = shallow(
        <TransportLayer 
            transportLayerRef={React.createRef()}
            canvasWidth={9600}
            seekerLineRef={React.createRef()}
            seekerLayerRef={React.createRef()}
        />
    );
    expect(component).toMatchSnapshot();
});