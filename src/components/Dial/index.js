import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    calculateMidPointOfElement,
    calculateAngleRelativeToPositiveXAxis,
    convertTo360,
    getStartAndEnd,
    getAdjustedStartAndEnd,
    adjustDegree,
    checkIfAngleAllowed
} from './DialUtils';
import { throttle } from 'lodash';

/*

Dial needs to be given:
- a current value
- a min value
- a max value
- a callback to update the value.

Should update on mouseMove, and also onClick (or this could use mouseUp).

On mouseDown, the mouseDown position is recorded and saved in state. From that point, when a mouseMove event 
occurs we look at the new coords compared to the mouseDown coords in state, and use the difference to calculate 
the new value. The callback function is then called with this new value. 

When a mouseUp event occurs, we declare that no operation is in progress and set the mouseDown coords to null.


In order for this component to function, it needs to be able to determine the center point of the 'dial' that it 
renders. So I need to create a ref (React.createRef) that can be passed down to the component it renders. The 
enhancing component (this component) can then call getBoundingClientRect on the references current element to
determine where the center point of the dial is. 


Math.atan2(y, x) * 180 / Math.PI will give us the angle in degrees from the positive x axis until that point. 



External API / settings:

clockWise - bool
startOffset - an offset from the positive x axis (offset of 180 will start the range at 9 o'clock)
range - the range of motion in degrees.

Solely based off of the startOffset and range values, I need to calculate the allowed values. 

*/



class Dial extends Component {

    static defaultProps = {
        startOffset: 225,
        range: 270
    }

    constructor(props) {
        super(props);
        this.dialRef = React.createRef();
        this.throttledUpdateInteraction = throttle(this.updateInteraction, 16).bind(this);
        this.state = {
            tempInternalValue: 25,
            dragInProgress: false,
            relativeAngle: this.props.startOffset,
        };
    }

    tempCallback  = (newValue) => {
        this.setState({
            tempInternalValue: newValue
        });
    }

    /**
     * Began an interaction with the dial, either through a touch event or a mouse event.
     */
    startInteraction = (e) => {
        this.setState({
            dragInProgress: true
        });
    }

    /**
     * End an interaction with the dial, either through a touch event or a mouse event.
     */
    endInteraction = (e) => {
        this.setState({
            dragInProgress: false
        });
    }

    /**
     * Update the current interaction, responds to mouse and touch events.
     */
    updateInteraction = (e) => {
        if (this.state.dragInProgress) {
            let event = e.hasOwnProperty('touches') ?
                    e.touches[0] :
                    e;
            const relativeAngle = this.calculateAngle(event);
            const isAllowed = checkIfAngleAllowed({
                angleToCheck: relativeAngle,
                startOfRange: this.props.startOffset,
                rangeDistance: this.props.range
            });
            if (isAllowed) {
                this.setState({ relativeAngle });
            }
        }
    }

    /**
     * Calculate an angle based on the event object from the most recent interaction update.
     */
    calculateAngle = (e) => {
        const { clientX, clientY } = e;
        const { midX, midY } = calculateMidPointOfElement(
            this.dialRef.current.getBoundingClientRect()
        );
        const relativeAngleAs180 = calculateAngleRelativeToPositiveXAxis({
            eventX: clientX,
            eventY: clientY,
            midX,
            midY
        });
        const relativeAngleAs360 = convertTo360(relativeAngleAs180);
        return relativeAngleAs360;
    }

    transformAngle = (relativeAngle) => {
        return -relativeAngle;
    }

    render() {
        return (
            <div 
                className="dial__container" 
                onMouseDown={this.startInteraction}
                onMouseUp={this.endInteraction}
                onMouseMove={(e) => {
                    e.persist();
                    this.throttledUpdateInteraction(e)
                }}
                onTouchStart={this.startInteraction}
                onTouchMove={(e) => {
                    e.persist();
                    e.preventDefault();
                    this.throttledUpdateInteraction(e);
                }}
                onTouchEnd={this.endInteraction}
            >
                <div 
                    className="dial" 
                    ref={this.dialRef}
                    style={{
                        transform: `rotate(${this.transformAngle(this.state.relativeAngle)}deg)`
                    }}
                >
                    <span className="dial__marker"></span>
                </div>
            </div>
        )
    }
}

Dial.propTypes = {

}

export default Dial;