import React from 'react';
import { effectTypes } from '../../constants';

/*
props:

effectType - string
effectId - string
handleOpen - callback func
handleRemove - callback func
*/

const EffectDetail = props => (
    <div>
        <p className="track-details__effect-text">{props.effectType}</p>
        <button
            className="track-details__effect-button"
            onClick={() => props.handleOpen(props.effectId)}
        >Edit Settings</button>
        <button
            className="track-details__effect-button"
            onClick={() => props.handleRemove(props.effectId)}
        >Remove</button>
    </div>
);

/*
props:

effects - array of effects
effectTypeToAdd - string
handleOpen - callback func
handleRemove - callback func
handleAdd - callback func
handleChange - callback func
*/

const EffectsDetails = props => (
    <div className="track_details__effects-info-container">
        <h2 className="track-details__heading">Effects</h2> 
        {props.effects.map(effect => (
            <EffectDetail 
                key={effect.id}
                effectType={effect.type}
                effectId={effect.id}
                handleOpen={() => props.handleOpen(effect.id)}
                handleRemove={() => props.handleRemove(effect.id)}
            />
        ))} 
        <div>
            <label 
                htmlFor="effect-select" 
                className="track-details__effect-select-label"
            >Add effect:</label>
            <select 
                id="effect-select" 
                className="track-details__effect-select"
                value={props.effectTypeToAdd}
                onChange={props.handleChange}
            >
                <option 
                    value={effectTypes.chorus}
                    className="track-details__effect-select-option"
                >Chorus</option>
                <option 
                    value={effectTypes.compressor}
                    className="track-details__effect-select-option"
                >Compressor</option>
                <option 
                    value={effectTypes.distortion}
                    className="track-details__effect-select-option"
                >Distortion</option>
                <option 
                    value={effectTypes.eq3}
                    className="track-details__effect-select-option"
                >EQ3</option>
                <option 
                    value={effectTypes.feedbackDelay}
                    className="track-details__effect-select-option"
                >Feedback Delay</option>
                <option 
                    value={effectTypes.filter}
                    className="track-details__effect-select-option"
                >Filter</option>
                <option 
                    value={effectTypes.freeverb}
                    className="track-details__effect-select-option"
                >Freeverb</option>
                <option 
                    value={effectTypes.gate}
                    className="track-details__effect-select-option"
                >Gate</option>
                <option 
                    value={effectTypes.jcReverb}
                    className="track-details__effect-select-option"
                >JC Reverb</option>
                <option 
                    value={effectTypes.lfo}
                    className="track-details__effect-select-option"
                >LFO</option>
                <option 
                    value={effectTypes.limiter}
                    className="track-details__effect-select-option"
                >Limiter</option>
                <option 
                    value={effectTypes.phaser}
                    className="track-details__effect-select-option"
                >Phaser</option>
                <option 
                    value={effectTypes.tremolo}
                    className="track-details__effect-select-option"
                >Tremolo</option>
                <option 
                    value={effectTypes.vibrato}
                    className="track-details__effect-select-option"
                >Vibrato</option>
            </select>
            <button
                className="track-details__effect-button"
                onClick={() => props.handleAdd(props.effectTypeToAdd)}
            >Add</button>
        </div>
    </div>
);

export default EffectsDetails;