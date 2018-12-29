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
               <MixerItem />
               <MixerItem /> 
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Mixer);