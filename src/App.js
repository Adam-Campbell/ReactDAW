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
//import Dial from './components/Dial';
//import ExampleConsumer from './components/Dial/ExampleConsumer';
import { throttle } from 'lodash';
import DraggableWindow from './components/DraggableWindow';
import { DraggableWindowContextConsumer } from './components/DraggableWindowContext';

/*
<Dial
          updateValueCallback={this.throttledUpdateDial}
          dataMin={0}
          dataMax={300}
          stepSize={0.25}
          dialStartOffset={225}
          dialRange={270}
          defaultValue={1.5}
        >
          {(props) => <ExampleConsumer {...props} label="Volume" />}
        </Dial>
        <CustomDragLayer />
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.throttledUpdateDial = throttle(this.props.updateDial, 16).bind(this);
  }

  render() {
    return (
      <DraggableWindowContextConsumer>
        {({
          mouseDownX,
          mouseDownY,
          subscribeWindow,
          unsubscribeWindow,
          enterMouseDownState,
          exitMouseDownState,
          updateWindowPositions
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
  dialValue: state.dial.value
});

const withDnD = DragDropContext(HTML5Backend)(App);

export default connect(
  mapStateToProps,
  { 
    updateDial: ActionCreators.updateDial
  }
)(withDnD);
