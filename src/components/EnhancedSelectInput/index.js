import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../SelectInput';

/*
The inputs for the Synth components require more complicated onChange callbacks than the generic input 
components, with extra arguments supplied beyond just the event object. This component just wraps the generic
SelectInput component and sets up the extra functionality, so other components can use this component essentially
the same way they would the regular SelectInput component, with a couple of extra props.
*/

const EnhancedSelectInput = props => {
    return (
        <SelectInput 
            inputId={props.inputId}
            label={props.label}
            value={props.value}
            options={props.options}
            handleChange={(e) => {
                const val = props.shouldConvertToFloat ? parseFloat(e.target.value) : e.target.value;
                props.handleChange(
                    props.identifier,
                    props.propertyPathArray,
                    val
                );
            }}
        />
    )
}

EnhancedSelectInput.propTypes = {
    inputId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    identifier: PropTypes.string.isRequired,
    propertyPathArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    shouldConvertToFloat: PropTypes.bool
}

export default EnhancedSelectInput;