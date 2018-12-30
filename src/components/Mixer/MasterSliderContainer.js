import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import { connect } from 'react-redux';
import MasterSlider from './MasterSlider';

class MasterSliderContainer extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
    }

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

MasterSliderContainer.propTypes = {

};

const mapStateToProps = state => ({
    volume: state.playerInfo.volume
});

export default connect(
    mapStateToProps,
    {
        setMasterVolume: ActionCreators.setMasterVolume
    }
)(MasterSliderContainer)