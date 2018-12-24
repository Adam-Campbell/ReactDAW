import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Synth from './Synth';
import AMSynth from './AMSynth';
import FMSynth from './FMSynth';
import DuoSynth from './DuoSynth';
import MonoSynth from './MonoSynth';
import { synthTypes } from '../../constants';

export class SynthInterface extends Component {
    constructor(props) {
        super(props);
        this.handleChange = debounce(this.props.updateOneInstrumentSetting, 16, {leading: true, trailing: true}).bind(this);
        const synth = this.props.instruments[this.props.instrumentId];
        this.state = {
            ...synth
        };
    }

    get instrumentData() {
        return this.props.instruments[this.props.instrumentId].synthData;
    }

    handleClose = () => {
        this.props.closeWindow(this.props.instrumentId);
    }

    render() {

        const synthType = this.props.instruments[this.props.instrumentId].type;

        switch (synthType) {
            case synthTypes.default:
                return <Synth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case synthTypes.am:
                return <AMSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case synthTypes.fm:
                return <FMSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case synthTypes.duo:
                return <DuoSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case synthTypes.mono:
                return <MonoSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            default:
                return null;
        }

    }
}

SynthInterface.propTypes = {
    instrumentId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    instruments: state.instruments
});

export default connect(
    mapStateToProps,
    {
        updateOneInstrumentSetting: ActionCreators.updateOneInstrumentSetting,
        closeWindow: ActionCreators.closeWindow
    }
)(SynthInterface);
