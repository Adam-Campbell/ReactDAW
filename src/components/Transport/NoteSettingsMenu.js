import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import SelectInput from '../SelectInput';
import { ReactComponent as MusicalNoteIcon } from '../Icons/musicalNoteIcon.svg';

const NoteSettingsMenu = props => (
    <div className="note-settings-menu">
        <SelectInput 
            withBlockLabel
            value={props.snap}
            handleChange={(e) => props.setSnap(e.target.value)}
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
            withBlockLabel
            value={props.noteDuration}
            handleChange={(e) => props.setNoteDuration(e.target.value)}
            inputId="note-settings-duration"
            label={<MusicalNoteIcon />}
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

const mapStateToProps = state => ({
    snap: state.settings.snap,
    noteDuration: state.settings.noteDuration
});

export default connect(
    mapStateToProps,
    {
        setSnap: ActionCreators.setSnap,
        setNoteDuration: ActionCreators.setNoteDuration
    }
)(NoteSettingsMenu);