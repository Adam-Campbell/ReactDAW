import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import {
    calculateAngle,
    checkIfAngleAllowed,
    mapAngleToPointInDataRange,
    convertIncomingValueToDialPosition,
    snapValueToSteps
} from './DialUtils';
import { throttle } from 'lodash';

class Dial extends Component {
    // doesn't work when visualRange is 360, investigate why
    static defaultProps = {
        startOffset: 180,
        dialRange: 180,
        dataMin: 0,
        dataMax: 100,
        value: 0,
        stepSize: 0.5,
        snapToSteps: true
    };

    static propTypes = {
        value: PropTypes.number.isRequired,
        updateValue: PropTypes.func.isRequired
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
            const isAllowed = checkIfAngleAllowed(
                newDialAngle,
                this.props.startOffset,
                sanitisedDialRange
            );
            if (isAllowed) {
                let newDataValue = mapAngleToPointInDataRange({
                    dialAngle: newDialAngle,
                    dialStartOffset: this.props.startOffset,
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
                this.props.updateValue(newDataValue);
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
        const { children } = this.props;
        const transformedAngle = this.transformAngle();
        return children({
            startInteraction: this.startInteraction,
            endInteraction: this.endInteraction,
            updateInteraction: this.updateInteraction,
            dialRef: this.dialRef,
            angle: transformedAngle,
            value: this.props.value,
            updateValue: this.props.updateValue,
            dataMin: this.props.dataMin,
            dataMax: this.props.dataMax,
            stepSize: this.props.stepSize
        });
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