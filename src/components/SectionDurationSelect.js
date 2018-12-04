import React from 'react';

const SectionDurationSelect = props => {
    return (
        <React.Fragment>
            <label 
                className="piano-roll-controls__label" 
                htmlFor="sectionDurationSelect"
            >Select section duration:</label>
            <select id="sectionDurationSelect" value={props.value} onChange={props.handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </React.Fragment>
    )
}

export default SectionDurationSelect;