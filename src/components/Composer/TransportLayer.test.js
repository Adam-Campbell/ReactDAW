import React from 'react';
import { shallow } from 'enzyme';
import TransportLayer from './TransportLayer';

test('renders correctly', () => {
    const component = shallow(
        <TransportLayer 
            transportLayerRef={React.createRef()}
            canvasWidth={9600}
        />
    );
    expect(component).toMatchSnapshot();
});