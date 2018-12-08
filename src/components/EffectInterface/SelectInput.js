import React from 'react';

const SelectInput = props => (
    <React.Fragment>
        <label className="select-input__label pink" htmlFor={props.inputId}>{props.label}</label>
        <select
            className="select-input pink"
            value={props.value}
            id={props.inputId}
            onChange={(e) => {
                let val = props.shouldConvertToFloat ? parseFloat(e.target.value) : e.target.value;
                props.handleChange(
                    props.effectId,
                    props.propertyPathArray,
                    val
                )
            }}
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
)

export default SelectInput;