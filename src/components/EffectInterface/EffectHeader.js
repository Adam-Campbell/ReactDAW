import React from 'react';

const EffectHeader = props => (
    <div className="effect__header-container">
        <h1 className="effect__title">{props.effectTitle}</h1>
        <button 
            className="effect__close-button" 
            onClick={props.handleClose}
        >X</button>
    </div>
);

export default EffectHeader;