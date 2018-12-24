import React from 'react';
import PropTypes from 'prop-types';

const RangeInput = props => (
    <React.Fragment>
        <label className="range-input__label" htmlFor={props.inputId}>{props.label}</label>
        <input
            className="range-input"
            type="range"
            id={props.inputId}
            min={props.min}
            max={props.max}
            step={props.step}
            value={props.value}
            onChange={props.handleChange}
        ></input>
    </React.Fragment>
);

RangeInput.propTypes = {
    inputId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default RangeInput