import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import {
    calculateAngle,
    checkIfAngleAllowed,
    mapAngleToPointInDataRange,
    convertIncomingValueToDialPosition
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

Needs to be controlled, so it  needs to accept a value, and also an onChange callback

*/



class Dial extends Component {

    // doesn't work when visualRange is 360, investigate why
    static defaultProps = {
        startOffset: 225,
        dialRange: 270,
        dataMin: 0,
        dataMax: 100,
        value: 0
    }

    static propTypes = {
        value: PropTypes.number,
        handleChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.dialRef = React.createRef();
        this.throttledUpdateInteraction = throttle(this.updateInteraction, 16).bind(this);
        this.state = {
            interactionInProgress: false
        };
    }

    /**
     * Began an interaction with the dial, either through a touch event or a mouse event.
     */
    startInteraction = (e) => {
        this.setState({
            interactionInProgress: true
        });
    }

    /**
     * End an interaction with the dial, either through a touch event or a mouse event.
     */
    endInteraction = (e) => {
        this.setState({
            interactionInProgress: false
        });
    }

    /**
     * Update the current interaction, responds to mouse and touch events.
     */
    updateInteraction = (e) => {
        if (this.state.interactionInProgress) {
            let event = e.hasOwnProperty('touches') ? e.touches[0] : e;
            const sanitisedDialRange = this.props.dialRange > 359 && this.props.dialRange <= 360 ?
                                       359.99999 :
                                       this.props.dialRange;
            const { clientX, clientY } = event;
            const dialNodeRect = this.dialRef.current.getBoundingClientRect();
            const newDialAngle = calculateAngle({
                clientX,
                clientY,
                dialNodeRect
            });
            const isAllowed = checkIfAngleAllowed(
                newDialAngle,
                this.props.startOffset,
                sanitisedDialRange
            );
            if (isAllowed) {
                const newDataValue = mapAngleToPointInDataRange({
                    dialAngle: newDialAngle,
                    dialStartOffset: this.props.startOffset,
                    dialRange: sanitisedDialRange,
                    dataMin: this.props.dataMin,
                    dataMax: this.props.dataMax
                });
                this.props.updateDial(newDataValue);
            }
        }
    }

    transformAngle = () => {
        const rawAngle = convertIncomingValueToDialPosition({
            value: this.props.value,
            dataMin: this.props.dataMin,
            dataMax: this.props.dataMax,
            dialStartOffset: this.props.startOffset,
            dialRange: this.props.dialRange
        });
        return -rawAngle;
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
                        transform: `rotate(${this.transformAngle()}deg)`
                    }}
                >
                    <span className="dial__marker"></span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    value: state.dial.value
});

export default connect(
    mapStateToProps,
    { 
        updateDial: ActionCreators.updateDial
    }
)(Dial);