import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
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
import DragWrapper from './components/DragWrapper';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <AudioEngine />
        <Transport />
        <Composer />
        <CustomDragLayer /> 
        {
          this.props.activeWindows.map((window) => {
            switch (window.type) {
              case 'section':
                return <DragWrapper windowId={window.id} key={window.id} windowType={window.type}>
                          <PianoRoll id={window.id}/>
                        </DragWrapper>

              case 'synth':
                return <DragWrapper windowId={window.id} key={window.id} windowType={window.type}>
                          <InstrumentInterface instrumentId={window.id} />
                        </DragWrapper>

              case 'instrumentSettings':
                return <DragWrapper windowId={window.id} key={window.id} windowType={window.type}>
                          <TrackDetails trackId={window.id} />
                        </DragWrapper>

              case 'effect':
                return <DragWrapper windowId={window.id} key={window.id} windowType={window.type}>
                          <EffectInterface effectId={window.id} />
                        </DragWrapper>

              default:
                return null;
            }
          })
        }       
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeWindows: state.activeWindows
});

const withDnD = DragDropContext(HTML5Backend)(App);

export default connect(mapStateToProps)(withDnD);
