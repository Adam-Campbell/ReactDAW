import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = props => (
    <React.Fragment>
        <label 
            className={`select-input__label main-color ${props.withBlockLabel ? 'select-input__label--block' : ''}`}
            htmlFor={props.inputId}
        >{props.label}</label>
        <select
            className="select-input main-color"
            value={props.value}
            id={props.inputId}
            onChange={props.handleChange}
        >
            {props.options.map((option, index) => (
                <option 
                    className="select-input__option" 
                    value={option.value} 
                    key={index}
                >{option.text}</option>
            ))}
        </select>
    </React.Fragment>
);

SelectInput.propTypes = {
    inputId: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    withBlockLabel: PropTypes.bool
};

export default SelectInput;