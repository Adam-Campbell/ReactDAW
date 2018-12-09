import React from 'react';

const DurationSelect = props => {
    return (
        <React.Fragment>
            <label className="select-input__label pink" htmlFor="durationSelect">Select note duration:</label>
            <select 
                id="durationSelect" 
                className="select-input pink"
                value={props.value} 
                onChange={props.handleChange}
            >
                <option className="select-input__option" value="32t">32t</option>
                <option className="select-input__option" value="32n">32n</option>
                <option className="select-input__option" value="16t">16t</option>
                <option className="select-input__option" value="16n">16n</option>
                <option className="select-input__option" value="8t">8t</option>
                <option className="select-input__option" value="8n">8n</option>
                <option className="select-input__option" value="4t">4t</option>
                <option className="select-input__option" value="4n">4n</option>
                <option className="select-input__option" value="2t">2t</option>
                <option className="select-input__option" value="2n">2n</option>
                <option className="select-input__option" value="1m">1m</option>
            </select>
        </React.Fragment>
    )
}

export default DurationSelect;