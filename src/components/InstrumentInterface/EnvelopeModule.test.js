import React from 'react';
import { shallow } from 'enzyme';
import EnvelopeModule from './EnvelopeModule';
import { instrumentData } from '../../constants';

const envelopeData = instrumentData.synth.envelope;

test('renders correctly', () => {
    const component = shallow(
        <EnvelopeModule 
            envelopeData={envelopeData}
            instrumentId="5542150612118159"
            additionalNesting={[]}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});