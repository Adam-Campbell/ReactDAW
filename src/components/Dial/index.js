import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    calculateMidPointOfElement,
    calculateAngleRelativeToPositiveXAxis
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
So we have to adjust 

*/





class Dial extends Component {
    constructor(props) {
        super(props);
        this.dialRef = React.createRef();
        this.throttledHandleMouseMove = throttle(this.handleMouseMove, 16).bind(this);
        this.state = {
            tempInternalValue: 25,
            dragInProgress: false,
            dragStartPosX: null,
            dragStartPosY: null,
            relativeAngle: 0
        };
    }

    tempCallback  = (newValue) => {
        this.setState({
            tempInternalValue: newValue
        });
    }

    handleMouseDown = (e) => {
        this.setState({
            dragInProgress: true
        }); 
    };

    handleMouseUp = (e) => {
        this.setState({
            dragInProgress: false
        });
    }

    handleMouseMove = (e) => {
        e.persist();
        if (this.state.dragInProgress) {
            const relativeAngle = this.calculateAngle(e);
            this.setState({ relativeAngle });
            //console.log(relativeAngle);
        }
    }

    calculateAngle = (e) => {
        const { clientX, clientY } = e;
        const { midX, midY } = calculateMidPointOfElement(
            this.dialRef.current.getBoundingClientRect()
        );
        const relativeAngle = calculateAngleRelativeToPositiveXAxis({
            eventX: clientX,
            eventY: clientY,
            midX,
            midY
        });
        return relativeAngle;
        //console.log(relativeAngle);
        // const midX = left + (width/2);
        // const midY = top + (height/2);
        // const deltaX = clientX - midX;
        // const deltaY = midY - clientY;
        // const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        // console.log(angle);
    }

    render() {
        return (
            <div 
                className="dial__container" 
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={(e) => {
                    e.persist();
                    this.throttledHandleMouseMove(e)
                }}
            >
                <div 
                    className="dial" 
                    ref={this.dialRef}
                    style={{
                        transform: `rotate(${180-this.state.relativeAngle}deg)`
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