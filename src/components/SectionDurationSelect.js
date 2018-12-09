import React from 'react';

const SectionDurationSelect = props => {
    return (
        <React.Fragment>
            <label 
                className="select-input__label pink" 
                htmlFor="sectionDurationSelect"
            >Select section duration:</label>
            <select 
                id="sectionDurationSelect" 
                className="select-input pink"
                value={props.value} 
                onChange={props.handleChange}
            >
                <option className="select-input__option" value="1">1</option>
                <option className="select-input__option" value="2">2</option>
                <option className="select-input__option" value="3">3</option>
                <option className="select-input__option" value="4">4</option>
            </select>
        </React.Fragment>
    )
}

export default SectionDurationSelect;