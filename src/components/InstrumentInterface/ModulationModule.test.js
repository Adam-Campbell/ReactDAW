import React from 'react';
import { shallow } from 'enzyme';
import ModulationModule from './ModulationModule';
import { synthData } from '../../constants';

const modulationData = synthData.fmSynth.modulation;

test('renders correctly', () => {
    const component = shallow(
        <ModulationModule 
            modulationData={modulationData}
            instrumentId="5542150612118159"
            additionalNesting={[]}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});