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
                        windows={windows}
                      >
                        {({ containerRef }) => <PianoRoll id={window.id} containerRef={containerRef}/>}
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
                        windows={windows}
                      >
                        {({ containerRef }) => <InstrumentInterface instrumentId={window.id} containerRef={containerRef} />}
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
                        windows={windows}
                      >
                        {({ containerRef }) => <TrackDetails trackId={window.id} containerRef={containerRef} />}
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
                        windows={windows}
                      >
                        {({ containerRef }) => <EffectInterface effectId={window.id} containerRef={containerRef} />}
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
                        windows={windows}
                      >
                        {({ containerRef }) => <Mixer containerRef={containerRef} />}
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

export default connect(mapStateToProps)(App);
