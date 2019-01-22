import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import { toolTypes } from '../../constants';
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
            value={toolTypes.cursor}
            onChange={(e) => props.setToolType(e.target.value)} 
            checked={props.toolType === toolTypes.cursor}
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
            value={toolTypes.pencil}
            onChange={(e) => props.setToolType(e.target.value)} 
            checked={props.toolType === toolTypes.pencil}
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
            value={toolTypes.selection}
            onChange={(e) => props.setToolType(e.target.value)} 
            checked={props.toolType === toolTypes.selection}
        ></input>
        <label 
            className="tool-selection-menu__label" 
            htmlFor="tool-select-selection"
        >
            <SelectionToolIcon />
        </label>
    </div>
);

const mapStateToProps = state => ({
    toolType: state.settings.toolType
});

export default connect(
    mapStateToProps,
    {
        setToolType: ActionCreators.setToolType
    }
)(ToolSelectionMenu);