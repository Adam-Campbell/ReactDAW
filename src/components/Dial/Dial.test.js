import React from 'react';
import { shallow } from 'enzyme';
import Dial from './';
import SmallDial from '../SmallDial';

const mockedRenderChildProp = jest.fn();
const mockedUpdateValueCallback = jest.fn();

test('The component passed as child to this component will be rendered', () => {
    const wrapper = shallow(
        <Dial
            value={50}
            updateValueCallback={mockedUpdateValueCallback}
            dialStartOffset={180}
            dialRange={180}
            dataMin={0}
            dataMax={100}
            stepSize={18}
            snapToSteps={true}
            defaultValue={50}
        >
            {(props) => <SmallDial {...props} label="Dial" />}
        </Dial>
    );
    expect(wrapper.find(SmallDial)).toHaveLength(1);
});

test('Props are correctly passed into the child render prop', () => {
    const wrapper = shallow(
        <Dial
            value={50}
            updateValueCallback={mockedUpdateValueCallback}
            dialStartOffset={180}
            dialRange={180}
            dataMin={0}
            dataMax={100}
            stepSize={10}
            snapToSteps={true}
            defaultValue={50}
        >
            {(props) => mockedRenderChildProp(props)}
        </Dial>
    );
    expect(mockedRenderChildProp.mock.calls[0][0]).toEqual(
        expect.objectContaining({
            startInteraction: expect.any(Function),
            endInteraction: expect.any(Function),
            updateInteraction: expect.any(Function),
            dialRef: expect.any(Object),
            angle: expect.any(Number),
            value: 50,
            updateValueCallback: expect.any(Function),
            dataMin: 0,
            dataMax: 100,
            stepSize: 10,
            handleKeyDown: expect.any(Function),
            handleClick: expect.any(Function)
        })
    );
});

test(`The correct angle is calculated according to the props given to Dial, and then passed on to the 
      rendered child component`, 
    () => {
    const wrapper = shallow(
        <Dial
            value={50}
            updateValueCallback={mockedUpdateValueCallback}
            dialStartOffset={180}
            dialRange={180}
            dataMin={0}
            dataMax={100}
            stepSize={10}
            snapToSteps={true}
            defaultValue={50}
        >
            {(props) => mockedRenderChildProp(props)}
        </Dial>
    );
    expect(mockedRenderChildProp.mock.calls[1][0].angle).toBe(-90);
});

test(`When the updateInteraction class method is called with a new position, this is transformed into a
      new value which is passed to updateValueCallback`, 
    () => {
        const wrapper = shallow(
            <Dial
                value={20}
                updateValueCallback={mockedUpdateValueCallback}
                dialStartOffset={180}
                dialRange={180}
                dataMin={0}
                dataMax={100}
                stepSize={10}
                snapToSteps={true}
                defaultValue={15}
            >
                {(props) => <SmallDial {...props} label="Dial" />}
            </Dial>
        );
        wrapper.instance().dialRef = {
            current: {
                getBoundingClientRect: function() {
                    return { top: 30, left: 30, width: 40, height: 40 };
                }
            }
        }

        expect(mockedUpdateValueCallback).toHaveBeenCalledTimes(0);
        wrapper.instance().startInteraction();
        wrapper.instance().updateInteraction({ clientX:  50, clientY: 30 });
        expect(mockedUpdateValueCallback).toHaveBeenCalledTimes(1);
        expect(mockedUpdateValueCallback.mock.calls[0][0]).toBe(50);
});