import React from 'react';

const SelectInput = props => (
    <React.Fragment>
        <label className="synth__select-input-label" htmlFor={props.inputId}>{props.label}</label>
        <select
            className="synth__select-input"
            value={props.value}
            id={props.inputId}
            onChange={(e) => {
                props.handleChange(
                    props.instrumentId,
                    props.propertyPathArray,
                    e.target.value
                )
            }}
        >
            {props.options.map((option, index) => (
                <option 
                    className="synth__select-input-option" 
                    value={option.value} 
                    key={index}
                >{option.text}</option>
            ))}
        </select>
    </React.Fragment>
)

export default SelectInput;