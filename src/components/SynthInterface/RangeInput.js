import React from 'react';

const RangeInput = props => (
    <React.Fragment>
        <label className="synth__range-input-label" htmlFor={props.inputId}>{props.label}</label>
        <input
            className="synth__range-input"
            type="range"
            id={props.inputId}
            min={props.min}
            max={props.max}
            step={props.step}
            value={props.value}
            onChange={(e) => {
                props.handleChange(
                    props.instrumentId,
                    props.propertyPathArray,
                    parseFloat(e.target.value)
                )
            }}
        ></input>
    </React.Fragment>
);

export default RangeInput