import React from 'react';
import PropTypes from 'prop-types';

const HeaderModule = props => (
    <div className="synth-interface__header-container">
        <h1 className="synth-interface__title">{props.synthTitle}</h1>
    </div>
);

HeaderModule.propTypes = {
    synthTitle: PropTypes.string.isRequired
};

export default HeaderModule;