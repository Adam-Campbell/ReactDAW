import React, { Component } from 'react';
import Konva from 'konva';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Tone from 'tone';
import { throttle } from 'lodash';
import PianoRoll from './PianoRoll';
import { toolTypes, snapSettings, noteDurationSettings } from '../../constants';
import {
    createSelectedAndUnselectedNoteArrays,
    getTransportLineAttrs,
    createGridLinesArray,
    isValidNote,
    calculateNoteInfo,
    createTransportBarNumbersArray,
    swapSelectedNoteIds,
    shiftPitchUp,
    shiftPitchDown,
    shiftTimeBackwards,
    shiftTimeForwards,
    getNoteIdsForSelectionRange,
    getNoteDurationFromPencilOperation,
    generateNoteObjectForPasting,
    getSortedNoteDataStructs,
    getFirstAvailablePitchInChord,
} from './PianoRollUtils';

import { 
    findOverlapAlongAxis,
    addOrRemoveElementFromSelection,
    getWholeBarsFromString,
    transportPositionStringToSixteenths, 
    adjustForScroll,
    generateId,
    createPitchesArray,
    adjustForTranslate
} from '../../sharedUtils';

/*
Keyboard shortcuts:

When using the pointer tool, hold shift on a drag to select multiple notes.

Hold ctrl whilst clicking on a note to add it to / remove it from the current selection without
scrapping the entire selection. 

When one or more notes are selected, the up and down arrows will move every note in the selection up or 
down by one semitone. The left and right arrows will move every note to the left or right by an amount
equal to the current quantize setting. 

Holding alt and then pressing the up and down arrows whilst a chord is selected will cycle upwards or downwards
through the different inversions / voicings for that chord. 

Pressing ctrl + c when one or more notes are selected will copy the selection. Pressing ctrl + v once you have
a selection copied will paste that selection. The paste will begin at the current transport position. 

*/


export class PianoRollContainer extends Component {
    constructor(props) {
        super(props);

        // these values are fixed, and are merely being aliased here so that when they are used later
        // it is clear what the numbers refer to.
        this.padding = 10;
        this.pianoKeysWidth = 48;
        this.canvasWidth = this.props.section.numberOfBars * 384;
        this.canvasGridHeight = 1728;
        this.canvasHeight = 1768;

        // refs are required for various canvas elements in order to interact directly with 
        // the Konva API
        this.outerContainerRef = React.createRef();
        this.stageRef = React.createRef();
        this.gridLayerRef = React.createRef();
        this.noteLayerRef = React.createRef();
        this.pianoKeyLayerRef = React.createRef();
        this.transportLayerRef = React.createRef();
        this.seekerLayerRef = React.createRef();
        this.seekerLineRef = React.createRef();
        this.velocityLayerRef = React.createRef();

        // If/when requestAnimationFrame is utilised by the component, the reference to the most recent
        // request will always be stored in this property to allow easy cancellation if needed.
        this.rAFRef = null;

        // array of scientific pitch notation strings ('C5', F#7 etc) for the range of pitches available.
        this._pitchesArray = createPitchesArray();
        // array that is mapped over to render the numbers in the transport bar
        this._transportBarNumbersArray = createTransportBarNumbersArray({
            sectionStart: this.props.section.start,
            sectionBars: this.props.section.numberOfBars
        });

        this.state = {
            mouseDownPosX: 0,
            mouseDownPosY: 0,
            pencilActive: false,
            stageWidth: 800,
            stageHeight: 600,
            scrollBarActive: false,
            currentlySelectedNotes: [],
            currentlyCopiedNotes: null
        };
    }

    componentDidMount() {
        const initialLineAttrs = getTransportLineAttrs({
            sectionStart: this.props.section.start,
            sectionBars: this.props.section.numberOfBars,
            currentTransportPosition: Tone.Transport.position
        });
        if (this.seekerLineRef.current) {
            this.seekerLineRef.current.x(initialLineAttrs.xPos);
            this.seekerLineRef.current.strokeWidth(initialLineAttrs.strokeWidth);
        }
        if (this.seekerLayerRef.current) {
            this.seekerLayerRef.current.batchDraw();
        }
        if (this.outerContainerRef.current) {
            this.outerContainerRef.current.focus();
        }
    }

