import React from 'react';
import HeaderModule from './HeaderModule';
import EnvelopeModule from './EnvelopeModule';
import OscillatorModule from './OscillatorModule';
import FilterModule from './FilterModule';
import FilterEnvelopeModule from './FilterEnvelopeModule';
import RangeInput from './RangeInput';

const DuoSynth = props => (
    <div className="synth-interface__container">
        <HeaderModule synthTitle="Duo Synth" handleClose={props.handleClose} />
        <div className="synth-interface__module-container">
            <RangeInput 
                inputId={'harmonicity'}
                label={'Harmonicity'}
                min={0.25}
                max={8}
                step={0.25}
                value={props.instrumentData.harmonicity}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
                propertyPathArray={['harmonicity']}
            />
            <RangeInput 
                inputId={'vibrato-amount'}
                label={'Vibrato Amount'}
                min={0}
                max={5}
                step={0.2}
                value={props.instrumentData.vibratoAmount}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
                propertyPathArray={['vibratoAmount']}
            />
            <RangeInput 
                inputId={'vibrato-rate'}
                label={'Vibrato Rate'}
                min={5}
                max={1000}
                step={5}
                value={props.instrumentData.vibratoRate}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
                propertyPathArray={['vibratoRate']}
            />
            <RangeInput 
                inputId={'volume'}
                label={'Volume'}
                min={-80}
                max={20}
                step={1}
                value={props.instrumentData.volume}
                handleChange={props.handleChange}
                instrumentId={props.instrumentId}
                propertyPathArray={['volume']}
            />
        </div>
        <div className="synth-interface__seperator">
            <h2 className="synth-interface__module-heading">Voice A</h2>
        </div>
        <EnvelopeModule 
            envelopeData={props.instrumentData.voice0.envelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice0']}
        />
        <OscillatorModule 
            oscillatorData={props.instrumentData.voice0.oscillator}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice0']}
        />
        <FilterModule 
            filterData={props.instrumentData.voice0.filter}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice0']}
        />
        <FilterEnvelopeModule 
            filterEnvelopeData={props.instrumentData.voice0.filterEnvelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice0']}
        />
        <div className="synth-interface__seperator">
            <h2 className="synth-interface__module-heading">Voice B</h2>
        </div>
        <EnvelopeModule 
            envelopeData={props.instrumentData.voice1.envelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice1']}
        />
        <OscillatorModule 
            oscillatorData={props.instrumentData.voice1.oscillator}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice1']}
        />
        <FilterModule 
            filterData={props.instrumentData.voice1.filter}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice1']}
        />
        <FilterEnvelopeModule 
            filterEnvelopeData={props.instrumentData.voice1.filterEnvelope}
            handleChange={props.handleChange}
            instrumentId={props.instrumentId}
            additionalNesting={['voice1']}
        />
    </div>
);

export default DuoSynth;