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
    </div>
);

ComposerControls.propTypes = {
    cursorValue: PropTypes.string.isRequired,
    updateCursorValue: PropTypes.func.isRequired,
    durationValue: PropTypes.number.isRequired,
    updateDurationValue: PropTypes.func.isRequired
};

export default ComposerControls;