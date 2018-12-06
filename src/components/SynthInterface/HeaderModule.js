import React from 'react';

const HeaderModule = props => (
    <div className="synth-interface__header-container">
        <h1 className="synth-interface__title">{props.synthTitle}</h1>
        <button 
            className="synth-interface__close-button" 
            onClick={props.handleClose}
        >X</button>
    </div>
);

export default HeaderModule;