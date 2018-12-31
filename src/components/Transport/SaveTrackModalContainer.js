import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  
import * as ActionCreators from '../../actions';
import SaveTrackModal from './SaveTrackModal';

export class SaveTrackModalContainer extends Component {

    constructor(props) {
        super(props);
        this.root = document.getElementById('modal-root');
        this.el = document.createElement('div');
        this.state = {
            saveName: ''
        }
    }

    componentDidMount() {
        this.root.appendChild(this.el);
    }

    componentWillUnmount() {
        this.root.removeChild(this.el);
    }

    updateSaveName = (e) => {
        this.setState({
            saveName: e.target.value
        });
    }

    handleSave = () => {
        const { saveName } = this.state;
        const namespacedSaveName = `[track_name] ${saveName}`;
        this.props.saveState(namespacedSaveName);
        this.props.handleClose();
    }

    render() {
        return  ReactDOM.createPortal(
            <SaveTrackModal 
                handleClose={this.props.handleClose}
                saveName={this.state.saveName}
                updateSaveName={this.updateSaveName}
                handleSave={this.handleSave}
            />,
            this.el
        )
    }
}


SaveTrackModalContainer.propTypes = {
    handleClose: PropTypes.func.isRequired
};

export default connect(
    undefined, 
    {
        saveState: ActionCreators.saveState
    }
)(SaveTrackModalContainer);