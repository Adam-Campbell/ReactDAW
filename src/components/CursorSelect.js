import React from 'react';

const CursorSelect = props => {
    return (
        <React.Fragment>
            <label className="select-input__label pink" htmlFor="cursorSelect">Select tool:</label>
            <select 
                id="cursorSelect" 
                className="select-input pink"
                value={props.value} 
                onChange={props.handleChange}
            >
                <option className="select-input__option" value="pointer">Pointer</option>
                <option className="select-input__option" value="pencil">Pencil</option>
            </select>
        </React.Fragment>
    )
}

export default CursorSelect;