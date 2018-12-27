import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../SelectInput';

const PianoRollControls = props => (
    <div className="piano-roll-controls-container">
        <SelectInput 
            value={props.quantizeValue}
            handleChange={props.updateQuantizeValue}
            inputId="piano-roll-quantize-select"
            label="Select quantize level:"
            options={[
                { value: '32t', text: '32t' },
                { value: '32n', text: '32n' },
                { value: '16t', text: '16t' },
                { value: '16n', text: '16n' },
                { value: '8t', text: '8t' },
                { value: '8n', text: '8n' },
                { value: '4t', text: '4t' },
                { value: '4n', text: '4n' },
                { value: '2t', text: '2t' },
                { value: '2n', text: '2n' },
                { value: '1m', text: '1m' }
            ]}
        />
        <SelectInput 
            value={props.durationValue}
            handleChange={props.updateDurationValue}
            inputId="piano-roll-duration-select"
            label="Select note duration:"
            options={[
                { value: '32t', text: '32t' },
                { value: '32n', text: '32n' },
                { value: '16t', text: '16t' },
                { value: '16n', text: '16n' },
                { value: '8t', text: '8t' },
                { value: '8n', text: '8n' },
                { value: '4t', text: '4t' },
                { value: '4n', text: '4n' },
                { value: '2t', text: '2t' },
                { value: '2n', text: '2n' },
                { value: '1m', text: '1m' }
            ]}
        />
        <SelectInput 
            value={props.cursorValue}
            handleChange={props.updateCursorValue}
            inputId="piano-roll-cursor-select"
            label="Select tool:"
            options={[
                { value: 'pointer', text: 'Pointer' },
                { value: 'pencil', text: 'Pencil' }
            ]}
        /> 
    </div>
);

PianoRollControls.propTypes = {
    quantizeValue: PropTypes.string.isRequired,
    updateQuantizeValue: PropTypes.func.isRequired,
    durationValue: PropTypes.string.isRequired,
    updateDurationValue: PropTypes.func.isRequired,
    cursorValue: PropTypes.string.isRequired,
    updateCursorValue: PropTypes.func.isRequired
};

export default PianoRollControls;