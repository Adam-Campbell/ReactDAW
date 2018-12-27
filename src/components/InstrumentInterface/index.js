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
import { instrumentTypes } from '../../constants';

export class InstrumentInterface extends Component {
    constructor(props) {
        super(props);
        this.handleChange = debounce(this.props.updateOneInstrumentSetting, 16, {leading: true, trailing: true}).bind(this);
        const instrument = this.props.instruments[this.props.instrumentId];
        this.state = {
            ...instrument
        };
    }

    get instrumentData() {
        return this.props.instruments[this.props.instrumentId].instrumentData;
    }

    handleClose = () => {
        this.props.closeWindow(this.props.instrumentId);
    }

    render() {

        const instrumentType = this.props.instruments[this.props.instrumentId].type;

        switch (instrumentType) {
            case instrumentTypes.default:
                return <Synth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case instrumentTypes.am:
                return <AMSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case instrumentTypes.fm:
                return <FMSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case instrumentTypes.duo:
                return <DuoSynth 
                    instrumentData={this.instrumentData}
                    instrumentId={this.props.instrumentId}
                    handleChange={this.handleChange}
                />

            case instrumentTypes.mono:
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

InstrumentInterface.propTypes = {
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
)(InstrumentInterface);