    componentWillUnmount() {
        if (this.rAFRef) {
            cancelAnimationFrame(this.rAFRef);
        }
        if (this.stageRef.current) {
            this.stageRef.current.content = null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isPlaying !== this.props.isPlaying || 
            prevProps.isPaused !== this.props.isPaused
        ) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.repaintSeekerLayer);
            } else if (this.props.isPaused) {
                cancelAnimationFrame(this.rAFRef);
            } else {
                cancelAnimationFrame(this.rAFRef);
                this.seekerLineRef.current.strokeWidth(0);
                this.seekerLineRef.current.x(-96);
                this.seekerLayerRef.current.batchDraw();
            }
        }
    }

    /**
     * The main function responsible for updating the seeker line, called in each animation frame, gets
     * the new location for the seeker line and redraws the seeker layer of the canvas. 
     */
    repaintSeekerLayer = () => {
        const newLineAttrs = getTransportLineAttrs({
            sectionStart: this.props.section.start,
            sectionBars: this.props.section.numberOfBars,
            currentTransportPosition: Tone.Transport.position
        });        
        this.seekerLineRef.current.x(newLineAttrs.xPos);
        this.seekerLineRef.current.strokeWidth(newLineAttrs.strokeWidth);
        this.seekerLayerRef.current.batchDraw();
        this.rAFRef = requestAnimationFrame(this.repaintSeekerLayer);
    }

    /**
     * The main function for handling click events on the canvas, delegating to other functions as needed.
     * @param {object} e - the event object supplied by the browser 
     */
    handleStageClick = (e) => {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        // grab the raw x and y position of the click event
        const rawXPos = e.evt.layerX;
        const rawYPos = e.evt.layerY;
        const { 
            xPosWithTranslate,
            yPosWithTranslate
        } = adjustForTranslate({ 
            xPos: rawXPos, 
            yPos: rawYPos, 
            translateString: this.props.containerRef.current.style.transform 
        });
        const xPosWithScrollAndTranslate = adjustForScroll({ raw: xPosWithTranslate, scroll: this.gridLayerRef.current.attrs.x });
        const yPosWithScrollAndTranslate = adjustForScroll({ raw: yPosWithTranslate, scroll: this.gridLayerRef.current.attrs.y });

        if (this.props.toolType === toolTypes.cursor) {
            const noteObject = calculateNoteInfo({
                x: xPosWithScrollAndTranslate, 
                y: yPosWithScrollAndTranslate,
                pitchesArray: this._pitchesArray,
                currentQuantizeValue: this.props.snap,
                noteDuration: Tone.Time(this.props.noteDuration).toBarsBeatsSixteenths()
            });
            const noteIsValid = isValidNote({
                noteToCheck: noteObject, 
                allSectionNotes: this.props.section.notes
            });
            if (noteIsValid) {
                this.props.addNote(this.props.section.id, noteObject);
            }
        }
    }

    /**
     * The main function for handling mouseDown events on the canvas, delegating to other functions as needed.
     * @param {object} e - the event object supplied by the browser
     */
    handleMouseDown = (e) => {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }

        if (this.props.toolType === toolTypes.cursor) {
            return;
        }
        // As long as the mouse down event occurred on the main part of the canvas, update mouseDownPosX and
        // mouseDownPosY with values derived from the event. If the event occurred on the transport section
        // of the canvas, null out the values in state. 
        if (e.evt.layerY >= 40) {
            const {
                xPosWithTranslate,
                yPosWithTranslate
            } = adjustForTranslate({
                xPos: e.evt.layerX,
                yPos: e.evt.layerY,
                translateString: this.props.containerRef.current.style.transform
            });
            this.setState({
                mouseDownPosX: adjustForScroll({ raw: xPosWithTranslate, scroll: this.gridLayerRef.current.attrs.x }),
                mouseDownPosY: adjustForScroll({ raw: yPosWithTranslate, scroll: this.gridLayerRef.current.attrs.y })
            });
        } else {
            this.setState({
                mouseDownPosX: null,
                mouseDownPosY: null
            });
        }
    }

    /**
     * The main function for handling mouseUp events on the canvas, delegating to other functions as needed.
     * @param {object} e - the event object supplied by the browser.  
     */
    handleMouseUp = (e) => {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }

        if (this.props.toolType === toolTypes.pencil) {
            this.handlePencilToolNoteCreation(e);
        } else if (this.props.toolType === toolTypes.selection) {
            this.handlePointerToolMultiSelect(e);
        }
    }

    /**
     * The main function for handling keyDown events on this component, delegates to other functions
     * as necessary.
     * @param {object} e - the event object
     */
    handleKeyDown = e => {

        // handle deletion
        if (e.key === 'Delete') {
            e.stopPropagation();
            this.handleDeletion();
        }
        // handle copying
        if (e.key === 'c' && e.ctrlKey === true) {
            e.stopPropagation();
            this.handleCopying();
        }

        // handle pasting
        if (e.key === 'v' && e.ctrlKey === true) {
            e.stopPropagation();
            this.handlePasting();
        }

        // handle selection mutation
        if (e.key === 'ArrowUp') {
            e.stopPropagation();
            if (this.state.currentlySelectedNotes.length) {
                if (e.altKey) {
                    this.stepUpThroughInversions();
                } else {
                    this.mutateSelection(this.state.currentlySelectedNotes, 'shiftPitchUp');
                }
            }
        }

        if (e.key === 'ArrowDown') {
            e.stopPropagation();
            if (this.state.currentlySelectedNotes.length) {
                if (e.altKey) {
                    this.stepDownThroughInversions();
                } else {
                    this.mutateSelection(this.state.currentlySelectedNotes, 'shiftPitchDown');
                }
            }
        }

        if (e.key === 'ArrowLeft') {
            e.stopPropagation();
            if (this.state.currentlySelectedNotes.length) {
                this.mutateSelection(this.state.currentlySelectedNotes, 'shiftTimeBackwards');
            }
        }

        if (e.key === 'ArrowRight') {
            e.stopPropagation();
            if (this.state.currentlySelectedNotes.length) {
                this.mutateSelection(this.state.currentlySelectedNotes, 'shiftTimeForwards');
            }
        }

        // handle clearing selection
        if (e.key === 'd' && e.ctrlKey) {
            e.stopPropagation();
            e.preventDefault();
            this.clearCurrentSelection();
        }


    }

    /**
     * Contains the logic for creating a new note using the pencil tool.
     * @param {object} e - the event object
     */
    handlePencilToolNoteCreation = (e) => {
        const targetIsNote = e.target.attrs.type && e.target.attrs.type === 'noteRect';
        const {
            mouseDownPosX,
            mouseDownPosY
        } = this.state;

        // Return early if the target of the mouseUp event was a note rect, or if the preceeding mouseDown
        // event occurred on an illegal part of the canvas, which will be indicated by a null value for 
        // mouseDownPosY
        if (mouseDownPosY === null || targetIsNote) {
            return;
        }
        const {
            xPosWithTranslate
        } = adjustForTranslate({
            xPos: e.evt.layerX,
            yPos: e.evt.layerY,
            translateString: this.props.containerRef.current.style.transform
        });
        const adjustedMouseUpPosX = adjustForScroll({ 
            raw: xPosWithTranslate, 
            scroll: this.gridLayerRef.current.attrs.x 
        });
        const noteDuration = getNoteDurationFromPencilOperation({
            downX: mouseDownPosX,
            upX: adjustedMouseUpPosX,
            currentQuantizeValue: this.props.snap
        });
        const noteObject = calculateNoteInfo({
            x: mouseDownPosX,
            y: mouseDownPosY,
            pitchesArray: this._pitchesArray,
            currentQuantizeValue: this.props.snap,
            noteDuration: noteDuration
        });
        const noteIsValid = isValidNote({
            noteToCheck: noteObject,
            allSectionNotes: this.props.section.notes
        });
        if (noteIsValid) {
            this.props.addNote(this.props.section.id, noteObject);
        }
    }

    /**
     * Contains the logic required for selecting multiple notes at once by dragging over them
     * with the pointer tool.
     * @param {object} e - the event object
     */
    handlePointerToolMultiSelect = (e) => {
        // use the x and y coordinates from the mouseDown and mouseUp events to determine the range
        // of rows and columns included in the selection.
        const {
            xPosWithTranslate,
            yPosWithTranslate
        } = adjustForTranslate({
            xPos: e.evt.layerX,
            yPos: e.evt.layerY,
            translateString: this.props.containerRef.current.style.transform
        });
        const selectedNoteIds = getNoteIdsForSelectionRange({
            verticalSelectionBound1: this.state.mouseDownPosY,
            verticalSelectionBound2: adjustForScroll({raw: yPosWithTranslate, scroll: this.gridLayerRef.current.attrs.y}),
            horizontalSelectionBound1: this.state.mouseDownPosX,
            horizontalSelectionBound2: adjustForScroll({raw: xPosWithTranslate, scroll: this.gridLayerRef.current.attrs.x}),
            allNotes: this.props.section.notes
        });

        this.setState({
            currentlySelectedNotes: selectedNoteIds
        });
    }

    /**
     * Updates the components state to enter the scrollbar active state
     */
    enterScrollBarActiveState = () => {
        if (!this.state.scrollBarActive) {
            this.setState({ scrollBarActive: true });
        }
    }

    /**
     * Clears the current selection in state, if there is a selection.
     */
    clearCurrentSelection = () => {
        if (this.state.currentlySelectedNotes.length) {
            this.setState({ currentlySelectedNotes: [] });
        }
    }

    /**
     * Handles the deletion of notes.
     */
    handleDeletion = () => {
        if (this.state.currentlySelectedNotes) {
            this.props.removeNotes(this.props.section.id, this.state.currentlySelectedNotes);
            this.clearCurrentSelection();
        }
    }

    /**
     * Handles the copying of notes
     */
    handleCopying = () => {
        if (this.state.currentlySelectedNotes) {
            const notesToCopy = this.state.currentlySelectedNotes.map(note_id => {
                return this.props.section.notes.find(el => el._id === note_id);
            });
            this.setState({
                currentlyCopiedNotes: notesToCopy
            });
        }
    }

    /**
     * Handles the pasting of notes. Grabs the currently copied notes, and pastes them relative to the current
     * transport position at the time of pasting. Will not paste a note if it falls outside of the current section
     * or if it overlaps with another preexisting note. 
     */
    handlePasting = () => {
        // grab the current transport time
        const currTransportPos = Tone.Ticks(Tone.Transport.position).quantize(this.props.snap);;
        //grab the note to paste
        if (this.state.currentlyCopiedNotes) {
            // first we need to determine what the earliest time value for any of the notes being pasted is, 
            // because all subsequent notes will be pasted at times relative to that value.
            let earliestNoteTime = null;
            for (let note of this.state.currentlyCopiedNotes) {
                const timeToTicks = Tone.Ticks(note.time);
                if (timeToTicks < earliestNoteTime || !earliestNoteTime) {
                    earliestNoteTime = timeToTicks;
                }
            }
            const arrayOfNewNoteObjects = [];
            // now loop through the notes again and actually call the paste operation for each note. 
            for (let note of this.state.currentlyCopiedNotes) {
                //this.pasteOneNote(note, currTransportPos, earliestNoteTime);
                const newNoteObject = generateNoteObjectForPasting({
                    noteToPaste: note,
                    currTransportPos: currTransportPos,
                    earliestNoteTime: earliestNoteTime,
                    allNotes: this.props.section.notes,
                    sectionStart: this.props.section.start,
                    sectionBars: this.props.section.bars 
                });
                if (newNoteObject) {
                    arrayOfNewNoteObjects.push(newNoteObject);
                }
            }
            if (arrayOfNewNoteObjects.length) {
                this.props.addNotes(this.props.section.id, arrayOfNewNoteObjects);
            }
        }
    }

    /**
     * Updates the currentlySelectedNotes property in state.
     * @param {Array} newSelectedNotesArray - the new value for the currentlySelectedNotes array.
     */
    updateCurrentlySelectedNotes = (newSelectedNotesArray) => {
        this.setState({
            currentlySelectedNotes: newSelectedNotesArray
        });
    }

    /**
     * Handles the mutation of selected notes, delegating to other functions as necessary. 
     * @param {array} selectionOfIds - the array of note ids that comprise the current selection
     * @param {string} mutationMethodToUse - string representing the mutation method to be used
     */
    mutateSelection = (selectionOfIds, mutationMethodToUse) => {
        // declare initial variables
        const newNoteIds = [];
        const newNoteObjects = [];
        let mutationMethod;
        // set the mutationMethod to use, derived from the mutationMethodToUse parameter
        switch (mutationMethodToUse) {
            case 'shiftPitchUp':
                mutationMethod = shiftPitchUp(this._pitchesArray);
                break;

            case 'shiftPitchDown':
                mutationMethod = shiftPitchDown(this._pitchesArray);
                break;

            case 'shiftTimeBackwards':
                mutationMethod = shiftTimeBackwards({
                    currentQuantizeAsTicks: Tone.Ticks(this.props.snap),
                    sectionStartAsTicks: Tone.Ticks(this.props.section.start)
                });
                break;

            case 'shiftTimeForwards':
                mutationMethod = shiftTimeForwards({
                    currentQuantizeAsTicks: Tone.Ticks(this.props.snap),
                    sectionEndAsTicks: Tone.Ticks(this.props.section.start) + (768 * this.props.section.numberOfBars)
                });
                break;

            default:
                mutationMethod = shiftPitchUp;
        }
        // create an array of the actual note objects
        const noteObjects = selectionOfIds.map(noteId => {
            return this.props.section.notes.find(note => note._id === noteId)
        });
        // loop over the noteObjects and perform the selected mutation to them
        for (let noteObject of noteObjects) {
            const newNoteObject = mutationMethod(noteObject);
            newNoteObjects.push(newNoteObject);
            newNoteIds.push(newNoteObject._id);
        }
        this.props.removeNotes(this.props.section.id, selectionOfIds);
        this.props.addNotes(this.props.section.id, newNoteObjects);
        this.setState({
            currentlySelectedNotes: newNoteIds
        });
    }

    /**
     * Takes the currently selected notes, which should form a chord, and cycles upwards through the 
     * inversions of that chord, replacing the previous notes with the new inversion.
     */
    stepUpThroughInversions = () => {
        // transform our array of note ids into an array of data structures containing the full note
        // object, as well as the pitchIndex (the index at which that pitch can be found in this._pitchesArray),
        // sorted from lowest pitch to highest. Note, that the lowest pitch is actually the highest index in
        // this._pitchesArray, since it stores the pitches in descending order. 
        const orderedSelection = getSortedNoteDataStructs({
            currentlySelectedNotes: this.state.currentlySelectedNotes,
            allNotes: this.props.section.notes,
            pitchesArray: this._pitchesArray,
            shouldSortPitchesAscending: true
        });
        const noteToChange = orderedSelection[0];
        const newPitchIndex = getFirstAvailablePitchInChord({
            orderedSelection,
            shouldTraversePitchesAscending: true,
            pitchesArrayLength: this._pitchesArray.length
        });
        if (newPitchIndex) {
            const newNoteObject = {
                ...noteToChange.noteObject,
                pitch: this._pitchesArray[newPitchIndex],
                y: newPitchIndex * 16,
                _id: generateId()
            };
            this.props.removeNote(this.props.section.id, noteToChange.noteObject._id);
            this.props.addNote(this.props.section.id, newNoteObject);
            this.setState({
                currentlySelectedNotes: swapSelectedNoteIds({
                    selectedNotesState: this.state.currentlySelectedNotes,
                    newNoteIds: [newNoteObject._id],
                    oldNoteIds: [noteToChange.noteObject._id]
                })
            });
        }
    }

    /**
     * Takes the currently selected notes, which should form a chord, and cycles downwards through the 
     * inversions of that chord, replacing the previous notes with the new inversion.
     */
    stepDownThroughInversions = () => {
        // transform our array of note ids into an array of data structures containing the full note
        // object, as well as the pitchIndex (the index at which that pitch can be found in this._pitchesArray),
        // sorted from lowest pitch to highest. Note, that the lowest pitch is actually the highest index in
        // this._pitchesArray, since it stores the pitches in descending order. 
        const orderedSelection = getSortedNoteDataStructs({
            currentlySelectedNotes: this.state.currentlySelectedNotes,
            allNotes: this.props.section.notes,
            pitchesArray: this._pitchesArray,
            shouldSortPitchesAscending: false
        });
        const noteToChange = orderedSelection[0];
        const newPitchIndex = getFirstAvailablePitchInChord({
            orderedSelection,
            shouldTraversePitchesAscending: false,
            pitchesArrayLength: this._pitchesArray.length
        });
        if (newPitchIndex) {
            const newNoteObject = {
                ...noteToChange.noteObject,
                pitch: this._pitchesArray[newPitchIndex],
                y: newPitchIndex * 16,
                _id: generateId()
            };
            this.props.removeNote(this.props.section.id, noteToChange.noteObject._id);
            this.props.addNote(this.props.section.id, newNoteObject);
            this.setState({
                currentlySelectedNotes: swapSelectedNoteIds({
                    selectedNotesState: this.state.currentlySelectedNotes,
                    newNoteIds: [newNoteObject._id],
                    oldNoteIds: [noteToChange.noteObject._id]
                })
            });
        }
    }

    render() {

        if (!this.props.section) {
            return null;
        }

        const gridLinesArray = createGridLinesArray({
            sectionBars: this.props.section.numberOfBars,
            canvasWidth: this.canvasWidth,
            canvasGridHeight: this.canvasGridHeight,
            currentQuantizeValue: this.props.snap
        });
        const { selectedNotes, unselectedNotes } = createSelectedAndUnselectedNoteArrays({
            currentlySelectedNotes: this.state.currentlySelectedNotes,
            allSectionNotes: this.props.section.notes
        });

        return <PianoRoll 
            handleKeyDown={this.handleKeyDown}
            handleKeyUp={this.handleKeyUp}
            outerContainerRef={this.outerContainerRef}
            stageRef={this.stageRef}
            handleStageClick={this.handleStageClick}
            handleMouseDown={this.handleMouseDown}
            handleMouseUp={this.handleMouseUp}
            gridLayerRef={this.gridLayerRef}
            canvasWidth={this.canvasWidth}
            canvasHeight={this.canvasHeight}
            gridLinesArray={gridLinesArray}
            noteLayerRef={this.noteLayerRef}
            section={this.props.section}
            currentlySelectedNotes={this.state.currentlySelectedNotes}
            stageHeight={this.state.stageHeight}
            stageWidth={this.state.stageWidth}
            velocityLayerRef={this.velocityLayerRef}
            selectedNotes={selectedNotes}
            unselectedNotes={unselectedNotes}
            pianoKeyLayerRef={this.pianoKeyLayerRef}
            pitchesArray={this._pitchesArray}
            transportLayerRef={this.transportLayerRef}
            transportBarNumbersArray={this._transportBarNumbersArray}
            seekerLayerRef={this.seekerLayerRef}
            seekerLineRef={this.seekerLineRef}
            padding={this.padding}
            selectionToolActive={this.props.toolType === toolTypes.selection}
            containerRef={this.props.containerRef}
            snap={this.props.snap}
            enterScrollBarActiveState={this.enterScrollBarActiveState}
            addNotes={this.props.addNotes}
            removeNotes={this.props.removeNotes}
            updateCurrentlySelectedNotes={this.updateCurrentlySelectedNotes}
        />
    }

}




const mapStateToProps = (state, ownProps) => ({
    sections: state.main.present.sections,
    section: state.main.present.sections[ownProps.id],
    isPlaying: state.playerStatus.isPlaying,
    isPaused: state.playerStatus.isPaused,
    toolType: state.settings.toolType,
    snap: state.settings.snap,
    noteDuration: state.settings.noteDuration
});


export default connect(
    mapStateToProps,
    {
        addNote: ActionCreators.addNote,
        removeNote: ActionCreators.removeNote,
        addNotes: ActionCreators.addNotes,
        removeNotes: ActionCreators.removeNotes,
        closeWindow: ActionCreators.closeWindow
    }
)(PianoRollContainer);
