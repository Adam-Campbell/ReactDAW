import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { throttle } from 'lodash';
import { generateId } from '../../helpers';
import Tone from 'tone';
import Composer from './Composer';
import { 
    createCopiedSectionsDataStructure,
    findEarliestStartTime,
    createGridLinesArray,
    createSectionRectsArray,
    createSectionObject
} from './ComposerUtils';

import { 
    findOverlapAlongAxis,
    addOrRemoveElementFromSelection,
    getWholeBarsFromString,
    adjustForScroll,
    transportPositionStringToSixteenths
} from '../../sharedUtils';

class ComposerContainer extends Component {

    constructor(props) {
        super(props);
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
            scrollBarActive: false,
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
                requestAnimationFrame(this.repaintSeekerLayer);
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

    /**
     * Works out the next x position for the seeker line according to the current transport position, 
     * then updates the seeker line with that x position and repaints the seeker layer. 
     */
    repaintSeekerLayer = () => {
        const newXPos = transportPositionStringToSixteenths(Tone.Transport.position) * 3;        
        this.seekerLineRef.current.x(newXPos);
        this.seekerLayerRef.current.batchDraw();
        this.rAFRef = requestAnimationFrame(this.repaintSeekerLayer);
    }

    /**
     * Handles vertical scrolling of the composer component, updating both the canvas and the track info
     * elements.
     * @param {object} e - the event object
     */
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
        this.stageRef.current.batchDraw();
    }

