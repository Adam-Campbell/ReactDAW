import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as PencilToolIcon } from '../Icons/pencilToolIcon.svg';
import { ReactComponent as SelectionToolIcon } from '../Icons/selectionToolIcon.svg';
import { ReactComponent as CursorToolIcon } from '../Icons/cursorToolIcon.svg';

const ToolSelectionMenu = props => (
    <div className="tool-selection-menu">
        <input 
            className="tool-selection-menu__radio-button" 
            type="radio" 
            id="tool-select-cursor"
            name="tool-select"
            value="cursor"
            onChange={() => {}} 
            checked={true}
        ></input>
        <label 
            className="tool-selection-menu__label" 
            htmlFor="tool-select-cursor"
        >
            <CursorToolIcon />
        </label>
        <input 
            className="tool-selection-menu__radio-button" 
            type="radio" 
            id="tool-select-pencil"
            name="tool-select"
            value="pencil"
            onChange={() => {}} 
            checked={false}
        ></input>
        <label 
            className="tool-selection-menu__label" 
            htmlFor="tool-select-pencil"
        >
            <PencilToolIcon />
        </label>
        <input 
            className="tool-selection-menu__radio-button" 
            type="radio" 
            id="tool-select-selection"
            name="tool-select"
            value="selection"
            onChange={() => {}} 
            checked={false}
        ></input>
        <label 
            className="tool-selection-menu__label" 
            htmlFor="tool-select-selection"
        >
            <SelectionToolIcon />
        </label>
    </div>
);

export default ToolSelectionMenu;