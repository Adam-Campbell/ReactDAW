import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'normalize.css';
//import './App.css';
import './scss/style.scss';
import * as ActionCreators from './actions';
import { ActionCreators as undoableActions } from 'redux-undo'; 
import AudioEngine from './components/AudioEngine';
import Composer from './components/Composer';
import Transport from './components/Transport';
import Modal from './components/Modal';
import { DraggableWindowContextConsumer } from './components/DraggableWindowContext';
import ActiveWindows from './components/ActiveWindows';
import { toolTypes } from './constants';

class App extends Component {

  componentDidMount() {
    window.document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.key === '1' && e.altKey) {

      this.props.setToolType(toolTypes.cursor);

    } else if (e.key === '2' && e.altKey) {

      this.props.setToolType(toolTypes.pencil);

    } else if (e.key === '3' && e.altKey) {

      this.props.setToolType(toolTypes.selection);

    } else if (e.key === 'z' && e.ctrlKey) {
      
      this.props.undo();

    } else if (e.key === 'x' && e.ctrlKey) {
      
      this.props.redo();
      
    }
  }

  render() {
    return (
      <DraggableWindowContextConsumer>
        {({
          enterMouseDownState,
          exitMouseDownState,
          updateWindowPositions,
        }) => (
          <div 
            className="main-container"
            onMouseDown={enterMouseDownState}
            onMouseUp={exitMouseDownState}
            onMouseMove={updateWindowPositions}
          >
            <AudioEngine />
            <Transport />
            <Composer />
            <ActiveWindows />  
            <Modal />   
          </div>
        )}
      </DraggableWindowContextConsumer>
    );
  }
}

export default connect(
  undefined,
  {
    setToolType: ActionCreators.setToolType,
    undo: undoableActions.undo,
    redo: undoableActions.redo
  }
)(App);
