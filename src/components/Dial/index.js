import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import {
    calculateAngle,
    mapAngleToPointInDataRange,
    convertIncomingValueToDialPosition,
    snapValueToSteps
} from './DialUtils';

/*

TODO:

Investigate aria concerns.

*/

class Dial extends Component {

    static defaultProps = {
        dialStartOffset: 180,
        dialRange: 180,
        dataMin: 0,
        dataMax: 100,
        stepSize: 1,
        snapToSteps: true
    };

    static propTypes = {
        value: PropTypes.number.isRequired,
        updateValueCallback: PropTypes.func.isRequired,
        dialStartOffset: PropTypes.number,
        dialRange: PropTypes.number,
        dataMin: PropTypes.number,
        dataMax: PropTypes.number,
        stepSize: PropTypes.number,
        snapToSteps: PropTypes.bool,
        defaultValue: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.dialRef = React.createRef();
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
            let newDataValue = mapAngleToPointInDataRange({
                dialAngle: newDialAngle,
                dialStartOffset: this.props.dialStartOffset,
                dialRange: sanitisedDialRange,
                dataMin: this.props.dataMin,
                dataMax: this.props.dataMax
            });
            if (this.props.snapToSteps) {
                newDataValue = snapValueToSteps({
                    value: newDataValue,
                    stepSize: this.props.stepSize,
                    dataMin: this.props.dataMin,
                    dataMax: this.props.dataMax,
                });
            }
            this.props.updateValueCallback(newDataValue);
        }
    }

    transformAngle = () => {
        const rawAngle = convertIncomingValueToDialPosition({
            value: this.props.value,
            dataMin: this.props.dataMin,
            dataMax: this.props.dataMax,
            dialStartOffset: this.props.dialStartOffset,
            dialRange: this.props.dialRange
        });
        return -rawAngle;
    }

    handleKeyDown = (e) => {
        const { key } = e;
        if (key === 'ArrowUp' || key === 'ArrowRight') {
            // move upwards through range
            const newValue = Math.min(this.props.dataMax, this.props.value + this.props.stepSize);
            this.props.updateValueCallback(newValue);
        } else if (key === 'ArrowDown' || key === 'ArrowLeft') {
            // move downwards through range
            const newValue = Math.max(this.props.dataMin, this.props.value - this.props.stepSize);
            this.props.updateValueCallback(newValue);
        }
        
    }

    handleClick = (e) => {
        if (e.shiftKey && this.props.defaultValue) {
            this.props.updateValueCallback(this.props.defaultValue);
        }
    }

    render() {
        const { children } = this.props;
        const transformedAngle = this.transformAngle();
        return children({
            startInteraction: this.startInteraction,
            endInteraction: this.endInteraction,
            updateInteraction: this.updateInteraction,
            dialRef: this.dialRef,
            angle: transformedAngle,
            value: this.props.value,
            updateValueCallback: this.props.updateValueCallback,
            dataMin: this.props.dataMin,
            dataMax: this.props.dataMax,
            stepSize: this.props.stepSize,
            handleKeyDown: this.handleKeyDown,
            handleClick: this.handleClick
        });
    }
}

const mapStateToProps = state => ({
    
});

export default connect(
    mapStateToProps,
    { 
        updateDial: ActionCreators.updateDial
    }
)(Dial);