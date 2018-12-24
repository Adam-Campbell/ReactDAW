import React from 'react';
import PropTypes from 'prop-types';
import EnhancedRangeInput from '../EnhancedRangeInput';
import EnhancedSelectInput from '../EnhancedSelectInput';

const ModulationModule = props => (
    <div className="synth-interface__module-container">
        <h2 className="synth-interface__module-heading">Modulation</h2>
        <EnhancedRangeInput 
            inputId={'modulation-detune'}
            label={'Detune'}
            min={-100}
            max={100}
            step={1}
            value={props.modulationData.detune}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulation', 'detune']}
        />
        <EnhancedRangeInput 
            inputId={'modulation-phase'}
            label={'Phase'}
            min={0}
            max={360}
            step={1}
            value={props.modulationData.phase}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulation', 'phase']}
        />
        <EnhancedSelectInput
            inputId={'modulation-type'}
            label={'Type'}
            value={props.modulationData.type}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulation', 'type']}
            options={[
                {value: 'sine', text: 'Sine'},
                {value: 'square', text: 'Square'},
                {value: 'triangle', text: 'Triangle'},
                {value: 'sawtooth', text: 'Sawtooth'}
            ]}
        />
        <EnhancedRangeInput 
            inputId={'modulation-volume'}
            label={'Volume'}
            min={-80}
            max={20}
            step={1}
            value={props.modulationData.volume}
            handleChange={props.handleChange}
            identifier={props.instrumentId}
            propertyPathArray={[...props.additionalNesting, 'modulation', 'volume']}
        />
    </div>
);

ModulationModule.propTypes = {
    modulationData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    additionalNesting: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ModulationModule;