import React from 'react';
import PropTypes from 'prop-types';
import Meter from './Meter';

const MixerItem = props => (
    <div className="mixer__item">
        <div className="mixer__slider-container">
            <div className="mixer__volume-marker-container">
                <p className="mixer__volume-marker">10</p>
                <p className="mixer__volume-marker">0</p>
                <p className="mixer__volume-marker">-10</p>
                <p className="mixer__volume-marker">-20</p>
                <p className="mixer__volume-marker">-30</p>
                <p className="mixer__volume-marker">-40</p>
            </div>
            <input
                className="range-input range-input__mixer-volume"
                type="range"
                id="volume-slider"
                min={-40}
                max={10}
                step={0.25}
                value={props.volume}
                onChange={props.handleVolumeChange}
            ></input>
            <Meter trackId={props.trackId} />
        </div>
        <div className="mixer__button-container">
            <button 
                className={`mixer__button ${props.isMuted ? 'mixer__button--active' : ''}`}
                onClick={props.handleMuteButtonClick}
            >M</button>
            <button 
                className={`mixer__button ${props.isSolo ? 'mixer__button--active' : ''}`}
                onClick={props.handleSoloButtonClick}
            >S</button>
        </div>
        <input
            className="range-input range-input__mixer-pan"
            type="range"
            id="panner-slider"
            min={-1}
            max={1}
            step={0.005}
            value={props.pan}
            onChange={props.handlePanChange}
        ></input>
        <div className="mixer__pan-label-container">
            <p className="mixer__pan-label">L</p>
            <p className="mixer__pan-label">R</p>
        </div>
        <p className="mixer__track-name">{props.name}</p>
    </div>
);

MixerItem.propTypes = {
    volume: PropTypes.number.isRequired,
    handleVolumeChange: PropTypes.func.isRequired,
    trackId: PropTypes.string.isRequired,
    handleMuteButtonClick: PropTypes.func.isRequired,
    handleSoloButtonClick: PropTypes.func.isRequired,
    pan: PropTypes.number.isRequired,
    handlePanChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    isMuted: PropTypes.bool.isRequired,
    isSolo: PropTypes.bool.isRequired
};

export default MixerItem;