import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../SelectInput';

const ComposerControls = props => (
    <div className="composer__controls-container">
        <SelectInput
            inputId="composer-cursor-select"
            label="Select tool:"
            value={props.cursorValue}
            handleChange={props.updateCursorValue}
            options={[
                { value: 'pointer', text: 'Pointer' },
                { value: 'pencil', text: 'Pencil' }
            ]} 
        />
        <SelectInput 
            inputId="composer-duration-select"
            label="Select section duration:"
            value={props.durationValue.toString()}
            handleChange={props.updateDurationValue}
            options={[
                { value: '1', text: '1' },
                { value: '2', text: '2' },
                { value: '3', text: '3' },
                { value: '4', text: '4' }
            ]} 
        />
        <button 
            className="composer__delete-section-button"
            onClick={props.removeSelectedSection}
        >Delete Selected Section</button>
    </div>
);

export default ComposerControls;