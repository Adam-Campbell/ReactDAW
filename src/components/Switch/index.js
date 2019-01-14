import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*

What does this component need? 

An array of all of the different radio buttons it needs to render. 
[
    {
        id: {String},
        name: {String},
        value: {String},
        text: {String}
    }
]

value - the current value
handleChange - a callback to call onChange
rowDescription - the description that will appear above the row of radio buttons

*/

const Switch = props => (
    <React.Fragment>
        <p className="switch__row-description">{props.rowDescription}</p>
            <div className="switch__row">
                {props.optionsData.map((option, index) => (
                    <React.Fragment
                        key={option.id}
                    >
                        <input 
                            className="switch__radio-button" 
                            type="radio" 
                            id={option.id} 
                            name={option.name}
                            value={option.value} 
                            onChange={(e) => props.handleChange(e.target.value)} 
                            checked={props.value === option.value}
                        ></input>
                        <label 
                            className="switch__label" 
                            htmlFor={option.id}
                        >{option.text}</label>
                    </React.Fragment>
                ))}
            </div>
    </React.Fragment>
);

Switch.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    rowDescription: PropTypes.string.isRequired,
    optionsData: PropTypes.arrayOf(PropTypes.object).isRequired 
}

export default Switch;