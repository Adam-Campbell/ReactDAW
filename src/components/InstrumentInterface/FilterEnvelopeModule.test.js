import React from 'react';
import { shallow } from 'enzyme';
import FilterEnvelopeModule from './FilterEnvelopeModule';
import { instrumentData } from '../../constants';

const filterEnvelopeData = instrumentData.monoSynth.filterEnvelope;

test('renders correctly', () => {
    const component = shallow(
        <FilterEnvelopeModule 
            filterEnvelopeData={filterEnvelopeData}
            instrumentId="5542150612118159"
            additionalNesting={[]}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});