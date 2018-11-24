import React from 'react';

const DurationSelect = props => {
    return (
        <React.Fragment>
            <label className="piano-roll-controls__label" htmlFor="durationSelect">Select note duration:</label>
            <select id="durationSelect" value={props.value} onChange={props.handleChange}>
                <option value="32t">32t</option>
                <option value="32n">32n</option>
                <option value="16t">16t</option>
                <option value="16n">16n</option>
                <option value="8t">8t</option>
                <option value="8n">8n</option>
                <option value="4t">4t</option>
                <option value="4n">4n</option>
                <option value="2t">2t</option>
                <option value="2n">2n</option>
                <option value="1m">1m</option>
            </select>
        </React.Fragment>
    )
}

export default DurationSelect;