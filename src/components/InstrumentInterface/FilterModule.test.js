import React from 'react';
import { shallow } from 'enzyme';
import FilterModule from './FilterModule';
import { instrumentData } from '../../constants';

const filterData = instrumentData.monoSynth.filter;

test('renders correctly', () => {
    const component = shallow(
        <FilterModule 
            filterData={filterData}
            instrumentId="5542150612118159"
            additionalNesting={[]}
            handleChange={jest.fn()}
        />
    );
    expect(component).toMatchSnapshot();
});