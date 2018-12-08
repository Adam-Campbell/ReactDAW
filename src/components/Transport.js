import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';

class Transport extends Component {
    constructor(props) {
        super(props);
        this.foo = 'bar';
    }

    render() {
        return (
            <div className="transport__container">
                <button 
                    className="transport__button"
                    onClick={this.props.playTrack}
                >Play</button>
                <button 
                    className="transport__button"
                    onClick={this.props.stopTrack}
                >Stop</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {
        playTrack: ActionCreators.playTrack,
        stopTrack: ActionCreators.stopTrack
    }
)(Transport);