import React, { Component } from 'react';
import * as ActionCreators from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MixerItem from './MixerItemContainer';
import MasterSliderContainer from './MasterSliderContainer';

class Mixer extends Component {

    render() {
        return (
            <div className="mixer__container">
                <div className="mixer__channel-controls-container">
                {this.props.channels.map(channel => (
                        <MixerItem 
                            trackId={channel.id}
                            key={channel.id}
                        />
                ))}
               </div>
                <MasterSliderContainer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    channels: state.channels
});

export default connect(mapStateToProps)(Mixer);