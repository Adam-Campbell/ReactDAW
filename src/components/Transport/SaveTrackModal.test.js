import React from 'react';
import { shallow } from 'enzyme';
import SaveTrackModal from './SaveTrackModal';

test('renders correctly', () => {
    const component = shallow(
        <SaveTrackModal 
            handleClose={jest.fn()}
            handleSave={jest.fn()}
            updateSaveName={jest.fn()}
            saveName="New Track"
        />
    );
    expect(component).toMatchSnapshot();
});
