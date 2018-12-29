import React from 'react';

const MixerItem = props => (
    <div className="mixer__item">
        <div className="mixer__slider-container">
            <span className="mixer__span"></span>
            <input
                className="range-input range-input__mixer-volume"
                type="range"
                id="volume-slider"
                min={-40}
                max={10}
                step={0.25}
                value={0}
                onChange={() => console.log('change is inevitable')}
            ></input>
            <span className="mixer__meter"></span>
        </div>
        <div className="mixer__button-container">
            <button className="mixer__button">M</button>
            <button className="mixer__button">S</button>
        </div>
        <input
            className="range-input range-input__mixer-pan"
            type="range"
            id="panner-slider"
            min={-1}
            max={1}
            step={0.005}
            value={0}
            onChange={() => console.log('change is inevitable')}
        ></input>
    </div>
);

export default MixerItem