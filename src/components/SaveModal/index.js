import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import SaveModal from './SaveModal';

class SaveModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveName: ''
        }
    }

    updateSaveName = (e) => {
        this.setState({
            saveName: e.target.value
        });
    }

    handleSave = () => {
        const { saveName } = this.state;
        const namespacedSaveName = `[track_name] ${saveName}`;
        this.props.setCompositionSaveName(saveName);
        this.props.saveState(namespacedSaveName);
        this.props.closeModal();
    }

    render() {
        return <SaveModal 
            handleClose={this.props.closeModal}
            handleSave={this.handleSave}
            saveName={this.state.saveName}
            updateSaveName={this.updateSaveName}
        />
    }
}

export default connect(
    undefined, 
    {
        saveState: ActionCreators.saveState,
        closeModal: ActionCreators.closeModal,
        setCompositionSaveName: ActionCreators.setCompositionSaveName
    }
)(SaveModalContainer)