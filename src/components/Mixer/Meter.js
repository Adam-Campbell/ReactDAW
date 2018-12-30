import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Meter extends Component {
    constructor(props) {
        super(props);
        this.rafRef = null;
        this.meterElementRef = React.createRef();
    }

    componentDidMount() {
        requestAnimationFrame(this.recalculateMeter);
    }

    componentWillUnmount() {
        if (this.rafRef) {
            cancelAnimationFrame(this.rafRef);
        }
    }

    recalculateMeter = () => {
        const newLevel = window.meterNodeReferences[this.props.trackId].getLevel();
        let newPercentValue;
        const topBound = 10;
        const bottomBound = -40;
        if (newLevel >= topBound) {
            newPercentValue = 100;
        } else if (newLevel <= bottomBound) {
            newPercentValue = 0;
        } else {
            const range = 50;
            newPercentValue = (newLevel - bottomBound) / range * 100;
        }
        this.meterElementRef.current.style.height = `${newPercentValue}%`;
        this.rafRef = requestAnimationFrame(this.recalculateMeter);

    }

    render() {
        return (
            <div className={this.props.isMaster ? "mixer__master-meter-outer" : "mixer__meter-outer"}>
                <div 
                    className={this.props.isMaster ? "mixer__master-meter-inner" : "mixer__meter-inner"}
                    ref={this.meterElementRef}
                ></div>
            </div>
        );
    }
}

Meter.propTypes = {
    trackId: PropTypes.string.isRequired,
    isMaster: PropTypes.any
}

export default Meter;
