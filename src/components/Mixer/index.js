import React from 'react';
import * as ActionCreators from '../../actions';
import { connect } from 'react-redux';
import MixerItemContainer from './MixerItemContainer';
import MasterSliderContainer from './MasterSliderContainer';


export const Mixer = props => (
    <div className="mixer__container">
        <div className="mixer__channel-controls-container">
        {props.channels.map(channel => (
                <MixerItemContainer 
                    trackId={channel.id}
                    key={channel.id}
                />
        ))}
        </div>
        <MasterSliderContainer />
    </div>
);

const mapStateToProps = state => ({
    channels: state.channels
});

export default connect(mapStateToProps)(Mixer);