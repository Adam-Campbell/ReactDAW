import React from 'react';
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

export default PianoRollControls;