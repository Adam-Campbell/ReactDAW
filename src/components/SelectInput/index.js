import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = props => (
    <React.Fragment>
        <label className="select-input__label pink" htmlFor={props.inputId}>{props.label}</label>
        <select
            className="select-input pink"
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
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SelectInput;