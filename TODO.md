________
  TODO
________


Saving/Loading
- first implementation can just use localStorage. 
- will have to create the logic to handle the saving and loading, as well as adding controls to the transport bar that let you save and load.

- two actions, SAVE_STATE and LOAD_STATE. They will both be thunks. 

- SAVE_STATE, for now none of the reducers will listen to this action. It will gather up the current state from the store, serialize it and store it in local storage.

- LOAD_STATE, will take the name of the item you wish to load as an argument. It will retreive that item from localStorage and deserialize it, and the resulting state will be returned to the store, with each reducer grabbing its own slice of state and updating itself. 


- simple loading and saving implemented. 
- still need to allow control over the name saved / loaded.
- add a modal that pops up when save is selected, that allows you to select the name to save under (via a text input), with a submit button that dispatches the action, or a cancel button that closes the modal. 
- add a modal that pops up when load is selected, that goes into local storage and finds all of the previously saved tracks then displays those in a list. Clicking any of them will load that track. Also has a cancel button to close the modal. 

- neither of these two modals need to be part of the activeWindows state, they don't need to be persisted at all. Potentially it might be best to not load the activeWindows part of state during the loading process at all, so when a project is loaded you just have the minimal workstation presented.   


- to be on the safe side I should namespace all of the tracks saved in local storage, something like '[saved_track] the-actual-track-name'

_____________________________________
 LOADING / SAVING COMPLETE FOR NOW
_____________________________________







Transport bar:
- rebuild to be full width and fixed at top of screen.
- add additional buttons, pause, skip to start of track etc.
- add button to allow opening of mixer window from the transport bar.
- create actual SVG icons for the buttons contents.
- possibly add waveform visualization to the transport bar? 
- add saving / loading controls.

__________________________________
  TRANSPORT BAR COMPLETE FOR NOW
__________________________________








AudioEngine:
- refactor the 'diffing' process that happens with every new set of props received.
- would it be better to have each class contain its own logic for this rather than everything living in the top level component?
- investigate issue with master volume not affecting the readings from the meter node attached to the master. Possibly I will have to add a volume node in the chain before the meter node, and use this volume node to alter the master volume rather than updating the value of Tone.Master.volume directly.
- still improvements to be made with how the Channel class handles its effects chains. 






UI improvements:
- create SVG icons for all buttons throughout the app.
- in general consider aesthetic improvements that could be made.
- migrate the css over to scss and split into seperate files at the component level. 
- investigate the issue where the custom drag layer is disappearing behind other windows when multiple windows are open simultaneously.
- make the composer component full screen, and everything else will open 'floating' in front of it. 
- investigate adding resize functionality to all of the components - so they resize on window resize. Will be the most challenging in the canvas based components. Will be necessary if the composer component is made full screen. 
- consider improvements to the instrument and effect interfaces. At the moment they are somewhat utalitarian, their is definate room for improvement. 






DrumKit
- convert the wav files to mp3 files. 
- consider the best approach to use for the drums going forward. At the least I want seperate volume controls for each drum, do I also want the ability to add effects to each drum seperately? I will have to consider the best way to facilitate this both in the AudioEngine and in the UI as well. 
- additionally, investigate ways to add 'velocity' controls to the drums. It will most likely involve manipulating the volume of the player, but if possible I would like to make it behave from the outside the same way that velocity behaves in synth based instruments. 



- basic hit velocity has been added to drumkit. Currently it takes velocity value (0 to 1 inclusive) and maps it to a decibel value in the range -80db to 0db.

- when I implement the volume control for each drum, I should add a dedicated Tone.Volume instance to handle this volume - because if I were to just set it directly on the Player instance then it would interfere with the volume being set by the hit velocity. 

