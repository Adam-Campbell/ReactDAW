import React from 'react';

const CursorSelect = props => {
    return (
        <React.Fragment>
            <label className="piano-roll-controls__label" htmlFor="cursorSelect">Select tool:</label>
            <select id="cursorSelect" value={props.value} onChange={props.handleChange}>
                <option value="pointer">Pointer</option>
                <option value="pencil">Pencil</option>
            </select>
        </React.Fragment>
    )
}

export default CursorSelect;