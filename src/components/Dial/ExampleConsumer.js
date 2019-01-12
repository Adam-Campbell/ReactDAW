import React from 'react';
import PropTypes from 'prop-types';

const ExampleConsumer = props => (
    <div className="dial__outer-container">
        <div 
            className="dial__container" 
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
        <input 
            type="number"
            value={props.value}
            onChange={(e) => {
                let val = e.target.value ? parseFloat(e.target.value) : props.value;
                props.updateValue(val);
            }}
            min={props.dataMin}
            max={props.dataMax}
            step={props.stepSize}
        ></input>
    </div>
);

export default ExampleConsumer;