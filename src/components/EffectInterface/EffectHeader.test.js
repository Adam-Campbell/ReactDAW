import React from 'react';
import { shallow } from 'enzyme';
import EffectHeader from './EffectHeader';

test('renders correctly', () => {
    const component = shallow(
        <EffectHeader 
            effectTitle="Chorus"
        />
    );
    expect(component).toMatchSnapshot();
    const title = <h1 className="effect__title">Chorus</h1>
    expect(component.contains(title)).toEqual(true);
});