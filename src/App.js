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
import DragWrapper from './components/DragWrapper';
import Mixer from './components/Mixer';
import Modal from './components/Modal';
import Dial from './components/Dial';
import ExampleConsumer from './components/Dial/ExampleConsumer';
import { throttle } from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);
    this.throttledUpdateDial = throttle(this.props.updateDial, 16).bind(this);
  }

  render() {
    return (
      <div className="main-container">
        <AudioEngine />
        <Transport />
        <Dial
          updateValueCallback={this.throttledUpdateDial}
          dataMin={0}
          dataMax={300}
          stepSize={0.25}
          dialStartOffset={225}
          dialRange={270}
          defaultValue={1.5}
        >
          {(props) => <ExampleConsumer {...props} />}
        </Dial>
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

              case 'mixer':
                return <DragWrapper windowId={window.id} key={window.id} windowType={window.type}>
                          <Mixer />
                        </DragWrapper>

              default:
                return null;
            }
          })
        }  
        <Modal />   
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeWindows: state.activeWindows,
  dialValue: state.dial.value
});

const withDnD = DragDropContext(HTML5Backend)(App);

export default connect(
  mapStateToProps,
  { 
    updateDial: ActionCreators.updateDial
  }
)(withDnD);
