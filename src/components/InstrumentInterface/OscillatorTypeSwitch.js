import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OscillatorTypeSwitch extends Component {

    constructor(props) {
        super(props);
        this.sineButtonRef = React.createRef();
        this.squareButtonRef = React.createRef();
        this.triangleButtonRef = React.createRef();
        this.sawtoothButtonRef = React.createRef();
        this.noneButtonRef = React.createRef();
        this.amButtonRef = React.createRef();
        this.fmButtonRef = React.createRef();
        this.fatButtonRef = React.createRef();
        this.buttonRefs = [
            this.noneButtonRef, 
            this.amButtonRef,
            this.fmButtonRef,
            this.fatButtonRef,
            this.sineButtonRef,
            this.squareButtonRef,
            this.triangleButtonRef,
            this.sawtoothButtonRef
        ];
    }

    static propTypes = {
        handleChangeCallback: PropTypes.func,
        value: PropTypes.string,
    }

    /**
     * Checks the refs for each radio button to determine which ones are checked, and uses this information
     * to create a new string value to dispatch to pass to the callback provided as a prop. 
     */
    handleChange = () => {
        let val = this.buttonRefs.reduce((acc, next) => {
            return next.current.checked ? acc + next.current.value : acc;
        }, '');
        this.props.handleChangeCallback(val);
    }

    /**
     * Takes the incoming value passed in as a prop, and splits it into a substring representing the current
     * modification, and a substring representing the oscillator type, then returns the two substrings as 
     * properties of an object. 
     * @param {String} rawString - the value prop passed to the component.
     * @returns {Object} - an object with mod and osc properties containing the modification and oscillator
     * substrings. 
     */
    parseIncomingValue = (rawString) => {
        const regex = /(am|fm|fat|sine|square|triangle|sawtooth)/g;
        const matches = rawString.match(regex);
        return {
            osc: matches[matches.length-1],
            mod: matches.length > 1 ? matches[0] : ''
        };
    }

    render() {
        const valuesObj = this.parseIncomingValue(this.props.value);
        return (
            <div>
                <fieldset>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="sine" name="oscillator-type" value="sine" 
                        ref={this.sineButtonRef} onChange={this.handleChange}
                        checked={valuesObj.osc === 'sine'}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="sine">Sine</label>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="square" name="oscillator-type" value="square"
                        ref={this.squareButtonRef} onChange={this.handleChange}
                        checked={valuesObj.osc === 'square'}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="square">Square</label>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="triangle" name="oscillator-type" value="triangle"
                        ref={this.triangleButtonRef} onChange={this.handleChange}
                        checked={valuesObj.osc === 'triangle'}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="triangle">Triangle</label>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="sawtooth" name="oscillator-type" value="sawtooth"
                        ref={this.sawtoothButtonRef} onChange={this.handleChange}
                        checked={valuesObj.osc === 'sawtooth'}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="sawtooth">Sawtooth</label>
                </fieldset>
                <fieldset>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="none" name="oscillator-modifier" value=""
                        ref={this.noneButtonRef} onChange={this.handleChange}
                        checked={valuesObj.mod === ''}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="none">None</label>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="am" name="oscillator-modifier" value="am"
                        ref={this.amButtonRef} onChange={this.handleChange}
                        checked={valuesObj.mod === 'am'}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="am">AM</label>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="fm" name="oscillator-modifier" value="fm"
                        ref={this.fmButtonRef} onChange={this.handleChange}
                        checked={valuesObj.mod === 'fm'}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="fm">FM</label>
                    <input 
                        className="oscillator-type-switch__radio-button" 
                        type="radio" id="fat" name="oscillator-modifier" value="fat"
                        ref={this.fatButtonRef} onChange={this.handleChange}
                        checked={valuesObj.mod === 'fat'}
                    ></input>
                    <label className="oscillator-type-switch__label" htmlFor="fat">Fat</label>
                </fieldset>
            </div>
        )
    }
}

export default OscillatorTypeSwitch;