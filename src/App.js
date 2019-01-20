import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import './scss/style.scss';
import AudioEngine from './components/AudioEngine';
import Composer from './components/Composer';
import Transport from './components/Transport';
import Modal from './components/Modal';
import { DraggableWindowContextConsumer } from './components/DraggableWindowContext';
import ActiveWindows from './components/ActiveWindows';

class App extends Component {

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

export default App;
