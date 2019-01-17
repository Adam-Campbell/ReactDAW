import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    optionsData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired 
}

export default Switch;
