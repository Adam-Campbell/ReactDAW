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


Should all of the updating logic be in the AudioEngine class? 

What if instead I gave each of the child classes its own reconciliation method that could be called with the previous and current states and it just updates itself? So the Bus gets called - Bus.reconcile(prevState, currState)
and it updates things like the playing status, volume, bpm etc. 



Bus.reconcile()
This will reconcile all player related things - it will start, stop or pause the master as needed, mute or unmute
the master as needed, as well as update the volume and bpm. 


Channel.reconcile()
This will reconcile all channel related things besides the sections, so it will reconcile the instrument, effects
chain, volume, panning, and solo and mute status of the channel. 

Section.reconcile()
This will reconcile all section related things. 



Have implemented a basic reconcile function on the bus, only updates player related things, but is fully 
functional. 

Using the 'difference' function from lodash may help making some of the channels and sections logic a bit
easier. To determine which channels need to be deleted, use difference(oldChannels, newChannels) which will 
filter it down into channels that are only in oldChannels. Then use difference(newChannels, oldChannels) to
get the ones that only appear in new channels and thus need to be updated. 

Then to get the ones that are in both oldChannels and newChannels, you can use difference with newChannels and
the result of our previous difference(newChannels, oldChannels) call. Or, you can just the intersection method
from lodash, giving it oldChannels and newChannels as its inputs, which will return only the channels that are
in both. 

Although this talks about channels specifically, it should also work for other things such as notes etc. 

____________________________________
  AUDIO ENGINE COMPLETE AND TESTED
____________________________________






















UI improvements:
- create SVG icons for all buttons throughout the app.
- in general consider aesthetic improvements that could be made.
- migrate the css over to scss and split into seperate files at the component level. 
- investigate the issue where the custom drag layer is disappearing behind other windows when multiple windows are open simultaneously.
- make the composer component full screen, and everything else will open 'floating' in front of it. 
- investigate adding resize functionality to all of the components - so they resize on window resize. Will be the most challenging in the canvas based components. Will be necessary if the composer component is made full screen. 
- consider improvements to the instrument and effect interfaces. At the moment they are somewhat utalitarian, their is definite room for improvement. 



- composer component has been made full screen and also resizes on window resize. There are still some visual improvements to make but I will make those when I revamp the looks of the rest of the app. 






DrumKit
- convert the wav files to mp3 files. 
- consider the best approach to use for the drums going forward. At the least I want seperate volume controls for each drum, do I also want the ability to add effects to each drum seperately? I will have to consider the best way to facilitate this both in the AudioEngine and in the UI as well. 
- additionally, investigate ways to add 'velocity' controls to the drums. It will most likely involve manipulating the volume of the player, but if possible I would like to make it behave from the outside the same way that velocity behaves in synth based instruments. 



- basic hit velocity has been added to drumkit. Currently it takes velocity value (0 to 1 inclusive) and maps it to a decibel value in the range -80db to 0db.

- when I implement the volume control for each drum, I should add a dedicated Tone.Volume instance to handle this volume - because if I were to just set it directly on the Player instance then it would interfere with the volume being set by the hit velocity. 

- volume and panning for each individual drum has now been added, and the drumkit interface in the UI has been updated to reflect these changes.


- one final thing is to figure out a way to adjust how the drums handle velocity - it is set in db (logarithmic) but I want it to be used from the outside as a linear scale from 0 to 1. So conversions will need to happen.

________________________________________
  DRUMKIT DONE (except for last point)
________________________________________







MISC

- implement undo redo - see the redux docs for more information on this. 
- undo/redo has now been implemented, however I need to update the tests as a lot of them will now be failing due to changes made. I also need to create some new tests for new things that were added. Also, ideally I would like the active windows part of state not to be in the main undoable part of state, so that the windows opening and closing is not affected by undo/redo. However I will need to come up with a solution for the eventuality that a window gets opened, and then the thing that that window represents gets deleted as part of an undo action, and then we have an open window with no entity for it to display. Should the activeWindows reducer listen to all of the other actions and remove an item from its array when the corresponding entity no longer exists? Or should I just keep the window open but have an error state saying that the entity that corresponds to this window has been deleted?

- after some investigation I believe the best solution to the problem above would be to utilise error boundaries to catch the error when an entity is deleted whilst its window is still active. This stops the error from affecting the rest of the program, a fallback UI can be displayed to let the user know what happened and then they can just close the window. At the moment I have implemented the error boundary in the PianoRoll component, perhaps I can implement it in the DragWrapper component and that can cover an error occurring in any component that is currently inside the drag wrapper?

- have now moved the activeWindows reducer out of the main undoable part of state. However, I still need to work out exactly how error handling will work. 





- review the tools usage throughout the composer and piano roll components. Does the pencil tool need to be seperate or could it be integrated into the main tool?

- add a visual effect when selecting a range via dragging - a tinted overlay should appear over the area covered by the drag. 

- begin to think about better components for the instrument and effects interfaces. A dial would probably be better than using range inputs. It should also have an accompanying text input where the user can manually type in the new value, and also shift clicking (or alt clicking) the dial should reset it to a default value. To calculate the value will probably involve determining the angle the dial is turned to, via the pythagorean theorem and trigonometric functions. 

- think about ways in which the controls used for the instruments and effects interfaces can be made highly reuseable. Ideally I'd like them to be completely composable, so for each instrument or effect they can be mixed and match depending on the control requirements for that particular instance, with a good degree of control over the layout. 





VISIBLE SELECTION OVERLAY

- should be its own layer on the canvas

- needs to know the origin point of the selection and the current end of the selection. We can call those selectionStart and selectionEnd?

- what are the conditions for a selection rect to be rendered? Shift + click enters selection mode?



- in the components state, have shiftKeyPressed and mouseIsDown properties. shiftKeyPressed is set to true when shift key is pressed, and then set to false again when shift key is released. mouseIsDown is set to true onMouseDown and then set to false onMouseUp.



- I will need to add incorporate the selection overlay into the notes layer. So I should turn this into a class based component and move over the necessary logic from the selection overlay layer I was previously working on. 





