import React from 'react';
import { shallow } from 'enzyme';
import ModulationEnvelopeModule from './ModulationEnvelopeModule';
import { synthData } from '../../constants';

const modulationEnvelopeData = synthData.fmSynth.modulationEnvelope;

test('renders correctly', () => {
    const component = shallow(
        <ModulationEnvelopeModule 
            modulationEnvelopeData={modulationEnvelopeData}
            instrumentId="5542150612118159"
            additionalNesting={[]}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});