import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../SelectInput';

const NoteSettingsMenu = props => (
    <div className="note-settings-menu">
        <SelectInput 
            value="16n"
            handleChange={() => {}}
            inputId="note-settings-quantize"
            label="Q"
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
            value="16n"
            handleChange={() => {}}
            inputId="note-settings-duration"
            label="D"
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
    </div>
);

export default NoteSettingsMenu;