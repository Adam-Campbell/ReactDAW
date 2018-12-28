import React, { Component } from 'react';
import Konva from 'konva';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Tone from 'tone';
import { throttle } from 'lodash';
import PianoRoll from './PianoRoll';
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
    getFirstAvailablePitchInChord
} from './PianoRollUtils';

import { 
    findOverlapAlongAxis,
    addOrRemoveElementFromSelection,
    getWholeBarsFromString,
    transportPositionStringToSixteenths, 
    adjustForScroll,
    generateId,
    createPitchesArray
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
        this.canvasWidth = this.section.numberOfBars * 384;
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
            sectionStart: this.section.start,
            sectionBars: this.section.numberOfBars
        });

        // throttled handlers for handling scrolling
        this.horizontalDragMove = throttle(this._horizontalDragMove, 16).bind(this);
        this.verticalDragMove = throttle(this._verticalDragMove, 16).bind(this);

        this.handleStageClick = this._handleStageClick.bind(this);
        this.handleMouseDown = this._handleMouseDown.bind(this);
        this.handleMouseUp = this._handleMouseUp.bind(this);
        this.state = {
            quantize: '16n',
            duration: '16n',
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
            sectionStart: this.section.start,
            sectionBars: this.section.numberOfBars,
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
        this.stageRef.current.content = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.repaintSeekerLayer);
            } else {
                cancelAnimationFrame(this.rAFRef);
                this.seekerLineRef.current.strokeWidth(0);
                this.seekerLineRef.current.x(-96);
                this.seekerLayerRef.current.batchDraw();
            }
        }
    }

    /**
     * Convenience method for accessing the specific section object corresponding to the sectionId that
     * was passed in as a prop
     * @return {object} - the section object
     */
    get section() {
        return this.props.sections[this.props.id];
    }

    /**
     * The main function responsible for updating the seeker line, called in each animation frame, gets
     * the new location for the seeker line and redraws the seeker layer of the canvas. 
     */
    repaintSeekerLayer = () => {
        const newLineAttrs = getTransportLineAttrs({
            sectionStart: this.section.start,
            sectionBars: this.section.numberOfBars,
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
    _handleStageClick(e) {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        // grab the raw x and y position of the click event
        const rawXPos = e.evt.layerX;
        const rawYPos = e.evt.layerY;
        const xPosWithScroll = adjustForScroll({ raw: rawXPos, scroll: this.gridLayerRef.current.attrs.x });
        const yPosWithScroll = adjustForScroll({ raw: rawYPos, scroll: this.gridLayerRef.current.attrs.y });
        // if rawY is less than 40, then the click has occurred within the transport section of the canvas.
        if (rawYPos < 40) {
            this.handleTransportClick(xPosWithScroll);
            return;
        }
        // if the pencil tool is active, or the shift key is pressed, then there is nothing that needs to be
        // done during a click event so just return early.
        if (this.state.pencilActive || e.evt.shiftKey) {
            return;
        } 

        const noteObject = calculateNoteInfo({
            x: xPosWithScroll, 
            y: yPosWithScroll,
            pitchesArray: this._pitchesArray,
            currentQuantizeValue: this.state.quantize,
            noteDuration: Tone.Time(this.state.duration).toBarsBeatsSixteenths()
        });
        const noteIsValid = isValidNote({
            noteToCheck: noteObject, 
            allSectionNotes: this.section.notes
        });
        if (noteIsValid) {
            this.props.addNote(this.section.id, noteObject);
        }
    }

    /**
     * The main function for handling mouseDown events on the canvas, delegating to other functions as needed.
     * @param {object} e - the event object supplied by the browser
     */
    _handleMouseDown(e) {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        // if a note was clicked on just return, the onClick handler already contains all of the
        // logic for that. 
        if (e.target.attrs.type && e.target.attrs.type === 'noteRect') {
            return;
        }
        // As long as the mouse down event occurred on the main part of the canvas, update mouseDownPosX and
        // mouseDownPosY with values derived from the event. If the event occurred on the transport section
        // of the canvas, null out the values in state. 
        if (e.evt.layerY >= 40) {
            this.setState({
                mouseDownPosX: adjustForScroll({ raw: e.evt.layerX, scroll: this.gridLayerRef.current.attrs.x }),
                mouseDownPosY: adjustForScroll({ raw: e.evt.layerY, scroll: this.gridLayerRef.current.attrs.y })
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
    _handleMouseUp(e) {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }

        if (this.state.pencilActive) {
            this.handlePencilToolNoteCreation(e);
        } else if (e.evt.shiftKey) {
            this.handlePointerToolMultiSelect(e);
        }
    }

    /**
     * The main function for handling keyDown events on this component, delegates to other functions
     * as necessary.
     * @param {object} e - the event object
     */
    handleKeyDown = e => {
        e.preventDefault();
        e.stopPropagation();

        // handle deletion
        if (e.key === 'Delete') {
            this.handleDeletion();
        }
        // handle copying
        if (e.key === 'c' && e.ctrlKey === true) {
            this.handleCopying();
        }

        // handle pasting
        if (e.key === 'v' && e.ctrlKey === true) {
            this.handlePasting();
        }

        // handle selection mutation
        if (e.key === 'ArrowUp') {
            if (this.state.currentlySelectedNotes.length) {
                if (e.altKey) {
                    this.stepUpThroughInversions();
                } else {
                    this.mutateSelection(this.state.currentlySelectedNotes, 'shiftPitchUp');
                }
            }
        }

        if (e.key === 'ArrowDown') {
            if (this.state.currentlySelectedNotes.length) {
                if (e.altKey) {
                    this.stepDownThroughInversions();
                } else {
                    this.mutateSelection(this.state.currentlySelectedNotes, 'shiftPitchDown');
                }
            }
        }

        if (e.key === 'ArrowLeft') {
            if (this.state.currentlySelectedNotes.length) {
                this.mutateSelection(this.state.currentlySelectedNotes, 'shiftTimeBackwards');
            }
        }

        if (e.key === 'ArrowRight') {
            if (this.state.currentlySelectedNotes.length) {
                this.mutateSelection(this.state.currentlySelectedNotes, 'shiftTimeForwards');
            }
        }

        // handle clearing selection
        if (e.key === 'd' && e.ctrlKey) {
            this.clearCurrentSelection();
        }
    }

    /**
     * Handles a click that occurs within the Transport section of the canvas, delegating to other
     * functions as needed. 
     * @param {number} xPos - the x position of the click event that occurred. 
     */
    handleTransportClick = (xPosWithScroll) => {
        // adjust the xPos to snap it to the current quantize value
        const currQuantizeAdjustment = Tone.Time(this.state.quantize).toTicks() / 2;
        const xPosAdjustedForQuantize = xPosWithScroll-(xPosWithScroll%currQuantizeAdjustment);
        // calculate the new transport position based on the section start time and the current progression into
        // the section.
        const sectionStartAsTicks = Tone.Time(this.section.start).toTicks();
        const sectionProgressAsTicks =  xPosAdjustedForQuantize * 2;
        const newTransportPosition = Tone.Ticks(sectionStartAsTicks+sectionProgressAsTicks).toBarsBeatsSixteenths();
        Tone.Transport.position = newTransportPosition;
        // update the canvas element with new xPos and redraw the canvas layer. 
        this.seekerLineRef.current.strokeWidth(2);
        this.seekerLineRef.current.x(xPosAdjustedForQuantize);
        this.seekerLayerRef.current.batchDraw();
    }

    /**
     * Handles the clicking of a note Rect on the canvas, also prevents event bubbling to stop any events
     * on sublayers from firing
     * @param {object} e - the event object
     */
    handleNoteClick = (e) => {
        e.cancelBubble = true;
        const note_id = e.target.attrs._id;
        // Add or remove the clicked note from the current selection, based on whether or not it was already 
        // in there. Whether the rest of the selection is preserved depends on whether or note the ctrl key 
        // was pressed down during the click event. 
        this.setState({
            currentlySelectedNotes: addOrRemoveElementFromSelection({
                currentSelectionState: this.state.currentlySelectedNotes,
                element: note_id,
                shouldPreserveSelection: e.evt.ctrlKey
            })
        });
    }

    /**
     * Handles the click of a piano key.
     * @param {object} e - the event object
     * @param {object} pitch - the pitch of the key that was clicked
     */
    handlePianoKeyClick = (e, pitch) => {
        // Trigger a note to play on the instrument corresponding to this channel, but do it by directly 
        // interacting with the instrument rather than going through Redux, since this is not state that
        // should be persisted in any way. 
        e.cancelBubble = true;
        window.instrumentReferences[this.section.channelId].triggerAttackRelease(pitch, '8n');
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
        
        const mouseUpPosX = adjustForScroll({ raw: e.evt.layerX, scroll: this.gridLayerRef.current.attrs.x });
        const noteDuration = getNoteDurationFromPencilOperation({
            downX: mouseDownPosX,
            upX: mouseUpPosX,
            currentQuantizeValue: this.state.quantize
        });
        const noteObject = calculateNoteInfo({
            x: mouseDownPosX,
            y: mouseDownPosY,
            pitchesArray: this._pitchesArray,
            currentQuantizeValue: this.state.quantize,
            noteDuration: noteDuration
        });
        const noteIsValid = isValidNote({
            noteToCheck: noteObject,
            allSectionNotes: this.section.notes
        });
        if (noteIsValid) {
            this.props.addNote(this.section.id, noteObject);
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
        const selectedNoteIds = getNoteIdsForSelectionRange({
            verticalSelectionBound1: this.state.mouseDownPosY,
            verticalSelectionBound2: adjustForScroll({raw: e.evt.layerY, scroll: this.gridLayerRef.current.attrs.y}),
            horizontalSelectionBound1: this.state.mouseDownPosX,
            horizontalSelectionBound2: adjustForScroll({raw: e.evt.layerX, scroll: this.gridLayerRef.current.attrs.x}),
            allNotes: this.section.notes
        });

        this.setState({
            currentlySelectedNotes: selectedNoteIds
        });
    }

    /**
     * Updates the quantize value in state.
     * @param {object} e - the event object supplied by the browser
     */
    updateQuantizeValue(e) {
        this.setState({
            quantize: e.target.value
        });
    }

    /**
     * Updates the duration value in state.
     * @param {object} e - the event object supplied by the browser
     */
    updateDurationValue(e) {
        this.setState({
            duration: e.target.value
        });
    }

    /**
     * Updates the pencilActive boolean value in state.
     * @param {object} e - the event object supplied by the browser 
     */
    updateCursorValue(e) {
        this.setState({
            pencilActive: e.target.value === 'pencil'
        });
    }

    /**
     * Handles making the necessary updates whenever the horizontal scroll bar is dragged.
     * @param {object} e - the event object 
     */
    _horizontalDragMove(e) {
        if (!this.state.scrollBarActive) {
            this.setState({ scrollBarActive: true });
        }

        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.x - this.padding;
        const { stageWidth } = this.state; 
        const totalSliderRange = stageWidth - this.padding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;

        // update the layers

        const totalCanvasRange = this.canvasWidth - stageWidth + this.padding + 24 + 48;
        
        this.gridLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.noteLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.transportLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.seekerLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.velocityLayerRef.current.x(-(totalCanvasRange * delta) + 48);
        this.stageRef.current.batchDraw();
    }

    /**
     * Handles making the necessary updates whenever the vertical scroll bar is dragged.
     * @param {object} e - the event object 
     */
    _verticalDragMove(e) {
        // make necessary calculations
        const currentSliderPos = e.target.attrs.y - this.padding;
        const { stageHeight } = this.state;
        const totalSliderRange = stageHeight - this.padding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;

        const canvasHeight = 1728;
        const totalCanvasRange = canvasHeight - stageHeight + this.padding + 24 + 40 + 110;

        // update the layers
        this.gridLayerRef.current.y(-(totalCanvasRange * delta) + 40);
        this.noteLayerRef.current.y(-(totalCanvasRange * delta) + 40);
        this.pianoKeyLayerRef.current.y(-(totalCanvasRange * delta) + 40);
        this.stageRef.current.batchDraw();
    }

    /**
     * Ensures that the scrollBar active value in state is set to true when any mouse interactions with
     * the scroll bar occur. Also stops the event from bubbling up so that nothing on the layers underneath
     * the scroll bar layer gets triggered. 
     * @param {object} e - the event object
     */
    handleScrollBarClickEvents = (e) => {
        e.cancelBubble = true;
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
            this.props.removeNotes(this.section.id, this.state.currentlySelectedNotes);
            this.clearCurrentSelection();
        }
    }

    /**
     * Handles the copying of notes
     */
    handleCopying = () => {
        if (this.state.currentlySelectedNotes) {
            const notesToCopy = this.state.currentlySelectedNotes.map(note_id => {
                return this.section.notes.find(el => el._id === note_id);
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
        const currTransportPos = Tone.Ticks(Tone.Transport.position).quantize(this.state.quantize);;
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
                    allNotes: this.section.notes,
                    sectionStart: this.section.start,
                    sectionBars: this.section.bars 
                });
                if (newNoteObject) {
                    arrayOfNewNoteObjects.push(newNoteObject);
                }
            }
            if (arrayOfNewNoteObjects.length) {
                this.props.addNotes(this.section.id, arrayOfNewNoteObjects);
            }
        }
    }

    /**
     * Contains the logic for dealing with a click on the velocity layer of the canvas. 
     * @param {object} e - the event object
     */
    // parts of this can probably be factored out into a pure util function
    handleVelocityLayerClick = (e) => {
        e.cancelBubble = true;
        const shiftKeyPressed = e.evt.shiftKey;
        // Get the x position of the users click, adjust for scrolling and 'roll it back' to the 
        // last multiple of 8.
        const { layerX, layerY } = e.evt;
        const xPosWithScroll = adjustForScroll({ raw: layerX, scroll: this.velocityLayerRef.current.attrs.x });
        const xPosRolledBack = xPosWithScroll - (xPosWithScroll%8);
        // initialized velocity with a default value of 1
        let velocity = 1;
        
        // Filter out the notes to get only the notes that have this x value.
        const matchingNotes = this.section.notes.filter(note => note.x === xPosRolledBack);
        // Determine if any of these notes are currently selected.
        const selectedMatchingNotes = matchingNotes.filter(note => (
            this.state.currentlySelectedNotes.includes(note._id)
        ));

        // If the shift key is not pressed then we actually want to calculate the velocity based off
        // of the y position of the click. If the shift key is pressed we just leave velocity at its 
        // default value of 1. 
        if (!shiftKeyPressed) {
            // now we derive the desired velocity from the y position of the click event
            // first account for layer offsetting
            const yAdjustedForLayer = layerY - (this.state.stageHeight - 134) - 10;
            // clicks further down the page result in a lower velocity but a higher y value,
            // we have to get the 'reflection' of our y value
            const yAsVelocity = 100 - yAdjustedForLayer;
            // Ensure it stays within our desired range of 0-100, then convert to normal range.
            velocity = Math.min(Math.max(yAsVelocity, 0), 100) / 100;
        }


        // If any of the notes are selected, use the y position of the click to determine the new velocity
        // for those notes.
        if (selectedMatchingNotes.length) {
            let noteObjectsToAdd = [];
            let newNoteIds = [];
            let noteIdsToRemove = [];
            for (let note of selectedMatchingNotes) {
                const newNoteObject = {
                    ...note,
                    _id: generateId(),
                    velocity,
                };
                noteObjectsToAdd.push(newNoteObject);
                newNoteIds.push(newNoteObject._id);
                noteIdsToRemove.push(note._id);
            }
            this.props.addNotes(this.section.id, noteObjectsToAdd);
            this.props.removeNotes(this.section.id, noteIdsToRemove);
            this.setState({
                currentlySelectedNotes: swapSelectedNoteIds({
                    selectedNotesState: this.state.currentlySelectedNotes,
                    newNoteIds: newNoteIds,
                    oldNoteIds: noteIdsToRemove
                })
            });
        // If none of the notes are selected, use the y position of the click to determine the new velocity
        // for all of the notes at this x position. 
        } else if (matchingNotes.length) {
            let noteObjectsToAdd = [];
            let noteIdsToRemove = [];
            for (let note of matchingNotes) {
                const newNoteObject = {
                    ...note,
                    _id: generateId(),
                    velocity,
                };
                noteObjectsToAdd.push(newNoteObject);
                noteIdsToRemove.push(note._id);
            }
            this.props.addNotes(this.section.id, noteObjectsToAdd);
            this.props.removeNotes(this.section.id, noteIdsToRemove);
        }
    };

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
                    currentQuantizeAsTicks: Tone.Ticks(this.state.quantize),
                    sectionStartAsTicks: Tone.Ticks(this.section.start)
                });
                break;

            case 'shiftTimeForwards':
                mutationMethod = shiftTimeForwards({
                    currentQuantizeAsTicks: Tone.Ticks(this.state.quantize),
                    sectionEndAsTicks: Tone.Ticks(this.section.start) + (768 * this.section.numberOfBars)
                });
                break;

            default:
                mutationMethod = shiftPitchUp;
        }
        // create an array of the actual note objects
        const noteObjects = selectionOfIds.map(noteId => {
            return this.section.notes.find(note => note._id === noteId)
        });
        // loop over the noteObjects and perform the selected mutation to them
        for (let noteObject of noteObjects) {
            const newNoteObject = mutationMethod(noteObject);
            newNoteObjects.push(newNoteObject);
            newNoteIds.push(newNoteObject._id);
        }
        this.props.removeNotes(this.section.id, selectionOfIds);
        this.props.addNotes(this.section.id, newNoteObjects);
        this.setState({
            currentlySelectedNotes: newNoteIds
        });
    }

    
    stepUpThroughInversions = () => {
        // transform our array of note ids into an array of data structures containing the full note
        // object, as well as the pitchIndex (the index at which that pitch can be found in this._pitchesArray),
        // sorted from lowest pitch to highest. Note, that the lowest pitch is actually the highest index in
        // this._pitchesArray, since it stores the pitches in descending order. 
        const orderedSelection = getSortedNoteDataStructs({
            currentlySelectedNotes: this.state.currentlySelectedNotes,
            allNotes: this.section.notes,
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
            this.props.removeNote(this.section.id, noteToChange.noteObject._id);
            this.props.addNote(this.section.id, newNoteObject);
            this.setState({
                currentlySelectedNotes: swapSelectedNoteIds({
                    selectedNotesState: this.state.currentlySelectedNotes,
                    newNoteIds: [newNoteObject._id],
                    oldNoteIds: [noteToChange.noteObject._id]
                })
            });
        }
    }

    
    stepDownThroughInversions = () => {
        // transform our array of note ids into an array of data structures containing the full note
        // object, as well as the pitchIndex (the index at which that pitch can be found in this._pitchesArray),
        // sorted from lowest pitch to highest. Note, that the lowest pitch is actually the highest index in
        // this._pitchesArray, since it stores the pitches in descending order. 
        const orderedSelection = getSortedNoteDataStructs({
            currentlySelectedNotes: this.state.currentlySelectedNotes,
            allNotes: this.section.notes,
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
            this.props.removeNote(this.section.id, noteToChange.noteObject._id);
            this.props.addNote(this.section.id, newNoteObject);
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

        if (!this.section) {
            return null;
        }

        const gridLinesArray = createGridLinesArray({
            sectionBars: this.section.numberOfBars,
            canvasWidth: this.canvasWidth,
            canvasGridHeight: this.canvasGridHeight,
            currentQuantizeValue: this.state.quantize
        });
        const { selectedNotes, unselectedNotes } = createSelectedAndUnselectedNoteArrays({
            currentlySelectedNotes: this.state.currentlySelectedNotes,
            allSectionNotes: this.section.notes
        });

        return <PianoRoll 
            handleKeyDown={this.handleKeyDown}
            outerContainerRef={this.outerContainerRef}
            quantizeValue={this.state.quantize}
            updateQuantizeValue={this.updateQuantizeValue.bind(this)}
            durationValue={this.state.duration}
            updateDurationValue={this.updateDurationValue.bind(this)}
            cursorValue={this.state.pencilActive ? 'pencil' : 'pointer'}
            updateCursorValue={this.updateCursorValue.bind(this)}
            stageRef={this.stageRef}
            handleStageClick={this.handleStageClick}
            handleMouseDown={this.handleMouseDown}
            handleMouseUp={this.handleMouseUp}
            gridLayerRef={this.gridLayerRef}
            canvasWidth={this.canvasWidth}
            canvasHeight={this.canvasHeight}
            gridLinesArray={gridLinesArray}
            noteLayerRef={this.noteLayerRef}
            section={this.section}
            currentlySelectedNotes={this.state.currentlySelectedNotes}
            handleNoteClick={this.handleNoteClick}
            stageHeight={this.state.stageHeight}
            stageWidth={this.state.stageWidth}
            velocityLayerRef={this.velocityLayerRef}
            handleVelocityLayerClick={this.handleVelocityLayerClick}
            selectedNotes={selectedNotes}
            unselectedNotes={unselectedNotes}
            pianoKeyLayerRef={this.pianoKeyLayerRef}
            pitchesArray={this._pitchesArray}
            handlePianoKeyClick={this.handlePianoKeyClick}
            transportLayerRef={this.transportLayerRef}
            transportBarNumbersArray={this._transportBarNumbersArray}
            seekerLayerRef={this.seekerLayerRef}
            seekerLineRef={this.seekerLineRef}
            padding={this.padding}
            horizontalDragMove={this.horizontalDragMove}
            verticalDragMove={this.verticalDragMove}
            handleScrollBarClickEvents={this.handleScrollBarClickEvents}
        />
    }

}




const mapStateToProps = state => ({
    sections: state.sections,
    isPlaying: state.playerInfo.isPlaying
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
