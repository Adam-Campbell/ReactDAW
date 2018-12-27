import React from 'react';
import PropTypes from 'prop-types';

const EffectDetailItem = props => (
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

EffectDetailItem.propTypes = {
    effectType: PropTypes.string.isRequired,
    effectId: PropTypes.string.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
};

export default EffectDetailItem;