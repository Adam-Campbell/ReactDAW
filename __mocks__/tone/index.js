import { transportPositionStringToSixteenths } from '../../src/sharedUtils';

/*

The mocked Tone needs to be able to create the following classes: 
Volume
Meter
Solo
Panner
Player
Part
PolySynth
Synth
AMSynth
FMSynth
DuoSynth
MonoSynth

Don't need to create all of the effect classes, just create a few to utilise in testing. Will create:

Chorus
FeedbackDelay
Distortion

All audionode classes need to have connect and disconnect methods


It needs to have Master and Transport properties, they will both have their own properties and methods. 

Master
  volume
    value
  mute
  chain()

Transport
  pause()
  start()
  stop()
  bpm
    value


*/

import Master from './Master';
import Transport from './Transport';
import Volume from './Volume';
import Solo from './Solo';
import Meter from './Meter';
import Panner from './Panner';
import Player from './Player';
import Part from './Part';
import PolySynth from './PolySynth';
import Synth from './Synth';
import AMSynth from './AMSynth';
import FMSynth from './FMSynth';
import DuoSynth from './DuoSynth';
import MonoSynth from './MonoSynth';
import Chorus from './Chorus';
import FeedbackDelay from './FeedbackDelay';
import Distortion from './Distortion';

const Tone = {
    Master: new Master(),
    Transport: new Transport(),
    Volume,
    Solo,
    Meter,
    Panner,
    Player,
    Part,
    PolySynth,
    Synth,
    AMSynth,
    FMSynth,
    DuoSynth,
    MonoSynth,
    Chorus,
    FeedbackDelay,
    Distortion,
    Time: (input) => {
      const toBBS = transportPositionStringToSixteenths(input);
        return {
            BBSValue: toBBS,
            toTicks: function() {
                return this.BBSValue * 48
            }
        }
    },
    Ticks: (input) => {
      switch (input) {
          case '16n':
              return 48;
          case '8n':
              return 96;
          default:
              return 48;
      }
  }
};

export default Tone;