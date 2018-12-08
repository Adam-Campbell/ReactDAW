import React, { Component } from 'react';
//import { Stage, Layer, Text } from 'react-konva';
//import ColoredRect from './components/ColoredRect.js';
import { connect } from 'react-redux';
import * as ActionCreators from './actions';
import PianoRoll from './components/PianoRoll.js';
import './App.css';
import AudioEngine from './components/AudioEngine';
import StartStopButton from './components/StartStopButton';
import { Rnd } from 'react-rnd';
import Composer from './components/Composer';
import SynthInterface from './components/SynthInterface';
import TrackDetails from './components/TrackDetails';
import Transport from './components/Transport';
import EffectInterface from './components/EffectInterface';

// class App extends Component {
//   render() {
//     return (
//       <div className="canvas-container">
//         <Stage width={400} height={700}>
//           <Layer>
//             <Text text="Try to click on the rectangle."/>
//             <ColoredRect />
//           </Layer>
//         </Stage>
//       </div>
//     );
//   }
// }

const mockedSectionState = {
  789: {
    id: '789',
    channelId: '123',
    notes: [],
    start: '0:0:0',
    numberOfBars: 4
  }
}

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <AudioEngine />
        <div className="menu">
        <StartStopButton />
        </div>
        <Transport />
        <Composer />
        {
          this.props.activeWindows.map((window) => {
            switch (window.type) {
              case 'section':
                return <PianoRoll id={window.id} key={window.id} />

              case 'synth':
                return <SynthInterface instrumentId={window.id} key={window.id} />

              case 'instrumentSettings':
                return <TrackDetails trackId={window.id} key={window.id} />

              case 'effect':
                return <EffectInterface effectId={window.id} key={window.id} />

              default:
                return null;
            }
          })
        }
        
      </div>
    );
  }
}

// <PianoRoll numberOfBars={4} />

const mapStateToProps = state => ({
  activeWindows: state.activeWindows
});

export default connect(mapStateToProps)(App);
