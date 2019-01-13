import React from 'react';
import PropTypes from 'prop-types';

const SmallDial = props => (
    <div className="dial__outer-container">
        <div 
            className="dial__container" 
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
                className="dial" 
                ref={props.dialRef}
                style={{
                    transform: `rotate(${props.angle}deg)`
                }}
            >
                <span className="dial__marker"></span>
            </div>
        </div>
        <p className="dial__label">{props.label}</p>
        <input 
            className="dial__number-input"
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

export default SmallDial;