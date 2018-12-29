import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import PropTypes from 'prop-types';
import Meter from './Meter';

class MixerItem extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
    }

    get track() {
        return this.props.channels.find(channel => channel.id === this.props.trackId);
    }

    handleVolumeChange = (e) => {
        this.props.updateChannelVolume(this.props.trackId, parseFloat(e.target.value));
    }

    handlePanChange = (e) => {
        this.props.updateChannelPan(this.props.trackId, parseFloat(e.target.value));
    }

    handleMuteButtonClick = () => {
        if (this.track.isMuted) {
            this.props.unmuteChannel(this.props.trackId);
        } else {
            this.props.muteChannel(this.props.trackId);
        }
    }

    handleSoloButtonClick = () => {
        if (this.track.isSolo) {
            this.props.unsoloChannel(this.props.trackId);
        } else {
            this.props.soloChannel(this.props.trackId);
        }
    }

    render() {
        return (
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
                        value={this.track.volume}
                        onChange={this.handleVolumeChange}
                    ></input>
                    <Meter trackId={this.props.trackId} />
                </div>
                <div className="mixer__button-container">
                    <button 
                        className="mixer__button"
                        onClick={this.handleMuteButtonClick}
                    >M</button>
                    <button 
                        className="mixer__button"
                        onClick={this.handleSoloButtonClick}
                    >S</button>
                </div>
                <input
                    className="range-input range-input__mixer-pan"
                    type="range"
                    id="panner-slider"
                    min={-1}
                    max={1}
                    step={0.005}
                    value={this.track.pan}
                    onChange={this.handlePanChange}
                ></input>
                <div className="pan__label-container">
                    <p className="pan__label">L</p>
                    <p className="pan__label">R</p>
                </div>
                <p className="mixer__track-name">{this.track.name}</p>
            </div>
        );
    }
}

MixerItem.propTypes = {
    trackId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    channels: state.channels
});



export default connect(
    mapStateToProps,
    {
        updateChannelVolume: ActionCreators.updateChannelVolume,
        muteChannel: ActionCreators.muteChannel,
        unmuteChannel: ActionCreators.unmuteChannel,
        soloChannel: ActionCreators.soloChannel,
        unsoloChannel: ActionCreators.unsoloChannel,
        updateChannelPan: ActionCreators.updateChannelPan
    }
)(MixerItem)



// const MixerItem = props => (
//     <div className="mixer__item">
//         <div className="mixer__slider-container">
//             <div className="mixer__volume-marker-container">
//                 <p className="mixer__volume-marker">10</p>
//                 <p className="mixer__volume-marker">0</p>
//                 <p className="mixer__volume-marker">-10</p>
//                 <p className="mixer__volume-marker">-20</p>
//                 <p className="mixer__volume-marker">-30</p>
//                 <p className="mixer__volume-marker">-40</p>
//             </div>
//             <input
//                 className="range-input range-input__mixer-volume"
//                 type="range"
//                 id="volume-slider"
//                 min={-40}
//                 max={10}
//                 step={0.25}
//                 value={0}
//                 onChange={() => console.log('change is inevitable')}
//             ></input>
//             <Meter />
//         </div>
//         <div className="mixer__button-container">
//             <button className="mixer__button">M</button>
//             <button className="mixer__button">S</button>
//         </div>
//         <input
//             className="range-input range-input__mixer-pan"
//             type="range"
//             id="panner-slider"
//             min={-1}
//             max={1}
//             step={0.005}
//             value={0}
//             onChange={() => console.log('change is inevitable')}
//         ></input>
//         <div className="pan__label-container">
//             <p className="pan__label">L</p>
//             <p className="pan__label">R</p>
//         </div>
//         <p className="mixer__track-name">Stranger Synths</p>
//     </div>
// );