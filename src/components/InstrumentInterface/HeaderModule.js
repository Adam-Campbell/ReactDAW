import React from 'react';
import PropTypes from 'prop-types';

const HeaderModule = props => (
    <div className="instrument-interface__header-container">
        <h1 className="instrument-interface__title">{props.instrumentTitle}</h1>
    </div>
);

HeaderModule.propTypes = {
    instrumentTitle: PropTypes.string.isRequired
};

export default HeaderModule;