import React from 'react';
import PropTypes from 'prop-types';
import RangeInput from '../RangeInput';

const EnhancedRangeInput = props => (
    <RangeInput 
        inputId={props.inputId}
        label={props.label}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        handleChange={(e) => {
            props.handleChange(
                props.identifier,
                props.propertyPathArray,
                parseFloat(e.target.value)
            );
        }}
    />
);

EnhancedRangeInput.propTypes = {
    inputId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    identifier: PropTypes.string.isRequired,
    propertyPathArray: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default EnhancedRangeInput;