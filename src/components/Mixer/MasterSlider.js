import React from 'react';
import PropTypes from 'prop-types';
import Meter from './Meter';

const MasterSlider = props => (
    <div className="mixer__master-controls-container">
        <div className="mixer__master-slider-container">
            <div className="mixer__master-volume-marker-container">
                <p className="mixer__master-volume-marker">10</p>
                <p className="mixer__master-volume-marker">0</p>
                <p className="mixer__master-volume-marker">-10</p>
                <p className="mixer__master-volume-marker">-20</p>
                <p className="mixer__master-volume-marker">-30</p>
                <p className="mixer__master-volume-marker">-40</p>
            </div>
            <input
                className="range-input range-input__mixer-master-volume"
                type="range"
                id="master-volume-slider"
                min={-40}
                max={10}
                step={0.25}
                value={props.volume}
                onChange={props.handleVolumeChange}
            ></input>
            <Meter trackId={props.trackId} isMaster />
        </div>
    </div>
); 

MasterSlider.propTypes = {
    volume: PropTypes.number.isRequired,
    handleVolumeChange: PropTypes.func.isRequired,
    trackId: PropTypes.string.isRequired
};

export default MasterSlider;