import React, { Component } from 'react';
import 'normalize.css';
import './App.css';
import './scss/style.scss';
import { connect } from 'react-redux';
import * as ActionCreators from './actions';
import PianoRoll from './components/PianoRoll';
import AudioEngine from './components/AudioEngine';
import Composer from './components/Composer';
import InstrumentInterface from './components/InstrumentInterface';
import TrackDetails from './components/TrackDetails';
import Transport from './components/Transport';
import EffectInterface from './components/EffectInterface';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CustomDragLayer from './components/CustomDragLayer';
import Mixer from './components/Mixer';
import Modal from './components/Modal';
import DraggableWindow from './components/DraggableWindow';
import { DraggableWindowContextConsumer } from './components/DraggableWindowContext';


class App extends Component {

  render() {
    return (
      <DraggableWindowContextConsumer>
        {({
          windows,
          mouseDownX,
          mouseDownY,
          subscribeWindow,
          unsubscribeWindow,
          enterMouseDownState,
          exitMouseDownState,
          updateWindowPositions,
          pullWindowToFront
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
            <CustomDragLayer />
            {
              this.props.activeWindows.map((window) => {
                switch (window.type) {
                  case 'section':
                    return (
                      <DraggableWindow 
                        windowId={window.id} 
                        key={window.id} 
                        windowType={window.type}
                        subscribeWindow={subscribeWindow}
                        unsubscribeWindow={unsubscribeWindow}
                        mouseDownX={mouseDownX}
                        mouseDownY={mouseDownY}
                        pullWindowToFront={pullWindowToFront}
                        windows={windows}
                      >
                        <PianoRoll id={window.id}/>
                      </DraggableWindow>
                    )
                    
                  case 'synth':
                    return (
                      <DraggableWindow 
                        windowId={window.id} 
                        key={window.id} 
                        windowType={window.type}
                        subscribeWindow={subscribeWindow}
                        unsubscribeWindow={unsubscribeWindow}
                        mouseDownX={mouseDownX}
                        mouseDownY={mouseDownY} 
                        pullWindowToFront={pullWindowToFront}
                        windows={windows}
                      >
                        <InstrumentInterface instrumentId={window.id} />
                      </DraggableWindow>
                    );

                  case 'instrumentSettings':
                    return (
                      <DraggableWindow 
                        windowId={window.id} 
                        key={window.id} 
                        windowType={window.type}
                        subscribeWindow={subscribeWindow}
                        unsubscribeWindow={unsubscribeWindow}
                        mouseDownX={mouseDownX}
                        mouseDownY={mouseDownY}
                        pullWindowToFront={pullWindowToFront}
                        windows={windows}
                      >
                        <TrackDetails trackId={window.id} />
                      </DraggableWindow>
                    );

                  case 'effect':
                    return (
                      <DraggableWindow 
                        windowId={window.id} 
                        key={window.id} 
                        windowType={window.type}
                        subscribeWindow={subscribeWindow}
                        unsubscribeWindow={unsubscribeWindow}
                        mouseDownX={mouseDownX}
                        mouseDownY={mouseDownY}
                        pullWindowToFront={pullWindowToFront}
                        windows={windows}
                      >
                        <EffectInterface effectId={window.id} />
                      </DraggableWindow>
                    );

                  case 'mixer':
                    return (
                      <DraggableWindow 
                        windowId={window.id} 
                        key={window.id} 
                        windowType={window.type}
                        subscribeWindow={subscribeWindow}
                        unsubscribeWindow={unsubscribeWindow}
                        mouseDownX={mouseDownX}
                        mouseDownY={mouseDownY}
                        pullWindowToFront={pullWindowToFront}
                        windows={windows}
                      >
                        <Mixer />
                      </DraggableWindow>
                    );

                  default:
                    return null;
                }
              })
            }  
            <Modal />   
          </div>
        )}
      </DraggableWindowContextConsumer>
    );
  }
}

const mapStateToProps = state => ({
  activeWindows: state.activeWindows,
});

const withDnD = DragDropContext(HTML5Backend)(App);

export default connect(mapStateToProps)(withDnD);
