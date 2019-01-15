import React from 'react';
import PropTypes from 'prop-types';
import EffectDetailItem from './EffectDetailItem';
import { effectTypes } from '../../constants';

const EffectsDetails = props => (
    <div>
        <h2 className="track-details__heading">Effects</h2> 
        {props.effects.map(effect => (
            <EffectDetailItem 
                key={effect.id}
                effectType={effect.type}
                effectId={effect.id}
                handleOpen={props.handleOpen}
                handleRemove={props.handleRemove}
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

EffectsDetails.propTypes = {
    handleOpen: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    effects: PropTypes.arrayOf(PropTypes.object).isRequired,
    effectTypeToAdd: PropTypes.string.isRequired
};

export default EffectsDetails;