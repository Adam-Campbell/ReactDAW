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

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <AudioEngine />
        <div className="menu">
        <StartStopButton />
        </div>
        <Composer />
        {
          this.props.activeWindows.map((window) => {
            switch (window.type) {
              case 'section':
                return <PianoRoll id={window.id} key={window.id} />

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
