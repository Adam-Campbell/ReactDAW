import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { throttle } from 'lodash';
import { generateId } from '../../helpers';
import Tone from 'tone';
import Composer from './Composer';
import { 
    addOrRemoveElementFromSelection ,
    createCopiedSectionsDataStructure,
    getWholeBarsFromString,
    findEarliestStartTime
} from './ComposerUtils';
/*

Behaviours to be implemented:

- Copying and pasting of sections with ctrl+c and ctrl+v
- Deletion of selected section(s) with delete key
- The selection functionality needs to be expanded to handle the selection of multiple sections rather than
just one.
- Will need a way to select which track a section gets pasted to. Perhaps maintain a currentlySelectedTrack
property in state and update it when a track is clicked on.

- Will need to consider how pasting should work in general.

- Implement similar functionality to the PianoRoll component, whereby holding down ctrl whilst clicking
on a section allows you to add to the selection rather than replacing the entire selection.

- Make as much of the functionality pure as possible and move into a seperate utils file. 







First we handle selection and multi-select of sections. 

on section click

- Check if ctrl key is currently pressed. 
- If the ctrl key is pressed, then either add the clicked section to the current selection, or remove the clicked
section from the current selection, depending on whether or not the clicked section was already a part of the
selection.
- If the ctrl key is not pressed, then either set the current selection to only the clicked section, or empty out
the current selection entirely, depending on whether or note the clicked section was already in the selection. 


This is now done.




copying and pasting strategy

We want to be able to copy sections from multiple different tracks simultaneously, and when we paste we want
the order/positions of the tracks that the sections were copied from to be respected, relative to each other,
but we want the pasting to start at the track that is selected at the time the paste operation begins.

That is to say, if we copy a selection of a section on track 1, a section on track 3 and one on track 4, then 
we select track 2 as our active track and hit paste, the sections are pasted onto tracks 2, 4 and 5 respectively. 

If this approach causes one of the sections to go 'out of bounds', that section doesn't get pasted. So if we only 
had 4 tracks when we tried that previous example, the section that would have been pasted on track 5 just doesn't
get pasted. 

But how best to facilitate this? 

When we copy the sections, we will be taking the sectionId from our selection state, and grabbing the actual
section data for that section. We then comprise our copy data of the data we get from this. However, we should
replace the channelId prop with the index of the channel within the channels array. Then when the paste operation
occurs, we can use this index to work out which track the section needs to be added to, the tracks could change 
during the time between the copying and pasting events occuring. 

One more thing is needed, when we perform the copy operation, we need to keep track of the smallest index we 
get, and we need to save that somewhere in the data structure that our copy operation creates. Then when we
perform the paste operation, we can work out index of the correct track to add a section to with the following
formula:

index from the copied section  -  smallest index from copy operation  +  index of active track when pasting

So if we copy a selection where the lowest index is 1, and we have a given section with index 2 from that
selection, and the active track is during paste is track 2, we would get 2 - 1 + 2 = 3, so the given section
would be pasted on track 3, this is the desired behaviour. 

__________________________________________________________________________________________________________
__________________________________________________________________________________________________________

Copying dealt with, now pasting...

When paste operation begins, take note of which track is currently selected. If there is not one selected,
just choose the track at index 0. 

Query Tone.Transport to determine what time to start pasting from. Round down to the nearest whole bar.

Loop through all of the section objects, and find the earliest start time, save into a variable. This start
time can be used to determine the relative start time of any of the sections - just take the start time of
that section and subtract the earliest start time from it. 

Now loop through each section object and dispatch an addSection action with a new section object based off of
that section object. This new section object  will have an adjusted start time (see above), and we will have
to use the channelIndex property to find the correct channelId. In addition, if there are any notes in the
section, we have to create copies of the notes but with new _ids. 




*/



class ComposerContainer extends Component {

