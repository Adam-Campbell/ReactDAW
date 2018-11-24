import React, { Component } from 'react';
//import { Stage, Layer, Text } from 'react-konva';
//import ColoredRect from './components/ColoredRect.js';
import PianoRoll from './components/PianoRoll.js';
import './App.css';
import AudioEngine from './components/AudioEngine';
import StartStopButton from './components/StartStopButton';
import { Rnd } from 'react-rnd';

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
      <React.Fragment>
        <AudioEngine />
        <StartStopButton />
        <PianoRoll numberOfBars={4} />
      </React.Fragment>
    );
  }
}

export default App;
