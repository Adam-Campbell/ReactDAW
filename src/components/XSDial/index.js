import React from 'react';
import PropTypes from 'prop-types';

// +props.value.toFixed(3) will give me the value to 3 decimal places if I want to use that for the number
// input, to stop long run on numbers. 

const XSDial = props => (
    <div className="xs-dial__outer-container">
        <div 
            className="xs-dial__container" 
            tabIndex="0"
            onClick={props.handleClick}
            onKeyDown={props.handleKeyDown}
            onMouseDown={props.startInteraction}
            onMouseUp={props.endInteraction}
            onMouseMove={(e) => {
                e.persist();
                props.updateInteraction(e)
            }}
            onTouchStart={props.startInteraction}
            onTouchMove={(e) => {
                e.persist();
                e.preventDefault();
                props.updateInteraction(e);
            }}
            onTouchEnd={props.endInteraction}
        >
            <div 
                className="xs-dial" 
                ref={props.dialRef}
                style={{
                    transform: `rotate(${props.angle}deg)`
                }}
            >
                <span className="xs-dial__marker"></span>
            </div>
        </div>
        <p className="xs-dial__label">{props.label}</p>
        <input 
            className="xs-dial__number-input"
            type="number"
            value={props.value}
            onChange={(e) => {
                let val = e.target.value ? parseFloat(e.target.value) : props.value;
                props.updateValueCallback(val);
            }}
            min={props.dataMin}
            max={props.dataMax}
            step={props.stepSize}
        ></input>
    </div>
);

export default XSDial;