    constructor(props) {
        super(props);
        //this.canvasWidth = 200 * 48;
        //this.canvasHeight = 7 * 70 + 40;
        this.stageWidth = 740;
        this.stageHeight = 300;
        this.scrollPadding = 10;
        this.stageRef = React.createRef();
        this.gridLayerRef = React.createRef();
        this.sectionsLayerRef = React.createRef();
        this.transportLayerRef = React.createRef();
        this.seekerLayerRef = React.createRef();
        this.seekerLineRef = React.createRef();
        this.rAFRef = null;
        this.horizontalDragMove = throttle(this.horizontalDragMove, 16);
        this.verticalDragMove = throttle(this.verticalDragMove, 16);
        this.state = {
            sectionDuration: 4,
            currentlySelectedChannel: null,
            currentlySelectedSections: [],
            currentlyCopiedSections: {},
            mouseDownPosX: 0,
            mouseDownPosY: 0,
            pencilActive: false,
            trackInfoMenuTopScroll: 0,
            transportPosition: 0
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.getTransportPosition);
            } else {
                cancelAnimationFrame(this.rAFRef);
                this.seekerLineRef.current.x(0);
                this.seekerLayerRef.current.batchDraw();
            }
        }
    }

    get canvasHeight() {
        return Math.max(4, this.props.channels.length) * 70 + 40;
    }

    get canvasWidth() {
        return 200 * 48;
    }

    _createGridLinesArray() {
        let linesArray = [];
        // create vertical lines
        for (let i = 0; i <= 200;  i++) {
            linesArray.push([i*48 , 40, i*48, this.canvasHeight]);
        }
        // create horizontal lines
        let verticalBound = Math.max(4, this.props.channels.length);
        for (let j = 0; j <= verticalBound; j++) {
            linesArray.push([0, j*70+40, this.canvasWidth, j*70+40]);
        }
        return linesArray;
    }

    barsToNumbers = (barsString) => {
        let subStr = barsString.split(':')[0];
        return parseInt(subStr);
        //return parseInt(barsString.charAt(0));
    }

    verticalDragMove = (e) => {
        if (this.stageHeight > this.canvasHeight) {
            return;
        }
        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.y - this.scrollPadding;
        const totalSliderRange = this.stageHeight - this.scrollPadding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;
        // update the layers
        const totalCanvasRange = this.canvasHeight - this.stageHeight + this.scrollPadding + 24;
        const scrollAmount = -(totalCanvasRange * delta);
        this.setState({
            trackInfoMenuTopScroll: scrollAmount
        });
        this.gridLayerRef.current.y(-(totalCanvasRange * delta));
        this.sectionsLayerRef.current.y(-(totalCanvasRange * delta));
        this.gridLayerRef.current.batchDraw();
        this.sectionsLayerRef.current.batchDraw();
    }

    horizontalDragMove = (e) => {
        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.x - this.scrollPadding;
        const totalSliderRange = this.stageWidth - this.scrollPadding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;
        // update the layers
        const totalCanvasRange = this.canvasWidth - this.stageWidth + this.scrollPadding + 24;
        this.gridLayerRef.current.x(-(totalCanvasRange * delta));
        this.sectionsLayerRef.current.x(-(totalCanvasRange * delta));
        this.transportLayerRef.current.x(-(totalCanvasRange * delta));
        this.seekerLayerRef.current.x(-(totalCanvasRange * delta));
        this.gridLayerRef.current.batchDraw();
        this.sectionsLayerRef.current.batchDraw();
        this.transportLayerRef.current.batchDraw();
        this.seekerLayerRef.current.batchDraw();
    }

    _createSectionRectsArray = () => {
        let arr = [];
        for (let i = 0; i < this.props.channels.length; i++) {
            let channel = this.props.channels[i];
            for (let sectionId of channel.sectionIds) {
                let section = this.props.sections[sectionId];
                let rectObject = {
                    x: this.barsToNumbers(section.start) * 48,
                    y: (i * 70) + 40,
                    width: section.numberOfBars * 48,
                    height: 70,
                    color: channel.color,
                    sectionId: section.id
                }
                arr.push(rectObject);
            }
        }
        return arr;
    }

    oldhandleStageClick = (e) => {
        // get x and y positions of click relative to layer.

        // to work out channel => Math.floor((y-40)/70), will produce 0 for first 
        // channel, 1 for second channel etc. The correct channel will be at that
        // that position in the channels array.

        // to work out start time => Math.floor(x/48), produces 0 for first bar, 1 
        // for second bar etc. Convert this number into bars:beats:sixteenths formatted
        // string, 0 becomes '0:0:0', 1 becomes '1:0:0' etc.

        if (e.target.attrs.type && e.target.attrs.type === 'section') {
            console.log('section was clicked on!');
            //this.props.openWindow(e.target.attrs.sectionId, 'section');
        } else {
            console.log('stage was clicked on!');
            const x = e.evt.layerX;
            const y = e.evt.layerY;
            const channelIndex = Math.floor((y-40)/70);
            const startAsNumber = Math.floor(x/48);
            const startAsBBS = `${startAsNumber}:0:0`;
            this.props.addSection(
                generateId(),
                this.props.channels[channelIndex].id,
                startAsBBS,
                this.state.sectionDuration
            );
        }
        
    }



    handleStageClick = (e) => {

        // set currentlySelectedSection back to null on every stage click to be safe.
        this.setState({
            currentlySelectedSection: null
        });

        // grab x and y positions for click
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;

        // if yPos < 40 then we have clicked on the transport section of the canvas
        if (yPos < 40) {
            const barClicked = `${Math.floor(xPos / 48)}:0:0`;
            Tone.Transport.position = barClicked;
            const newXPos = this.convertTransportPositionToXPos(Tone.Transport.position);        
            this.seekerLineRef.current.x(newXPos);
            this.seekerLayerRef.current.batchDraw();
            // otherwise we have clicked on the main section of the canvas
        } else {
            // if pencil is active then we don't want to do anything in the click event, everything is
            // handled by mouseDown and mouseUp events. 
            if (!this.state.pencilActive) {
                // use the information from the click event to dispatch an addSection action with the
                // necessary arguments.
                const scrolledX = this.gridLayerRef.current.attrs.x || 0;
                const scrolledY = this.gridLayerRef.current.attrs.y || 0;
                const adjustedXPos = xPos - scrolledX;
                const adjustedYPos = yPos - scrolledY;

                // this catches clicks that occur on rows that exist on the grid but do not have
                // channels assigned to them yet, we return early because we cannot try and add a 
                // section here yet.
                if (adjustedYPos > this.props.channels.length * 70 + 40) {
                    return;
                }

                const channelIndex = Math.floor((adjustedYPos-40)/70);
                const startAsNumber = Math.floor(adjustedXPos/48);
                const startAsBBS = `${startAsNumber}:0:0`;
                const newSectionObject = {
                    id: generateId(),
                    channelId: this.props.channels[channelIndex].id,
                    notes: [],
                    start: startAsBBS,
                    numberOfBars: this.state.sectionDuration
                };
                this.props.addSection(
                    newSectionObject,
                    newSectionObject.id,
                    newSectionObject.channelId
                );
            }
        }

    }

    handleStageMouseDown = (e) => {
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;
        const scrolledX = this.gridLayerRef.current.attrs.x || 0;
        const scrolledY = this.gridLayerRef.current.attrs.y || 0;
        const adjustedXPos = xPos - scrolledX;
        const adjustedYPos = yPos - scrolledY;
        const isSection = e.target.attrs.type && e.target.attrs.type === 'section';
        if (yPos >= 40 && this.state.pencilActive && !isSection) {
            this.setState({
                mouseDownPosX: adjustedXPos,
                mouseDownPosY: adjustedYPos
            });
        }
    }

    handleStageMouseUp = (e) => {
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;
        const scrolledX = this.gridLayerRef.current.attrs.x || 0;
        const scrolledY = this.gridLayerRef.current.attrs.y || 0;
        const adjustedXPos = xPos - scrolledX;
        const adjustedYPos = yPos - scrolledY;

        // this catches clicks that occur on rows that exist on the grid but do not have
        // channels assigned to them yet, we return early because we cannot try and add a 
        // section here yet.
        if (adjustedYPos > this.props.channels.length * 70 + 40) {
            return;
        }

        const isSection = e.target.attrs.type && e.target.attrs.type === 'section';
        if (yPos >= 40 && this.state.pencilActive && !isSection) {
            // logic for creating section goes here...

            // to add a section we need:
            // sectionId - generate using generateId(),
            // channelId -  derive from state.mouseDownPosY
            // sectionStart - derive from state.mouseDownPosX
            // sectionLength - derive from diff between state.mouseDownPosX and xPos

            const { mouseDownPosX, mouseDownPosY } = this.state;
            const adjustedMouseDownPosY = mouseDownPosY - scrolledY
            if (adjustedMouseDownPosY > this.props.channels.length * 70 + 40) {
                return;
            }

            const channelIndex = Math.floor((mouseDownPosY - 40) / 70);
            const channelId = this.props.channels[channelIndex].id;
            const sectionStartAsNumber = Math.floor(mouseDownPosX / 48);
            const sectionStartAsBBS = `${sectionStartAsNumber}:0:0`;
            const sectionEndAsNumber = Math.round(adjustedXPos / 48);
            const sectionLengthInBars = sectionEndAsNumber - sectionStartAsNumber > 1 ?
                                        sectionEndAsNumber - sectionStartAsNumber : 1;
            
            const newSectionObject = {
                id: generateId(),
                channelId: channelId,
                notes: [],
                start: sectionStartAsBBS,
                numberOfBars: sectionLengthInBars
            };
            this.props.addSection(
                newSectionObject,
                newSectionObject.id,
                newSectionObject.channelId
            );
        }
    }

    handleSectionClick = (e, sectionId) => {
        // this is Konvas method for stopping the event from bubbling up to the other canvas elements,
        // we don't want to trigger their event listeners. 
        console.log(e);
        e.cancelBubble = true;
        this.setState({
            currentlySelectedSections: addOrRemoveElementFromSelection({
                currentSelectionState: this.state.currentlySelectedSections,
                element: sectionId,
                shouldPreserveSelection: e.evt.ctrlKey
            })
        });
    }

    handleSectionDoubleClick = (e, sectionId) => {
        // this is Konvas method for stopping the event from bubbling up to the other canvas elements,
        // we don't want to trigger their event listeners. 
        e.cancelBubble = true;
        this.setState({
            currentlySelectedSections: []
        });
        this.props.openWindow(sectionId, 'section');
    }

    updateCursorValue = (e) => {
        this.setState({
            pencilActive: e.target.value === 'pencil'
        });
    }

    updateSectionDurationValue = (e) => {
        this.setState({
            sectionDuration: parseInt(e.target.value)
        });
    }

    removeOneSection = (sectionId) => {
        const channelId = this.props.sections[sectionId].channelId;
        this.props.removeSection(sectionId, channelId);
    }

    getTransportPosition = () => {
        const newXPos = this.convertTransportPositionToXPos(Tone.Transport.position);        
        this.seekerLineRef.current.x(newXPos);
        this.seekerLayerRef.current.batchDraw();
        this.rAFRef = requestAnimationFrame(this.getTransportPosition);
    }

    convertTransportPositionToXPos = (transportPositionString) => {
        // Format of input string is "0:0:0", this will split it into an array of
        // [bars, beats, sixteenths]
        const spl= transportPositionString.split(':');
        // Convert the bars, beats and sixteenths into one figure in terms of sixteenths.
        const asSixteenths = parseInt(spl[0])*16 + 
                           parseInt(spl[1])*4 +
                           parseFloat(spl[2]);
        // ratio of sixteenths to pixels is 1/3, so multiply by 3 to turn the sixteenths value
        // into the appropriate x position.
        const asXPos = asSixteenths * 3;
        return asXPos;

    }

    handleKeyDown = (e) => {
        //console.log('handleKeyDown on the Composer was called');
        //console.log(e);
        e.preventDefault();
        e.stopPropagation();

        // handle deletion
        if (e.key === 'Delete') {
            this.handleSectionDeletion();
        }

        // handle copying
        if (e.key === 'c' && e.ctrlKey === true) {
            this.handleCopying();
        }

        // handle pasting
        if (e.key === 'v' && e.ctrlKey === true) {
            this.handlePasting();
        }
    }

    updateSelectedChannel = (channelId) => {
        this.setState({
            currentlySelectedChannel: channelId
        });
    }

    /**
     * Handles the deletion of sections.
     */
    handleSectionDeletion = () => {
        for (let sectionId of this.state.currentlySelectedSections) {
            this.removeOneSection(sectionId);
        }
        this.clearCurrentSectionSelection();   
    }

    clearCurrentSectionSelection = () => {
        this.setState({
            currentlySelectedSections: []
        });
    }

    handleCopying = () => {
        const copiedSections = createCopiedSectionsDataStructure({
            currentSelectionState: this.state.currentlySelectedSections,
            allSections: this.props.sections,
            allChannels: this.props.channels
        });
        this.setState({
            currentlyCopiedSections: copiedSections
        }); 
    }

    handlePasting = () => {
        const currentBar = getWholeBarsFromString(Tone.Transport.position);
        const { sectionObjects, lowestIndex } = this.state.currentlyCopiedSections;
        // work out the index of the currently selected channel, or if there is no such channel, just use 
        // index 0.
        let currentChannelIndex;
        if (this.state.currentlySelectedChannel) {
            currentChannelIndex = this.props.channels.findIndex(channel => {
                return channel.id === this.state.currentlySelectedChannel;
            });
        } else {
            currentChannelIndex = 0;
        }
        // find the earliest start time.
        const earliestStartTime = findEarliestStartTime(sectionObjects);
        // loop over the section objects and for each create a new section object to paste, adjusted
        // as necessary, and then dispatch the action to add that section.
        for (let section of sectionObjects) {
            const startDiff = getWholeBarsFromString(section.start) - getWholeBarsFromString(earliestStartTime);
            const adjustedStartString = `${currentBar+startDiff}:0:0`;
            // work out the adjusted index for the channel that this section will be pasted to and grab
            // that channels id.
            const adjustedIndex = section.channelIndex - lowestIndex + currentChannelIndex;
            console.log(section.channelIndex, lowestIndex, currentChannelIndex);
            const channelId = this.props.channels[adjustedIndex].id;
            const notesArray = section.notes.map(note => {
                return {
                    ...note,
                    _id: generateId()
                }
            });
            const newSectionObject = {
                id: generateId(),
                channelId: channelId,
                notes: notesArray,
                start: adjustedStartString,
                numberOfBars: section.numberOfBars
            };
            this.props.addSection(
                newSectionObject, 
                newSectionObject.id,
                newSectionObject.channelId
            )
        }

        //index from the copied section  -  smallest index from copy operation  +  index of active track when pasting
    }



    render() {
        const gridLinesArray = this._createGridLinesArray();
        const sectionRectsArray = this._createSectionRectsArray();

        return <Composer 
            stageRef={this.stageRef}
            gridLayerRef={this.gridLayerRef}
            sectionsLayerRef={this.sectionsLayerRef}
            transportLayerRef={this.transportLayerRef}
            seekerLayerRef={this.seekerLayerRef}
            seekerLineRef={this.seekerLineRef}
            canvasWidth={this.canvasWidth}
            canvasHeight={this.canvasHeight}
            stageWidth={this.stageWidth}
            stageHeight={this.stageHeight}
            scrollPadding={this.scrollPadding}
            gridLinesArray={gridLinesArray}
            sectionRectsArray={sectionRectsArray}
            cursorValue={this.state.pencilActive ? 'pencil' : 'pointer'}
            durationValue={this.state.sectionDuration}
            handleKeyDown={this.handleKeyDown}
            updateCursorValue={this.updateCursorValue}
            updateDurationValue={this.updateSectionDurationValue}
            handleStageClick={this.handleStageClick}
            handleStageMouseDown={this.handleStageMouseDown}
            handleStageMouseUp={this.handleStageMouseUp}
            handleSectionClick={this.handleSectionClick}
            handleSectionDoubleClick={this.handleSectionDoubleClick}
            verticalDragMove={this.verticalDragMove}
            horizontalDragMove={this.horizontalDragMove}
            trackInfoMenuTopScroll={this.state.trackInfoMenuTopScroll}
            channels={this.props.channels}
            currentlySelectedSections={this.state.currentlySelectedSections}
            currentlySelectedChannel={this.state.currentlySelectedChannel}
            updateSelectedChannel={this.updateSelectedChannel}
        />

        
        // return (
        //     <div 
        //         className="composer__container"
        //         tabIndex="0"
        //         onKeyDown={this.handleKeyDown}
        //         style={{outline: 'none'}}
        //     >
        //         <div className="composer__controls-container">
        //             <CursorSelect 
        //                 value={this.state.pencilActive ? 'pencil' : 'pointer'}
        //                 handleChange={this.updateCursorValue.bind(this)}
        //             />
        //             <SectionDurationSelect 
        //                 value={this.state.sectionDuration}
        //                 handleChange={this.updateSectionDurationValue}
        //             />
        //             <button 
        //                 className="composer__delete-section-button"
        //                 onClick={this.removeSelectedSection}
        //             >Delete Selected Section</button>
        //         </div>
        //         <div className="composer__row">
        //             <div className="composer__track-info-container-outer">
        //                 <AddTrackMenu />
        //                 <div className="composer__track-info-scroll-outer">
        //                     <div 
        //                         className="composer__track-info-scroll-inner"
        //                         style={{top: this.state.trackInfoMenuTopScroll}}
        //                     >
        //                         {
        //                             this.props.channels.map((channel, index) => (
        //                                 <TrackInfo 
        //                                     trackId={channel.id}
        //                                     key={channel.id} 
        //                                 /> 
        //                             ))
        //                         }
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="composer__canvas-container" id="composer-canvas-container">
        //                 <Stage
        //                     container={'composer-canvas-container'}
        //                     onClick={this.handleStageClick}
        //                     onMouseDown={this.handleStageMouseDown}
        //                     onMouseUp={this.handleStageMouseUp}
        //                     ref={this.stageRef}
        //                     width={740} 
        //                     height={300} 
        //                 >
        //                     <Layer ref={this.gridLayerRef}>
        //                         <Rect 
        //                             x={0}
        //                             y={0}
        //                             width={this.canvasWidth}
        //                             height={this.canvasHeight}
        //                             fill={'#201826'}
        //                         />
        //                         {
        //                             gridLines.map((linePoints, index) => (
        //                                 <Line
        //                                     points={linePoints}
        //                                     listening={false}
        //                                     stroke={'#47426c'}
        //                                     strokeWidth={2}
        //                                     shadowColor={'#47426c'}
        //                                     shadowBlur={4}
        //                                     shadowOffsetX={0}
        //                                     shadowOffsetY={0}
        //                                     key={index}
        //                                 />
        //                             ))
        //                         }
        //                     </Layer>
        //                     <Layer ref={this.sectionsLayerRef}>
        //                         {
        //                             sectionRectsArray.map((section, index) => (
        //                                 <Rect 
        //                                     x={section.x}
        //                                     y={section.y}
        //                                     sectionId={section.sectionId}
        //                                     height={section.height}
        //                                     width={section.width}
        //                                     fill={
        //                                         section.sectionId === this.state.currentlySelectedSection ? 
        //                                         '#222222' :
        //                                         section.color
        //                                     }
        //                                     stroke={UIColors.offWhite}
        //                                     strokeWidth={2}
        //                                     type={'section'}
        //                                     key={index}
        //                                     onClick={(e) => this.handleSectionClick(e, section.sectionId)}
        //                                     onDblClick={(e) => this.handleSectionDoubleClick(e, section.sectionId)}
        //                                 />
        //                             ))
        //                         } 
        //                     </Layer>
        //                     <Layer ref={this.transportLayerRef}>
        //                         <Rect 
        //                             x={0}
        //                             y={0}
        //                             width={this.canvasWidth}
        //                             height={40}
        //                             fill={'#201826'}
        //                         />
        //                         {
        //                             new Array(200).fill(0).map((el, index) => (
        //                                 <Text 
        //                                     text={`${index+1}`}
        //                                     x={(index+1) * 48}
        //                                     y={20}
        //                                     key={index}
        //                                     fill={'#e0e0e0'}
        //                                     shadowColor={'#e0e0e0'}
        //                                     shadowBlur={4}
        //                                     shadowOffsetX={0}
        //                                     shadowOffsetY={0}
        //                                 />
        //                             ))
        //                         }
        //                     </Layer>
        //                     <Layer ref={this.seekerLayerRef}>
        //                         <Line
        //                             ref={this.seekerLineRef}
        //                             points={[0, 0, 0, this.canvasHeight]}
        //                             listening={false}
        //                             stroke={'#e0e0e0'}
        //                             strokeWidth={2}
        //                         />
        //                     </Layer>
        //                     <Layer>
        //                         <Rect 
        //                             x={716}
        //                             y={0}
        //                             width={24}
        //                             height={300}
        //                             fill={'#47426c'}
        //                             shadowColor={'#47426c'}
        //                             shadowBlur={4}
        //                             shadowOffsetX={0}
        //                             shadowOffsetY={0}
        //                         />
        //                         <Rect 
        //                             x={721}
        //                             y={10}
        //                             width={14}
        //                             height={100}
        //                             fill={'#d86597'}
        //                             draggable={true}
        //                             dragBoundFunc={(pos) => {
        //                                 const currY = pos.y;
        //                                 // total stage height minus height of horizontal scroll bar
        //                                 // minus height of scroll slider
        //                                 const highBound = this.stageHeight - 24 - 100;
        //                                 pos.y = Math.min(Math.max(this.scrollPadding, currY), highBound);
        //                                 pos.x = 721;
        //                                 return pos;
        //                             }}
        //                             onDragMove={this.verticalDragMove}
        //                         />
        //                         <Rect 
        //                             x={0}
        //                             y={276}
        //                             width={740}
        //                             height={24}
        //                             fill={'#47426c'}
        //                             shadowColor={'#47426c'}
        //                             shadowBlur={4}
        //                             shadowOffsetX={0}
        //                             shadowOffsetY={0}
        //                         />
        //                         <Rect 
        //                             x={10}
        //                             y={281}
        //                             width={100}
        //                             height={14}
        //                             fill={'#d86597'}
        //                             draggable={true}
        //                             dragBoundFunc={(pos) => {
        //                                 const currX = pos.x;
        //                                 const highBound = this.stageWidth - 24 - 100;
        //                                 pos.x = Math.min(Math.max(currX, this.scrollPadding), highBound);
        //                                 pos.y = 281;
        //                                 return pos;
        //                             }}
        //                             onDragMove={this.horizontalDragMove}
        //                         />
        //                     </Layer>
        //                 </Stage>
        //             </div>
        //         </div>
        //     </div>
        // );
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
    sections: state.sections,
    isPlaying: state.playerInfo.isPlaying
});

export default connect(
    mapStateToProps,
    {
        addChannel: ActionCreators.addChannel,
        removeChannel: ActionCreators.removeChannel,
        addSection: ActionCreators.addSection,
        removeSection: ActionCreators.removeSection,
        openWindow: ActionCreators.openWindow
    }
)(ComposerContainer);