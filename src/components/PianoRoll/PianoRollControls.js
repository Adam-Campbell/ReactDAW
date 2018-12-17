import React from 'react';
import PropTypes from 'prop-types';
import QuantizeSelect from '../QuantizeSelect';
import CursorSelect from '../CursorSelect';
import DurationSelect from '../DurationSelect';

const PianoRollControls = props => (
    <div className="piano-roll-controls-container">
        <QuantizeSelect 
            value={props.quantizeValue} 
            handleChange={props.updateQuantizeValue} 
        />
        <DurationSelect 
            value={props.durationValue}
            handleChange={props.updateDurationValue}
        />
        <CursorSelect 
            value={props.cursorValue}
            handleChange={props.updateCursorValue}
        />
    </div>
);

PianoRollControls.propTypes = {
    quantizeValue: PropTypes.string.isRequired,
    updateQuantizeValue: PropTypes.func.isRequired,
    durationValue: PropTypes.string.isRequired,
    updateDurationValue: PropTypes.func.isRequired,
    cursorValue: PropTypes.string.isRequired,
    updateCursorValue: PropTypes.func.isRequired
};

export default PianoRollControls;