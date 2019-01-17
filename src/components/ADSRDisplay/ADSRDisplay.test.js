import React from 'react';
import ADSRDisplay, { calculateLinePoints } from './';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { shallow } from 'enzyme';

describe('calculateLinePoints', () => {
    test('correctly calculates line points based on the inputs given', () => {
        expect(calculateLinePoints(0.995, 0.4975, 0.4975, 0.995))
        .toEqual({
            attackPoints: [0, 100, 60, 0],
            decayPoints: [60, 0, 90, 50],
            sustainPoints: [90, 50, 150, 50],
            releasePoints: [150, 50, 210, 100]
        });
    });
});

describe('ADSRDisplay', () => {
    const wrapper = shallow(
        <ADSRDisplay 
            attack={0.995}
            decay={0.4975}
            sustain={0.4975}
            release={0.995}
            id="adsr-display"
        />
    );
    test('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    test('passes supplied id prop to the correct components', () => {
        expect(wrapper.find('div#adsr-display')).toHaveLength(1);
        expect(wrapper.find(Stage).first().prop('container')).toBe('adsr-display');
    });
    test('renders the correct lines for the props supplied', () => {
        const linesWrapper = wrapper.find(Line);
        expect(linesWrapper.at(0).shallow().prop('points')).toEqual([0, 100, 60, 0]);
        expect(linesWrapper.at(1).shallow().prop('points')).toEqual([60, 0, 90, 50]);
        expect(linesWrapper.at(2).shallow().prop('points')).toEqual([90, 50, 150, 50]);
        expect(linesWrapper.at(3).shallow().prop('points')).toEqual([150, 50, 210, 100]);
    });
});