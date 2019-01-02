import React from 'react';
import { shallow } from 'enzyme';
import DrumModule from './DrumModule';
import { drumSampleURLs } from '../../constants';

test('renders correctly', () => {
    const component = shallow(
        <DrumModule 
            drumType="kick"
            drumName="Kick"
            drumData={{
                sample: drumSampleURLs.kick001,
                volume: 0,
                pan: 0
            }}
            instrumentId="4626753126497532"
            handleChange={jest.fn()}
            drumSampleOptions={[
                { value: drumSampleURLs.kick001, text: 'Kick 001' },
                { value: drumSampleURLs.kick002, text: 'Kick 002' },
                { value: drumSampleURLs.kick003, text: 'Kick 003' },
                { value: drumSampleURLs.kick004, text: 'Kick 004' },
                { value: drumSampleURLs.kick005, text: 'Kick 005' }
            ]}
        />
    );
    expect(component).toMatchSnapshot();
});