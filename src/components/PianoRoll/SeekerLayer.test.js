import React from 'react';
import { shallow } from 'enzyme';
import SeekerLayer from './SeekerLayer';

test('renders correctly', () => {
    const component = shallow(
        <SeekerLayer 
            seekerLayerRef={React.createRef()}
            seekerLineRef={React.createRef()}
            canvasHeight={1768}
        />
    );
    expect(component).toMatchSnapshot();
}) 