    /**
     * Handles horizontal scrolling of the canvas of the composer component. 
     * @param {object} e - the event object
     */
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
        this.stageRef.current.batchDraw();
    }

    /**
     * Handles click and mouseDown events on the scrollbars - updating state to signify that a scrollbar is
     * active, and preventing event bubbling so that none of the event listeners on the layers underneath 
     * get triggered. 
     * @param {object} e - the event object
     */
    handleScrollBarClickEvents = (e) => {
        e.cancelBubble = true;
        if (!this.state.scrollBarActive) {
            this.setState({ scrollBarActive: true });
        }
    }

    /**
     * Handles click events on the stage which have not been caught by event listeners on any of the layers above. 
     * Delegates to other functions as necessary. 
     * @param {object} e - the event object.
     */
    handleStageClick = (e) => {
        // if scroll bar is active, make it inactive and return
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        // if shift key is currently pressed, return.
        if (e.evt.shiftKey) {
            return;
        }
        // grab x and y positions for click
        const rawXPos = e.evt.layerX;
        const rawYPos = e.evt.layerY;
        // adjust for scroll
        const xPosWithScroll = adjustForScroll({ raw: rawXPos, scroll: this.gridLayerRef.current.attrs.x });
        const yPosWithScroll = adjustForScroll({ raw: rawYPos, scroll: this.gridLayerRef.current.attrs.y });
        // if yPos < 40 then we have clicked on the transport section of the canvas
        if (rawYPos < 40) {
            this.handleTransportClick(xPosWithScroll);
            return;
        }
        // if pencil is active then we don't want to do anything in the click event, everything is
        // handled by mouseDown and mouseUp events. 
        if (!this.state.pencilActive) {
            const newSectionObject = createSectionObject({
                x: xPosWithScroll,
                y: yPosWithScroll,
                allChannels: this.props.channels,
                numberOfBars: this.state.sectionDuration
            });
            if (newSectionObject) {
                this.props.addSection(
                    newSectionObject,
                    newSectionObject.id,
                    newSectionObject.channelId
                );
            }
        }

    }

    /**
     * Handles mouseDown events on the stage which have not been caught by event listeners on any of the layers
     * above. Delegates to other functions as necessary. 
     * @param {object} e - the event object
     */
    handleStageMouseDown = (e) => {
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        // As long as the mouse down event occurred on the main part of the canvas, update mouseDownPosX and
        // mouseDownPosY with values derived from the event. If the event occurred on the transport section
        // of the canvas, null out the values in state. 
        if (e.evt.layerY >= 40) {
            this.setState({
                mouseDownPosX: adjustForScroll({ raw: e.evt.layerX, scroll: this.gridLayerRef.current.attrs.x }),
                mouseDownPosY: adjustForScroll({ raw: e.evt.layerY, scroll: this.gridLayerRef.current.attrs.y})
            });
        } else {
            this.setState({
                mouseDownPosX: null,
                mouseDownPosY: null
            });
        }
    }

    /**
     * Handles mouseUp events on the stage which have not been caught by event listeners on any of the layers
     * above. Delegates to other functions as necessary. 
     * @param {object} e - the event object
     */
    handleStageMouseUp = (e) => {
        // If scrollBar is active, just make it inactive and return
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        const rawYPos = e.evt.layerY;
        // if rawYPos is less than 40, then we have clicked on the transport section of the canvas, and this is
        // dealt with elsewhere.
        if (rawYPos < 40) { 
            return; 
        }

        const mouseUpPosX = adjustForScroll({ raw: e.evt.layerX, scroll: this.gridLayerRef.current.attrs.x });
        const mouseUpPosY = adjustForScroll({ raw: e.evt.layerY, scroll: this.gridLayerRef.current.attrs.y });
        const targetIsSection = e.target.attrs.type && e.target.attrs.type === 'section';
        // delegate to handlePencilToolNoteCreation() if the pencil tool is active, the target of the mouseUp
        // event is not a section rectangle, and if the preceeding mouseDown event occurred within a 'legal' 
        // part of the canvas (if it didn't then mouseDownPosY will be null).
        if (this.state.pencilActive && !targetIsSection && this.state.mouseDownPosY !== null) {
            this.handlePencilNoteCreation(mouseUpPosX);
            return;
        }
        // if the pointer tool is active and the shift key is currently held down, then delegate to
        // handlePointerToolMultiSelect().
        if (!this.state.pencilActive && e.evt.shiftKey) {
            this.handlePointerToolMultiSelect({
                verticalSelectionBound1: this.state.mouseDownPosY,
                verticalSelectionBound2: mouseUpPosY,
                horizontalSelectionBound1: this.state.mouseDownPosX,
                horizontalSelectionBound2: mouseUpPosX
            });
        }
    }

    /**
     * Handles the creation of a note via the pencil tool
     * @param {number} mouseUpPosX - the x coordinate for the mouseUp event being used to construct the new
     * section. It should already be adjusted for any scrolling that has occurred on the canvas before it is
     * passed to this function. 
     */
    handlePencilNoteCreation = (mouseUpPosX) => {
        const { mouseDownPosX, mouseDownPosY } = this.state;
        const sectionStartAsNumber = Math.floor(mouseDownPosX / 48);
        const sectionEndAsNumber = Math.round(mouseUpPosX / 48);
        const sectionLengthInBars = sectionEndAsNumber - sectionStartAsNumber > 1 ?
                                    sectionEndAsNumber - sectionStartAsNumber : 1;

        const newSectionObject = createSectionObject({
            x: mouseDownPosX,
            y: mouseDownPosY,
            allChannels: this.props.channels,
            numberOfBars: sectionLengthInBars
        });
        if (newSectionObject) {
            this.props.addSection(
                newSectionObject,
                newSectionObject.id,
                newSectionObject.channelId
            );
        }
    }

    /**
     * Handles the creation of a selection range whilst using the pointer tool.
     * @param {number} verticalSelectionBound1 - a vertical bound of the selection
     * @param {number} verticalSelectionBound2 - the other vertical bound of the selection
     * @param {number} horizontalSelectionBound1 - a horizontal bound of the selection
     * @param {number} horizontalSelectionBound2 - the other horizontal bound of the selection
     */
    handlePointerToolMultiSelect = (optionsObject) => {
        const { 
            verticalSelectionBound1, 
            verticalSelectionBound2, 
            horizontalSelectionBound1,
            horizontalSelectionBound2
        } = optionsObject;

        // selectedSectionIds will hold the ids of any sections which meet the necessary criteria once we
        // have examined all of them. 
        let selectedSectionsIds = [];
        // Ascertain which horizontal bound is which, same for the vertical bounds. 
        const selectionLeftBound = Math.min(horizontalSelectionBound1, horizontalSelectionBound2);
        const selectionRightBound = Math.max(horizontalSelectionBound1, horizontalSelectionBound2);
        const selectionTopBound = Math.min(verticalSelectionBound1, verticalSelectionBound2);
        const selectionBottomBound = Math.max(verticalSelectionBound1, verticalSelectionBound2);
        
        // Loop through all of the sections in the app state.
        for (let sectionId in this.props.sections) {
            const section = this.props.sections[sectionId];
            // Now derive sectionLeftBound, sectionRightBound, sectionTopBound, sectionBottomBound.
            const channelIndex = this.props.channels.findIndex(channel => channel.id === section.channelId);
            const sectionTopBound = (channelIndex * 70) + 40;
            const sectionBottomBound = sectionTopBound + 70;
            const sectionLeftBound = getWholeBarsFromString(section.start) * 48;
            const sectionRightBound = sectionLeftBound + (section.numberOfBars * 48);
            // Determine whether there is any horizontal overlap
            const isInHorizontalRange = findOverlapAlongAxis({
                elementALowerBound: selectionLeftBound,
                elementAUpperBound: selectionRightBound,
                elementBLowerBound: sectionLeftBound,
                elementBUpperBound: sectionRightBound
            });
            // Determine whether there is any vertical overlap
            const isInVerticalRange = findOverlapAlongAxis({
                elementALowerBound: selectionTopBound,
                elementAUpperBound: selectionBottomBound,
                elementBLowerBound: sectionTopBound,
                elementBUpperBound: sectionBottomBound
            });
            // If there is both horizontal and vertical overlap, push this sections id onto the 
            // selectedSectionsIds array.
            if (isInHorizontalRange && isInVerticalRange) {
                selectedSectionsIds.push(section.id);
            }
        }
        // Update state with the selectedSectinsIds array, even if it is empty.
        this.setState({
            currentlySelectedSections: selectedSectionsIds
        });
    }

    /**
     * Handle clicks that occur on the transport section of the canvas.
     * @param {number} xPos - the x position of the click event, already adjused for any scrolling. 
     */
    handleTransportClick = (xPos) => {
        const barClicked = `${Math.floor(xPos / 48)}:0:0`;
        Tone.Transport.position = barClicked;
        const newXPos = transportPositionStringToSixteenths(Tone.Transport.position) * 3;        
        this.seekerLineRef.current.x(newXPos);
        this.seekerLayerRef.current.batchDraw();
    }

    /**
     * Handle click events that occur on a section rect within the canvas.
     * @param {object} e - the event object
     * @param {string} sectionId - the id of the section that was clicked
     */
    handleSectionClick = (e, sectionId) => {
        // this is Konvas method for stopping the event from bubbling up to the other canvas elements,
        // we don't want to trigger their event listeners. 
        e.cancelBubble = true;
        // return early if shift key is currently suppressed, to prevent this function from interfering with
        // the multi select logic.
        if (e.evt.shiftKey) {
            return;
        }
        this.setState({
            currentlySelectedSections: addOrRemoveElementFromSelection({
                currentSelectionState: this.state.currentlySelectedSections,
                element: sectionId,
                shouldPreserveSelection: e.evt.ctrlKey
            })
        });
    }

    /**
     * handles doubleClick events that occur on a section rect within the canvas.
     * @param {object} e - the event object. 
     * @param {string} sectionId - the id of the section that was clicked
     */
    handleSectionDoubleClick = (e, sectionId) => {
        // this is Konvas method for stopping the event from bubbling up to the other canvas elements,
        // we don't want to trigger their event listeners. 
        e.cancelBubble = true;
        this.setState({
            currentlySelectedSections: []
        });
        this.props.openWindow(sectionId, 'section');
    }

    /**
     * Updates the pencilActive property in state.
     * @param {object} e - the event object
     */
    updateCursorValue = (e) => {
        this.setState({
            pencilActive: e.target.value === 'pencil'
        });
    }

    /**
     * Updates the sectionDuration property in state.
     * @param {object} e- the event object
     */
    updateSectionDurationValue = (e) => {
        this.setState({
            sectionDuration: parseInt(e.target.value)
        });
    }

    /**
     * Handles keyDown events that take place anywhere in the component, as long as they haven't already been
     * dealt with by another event listener.
     * @param {object} e - the event object
     */
    handleKeyDown = (e) => {
        //console.log('handleKeyDown on the Composer was called');
        //console.log(e);
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

        // handle clearing selection
        if (e.key === 'd' && e.ctrlKey) {
            this.clearCurrentSelection();
        }
    }

    /**
     * Updates the currentlySelectedChannel property in state.
     * @param {string} channelId - the channel id to update to. 
     */
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

    /**
     * Dispatches the action to remove one section, utilised by the handleSectionDeletion method. 
     * @param {string} sectionId - the id of the section to be removed.
     */
    removeOneSection = (sectionId) => {
        const channelId = this.props.sections[sectionId].channelId;
        this.props.removeSection(sectionId, channelId);
    }

    /**
     * Sets the currentlySelectedSections property in state back to an empty state.
     */
    clearCurrentSectionSelection = () => {
        this.setState({
            currentlySelectedSections: []
        });
    }

    /**
     * Handles the copying of the current section selection.
     */
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

    /**
     * Handles the pasting of the section data that was previously copied.
     */
    handlePasting = () => {
        const { sectionObjects, lowestIndex } = this.state.currentlyCopiedSections;
        // return early if nothing has been copied
        if (!sectionObjects.length) {
            return;
        }
        const currentBar = getWholeBarsFromString(Tone.Transport.position);
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
            if (adjustedIndex < this.props.channels.length) {
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
                );
            }
        }

    }

    render() {
        const gridLinesArray = createGridLinesArray({
            canvasHeight: this.canvasHeight,
            canvasWidth: this.canvasWidth,
            channelsArrayLength: this.props.channels.length
        });
        const sectionRectsArray = createSectionRectsArray({
            allChannels: this.props.channels,
            allSections: this.props.sections
        });

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
            handleScrollBarClickEvents={this.handleScrollBarClickEvents}
        />
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