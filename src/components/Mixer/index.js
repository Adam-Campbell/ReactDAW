import React, { Component } from 'react';
import * as ActionCreators from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MixerItem from './MixerItem';

class Mixer extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
    }

    render() {
        return (
            <div className="mixer__container">
               {this.props.channels.map(channel => (
                    <MixerItem 
                        trackId={channel.id}
                        key={channel.id}
                    />
               ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    channels: state.channels
});

export default connect(mapStateToProps)(Mixer);