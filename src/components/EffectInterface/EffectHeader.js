import React from 'react';
import PropTypes from 'prop-types';

const EffectHeader = props => (
    <div className="effect__header-container">
        <h1 className="effect__title">{props.effectTitle}</h1>
    </div>
);

EffectHeader.propTypes = {
    effectTitle: PropTypes.string.isRequired
};

export default EffectHeader;