import React, { Component } from 'react';
import * as ActionCreators from '../../actions';
import { connect } from 'react-redux';
import MasterSlider from './MasterSlider';

export class MasterSliderContainer extends Component {

    handleVolumeChange = (e) => {
        this.props.setMasterVolume(parseFloat(e.target.value));
    }

    render() {
        return <MasterSlider 
            volume={this.props.volume}
            handleVolumeChange={this.handleVolumeChange}
            trackId="master"
        />
    }
}


const mapStateToProps = state => ({
    volume: state.playerInfo.volume
});

export default connect(
    mapStateToProps,
    {
        setMasterVolume: ActionCreators.setMasterVolume
    }
)(MasterSliderContainer)