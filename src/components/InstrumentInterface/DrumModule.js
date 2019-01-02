import React from 'react';
import PropTypes from 'prop-types';
import EnhancedSelectInput from '../EnhancedSelectInput';
import EnhancedRangeInput from '../EnhancedRangeInput';

const DrumModule = props => (
    <div className="drum-module__container">
        <p className="drum-module__title">{props.drumName}</p>
        <EnhancedRangeInput 
            inputId={`${props.drumType}-volume`}
            label="Volume"
            min={-40}
            max={10}
            step={0.25}
            value={props.drumData.volume}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[props.drumType, 'volume']}
        />
        <EnhancedRangeInput 
            inputId={`${props.drumType}-panning`}
            label="Panning"
            min={-1}
            max={1}
            step={0.005}
            value={props.drumData.pan}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[props.drumType, 'pan']}
        />
        <EnhancedSelectInput 
            inputId={`${props.drumType}-sample`}
            label="Sample"
            value={props.drumData.sample}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[props.drumType, 'sample']}
            options={props.drumSampleOptions}
        />
    </div>
);

export default DrumModule;

DrumModule.propTypes = {
    drumType: PropTypes.string.isRequired,
    drumName: PropTypes.string.isRequired,
    drumData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    drumSampleOptions: PropTypes.arrayOf(PropTypes.object).isRequired
};
