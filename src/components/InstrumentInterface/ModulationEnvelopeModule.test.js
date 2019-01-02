import React from 'react';
import { shallow } from 'enzyme';
import ModulationEnvelopeModule from './ModulationEnvelopeModule';
import { instrumentData } from '../../constants';

const modulationEnvelopeData = instrumentData.fmSynth.modulationEnvelope;

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