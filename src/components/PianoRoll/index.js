import React, { Component } from 'react';
import Konva from 'konva';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { generateId } from '../../helpers';
import Tone from 'tone';
import { throttle } from 'lodash';
import PianoRoll from './PianoRoll';
import {
    createSelectedAndUnselectedNoteArrays,
    getWholeBarsFromString,
    transportPositionStringToSixteenths,
    getTransportLineAttrs,
    createPitchesArray,
    createGridLinesArray,
    isValidNote,
    calculateNoteInfo,
    createTransportBarNumbersArray,
    swapSelectedNoteIds,
    shiftPitchUp,
    shiftPitchDown,
    shiftTimeBackwards,
    shiftTimeForwards
} from './PianoRollUtils';

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

class PianoRollContainer extends Component {
    constructor(props) {
        super(props);

        // these values are fixed, and are merely being aliased here so that when they are used later
        // it is clear what the numbers refer to.
        this.padding = 10;
        this.pianoKeysWidth = 48;
        this.canvasWidth = this.section.numberOfBars * 384;
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
        this.seekerLineRef.current.x(initialLineAttrs.xPos);
        this.seekerLineRef.current.strokeWidth(initialLineAttrs.strokeWidth);
        this.seekerLayerRef.current.batchDraw();
        this.outerContainerRef.current.focus();
    }

    componentWillUnmount() {
        /*why does this fix the error previously being caused by destroy method on stage being 
        called at unmount? Destroy method for reference:

        destroy: function destroy() {
            var content = this.content;
            Konva.Container.prototype.destroy.call(this);

            if (content && Konva.Util._isInDocument(content)) {
                this.getContainer().removeChild(content);
            }

            var index = Konva.stages.indexOf(this);

            if (index > -1) {
                Konva.stages.splice(index, 1);
            }

            return this;
        }
        */
        if (this.rAFRef) {
            cancelAnimationFrame(this.rAFRef);
        }
        this.stageRef.current.content = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.getTransportPosition);
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
    // can't  be pure
    getTransportPosition = () => {
        const newLineAttrs = getTransportLineAttrs({
            sectionStart: this.section.start,
            sectionBars: this.section.numberOfBars,
            currentTransportPosition: Tone.Transport.position
        });        
        this.seekerLineRef.current.x(newLineAttrs.xPos);
        this.seekerLineRef.current.strokeWidth(newLineAttrs.strokeWidth);
        this.seekerLayerRef.current.batchDraw();
        this.rAFRef = requestAnimationFrame(this.getTransportPosition);
    }

    

    /**
     * Handles a click that occurs within the Transport section of the canvas, delegating to other
     * functions as needed. 
     * @param {number} xPos - the x position of the click event that occurred. 
     */
    // can't be pure
    handleTransportClick = (xPos) => {
        // We get the raw xPos as an argument. 
        //
        // Eventual goals - we want to produce an x position for the seekerLine to be rendered at,
        // and we want to produce a corresponding time on the timeline for the track to move to. This 
        // timeline could either be in BBS or in Ticks.
        //
        // First we establish a single source of truth for how far into the section the user has clicked. 
        // Take the raw xPos and subtract this.pianoKeysWidth from it to account for the piano keys offsetting 
        // the layers. 
        // Now we adjust for any potential scrolling. get the current x for an applicable layer and subtract 48
        // from it - because this layer starts off with an x of 48. This means if no scrolling has occurred we
        // get 0, or if any scrolling has occurred we will get some negative value corresponding to the amount
        // scrolled. We take the value we get, and subtract it from our xPos (effectively adding it since we
        // know the number is non-positive).
        //
        // Now we adjust for quantization to get a nice figure. Grab the current quantize level from state and
        // convert it into Ticks, then divide by 2 (because 2 ticks correspond to 1 pixel in the UI). 
        // Now we use modulo to adjust our xPos into the last whole interval according to our quantize level. 
        //
        // The figure we now have can be used to update the UI - it will match perfectly with the new x position
        // for the seeker line to be rendered at. However more work is needed to calculate the transport position
        // to move the track to. 
        // First grab this.section.start, which is currently in BBS, and convet to Ticks. Then, take the final
        // figure we got for our x pos in the UI, and multiply it by 2 to get the corresponding ticks value. We
        // now have the start of the section in Ticks, and our progress into the section in Ticks, we can add those
        // together and convert to BBS, then update the track position to this new BBS value. 
        //
        const xPosAdjustedForKeys = xPos - this.pianoKeysWidth;
        const scrolledX = (this.seekerLayerRef.current.attrs.x || 48) - 48;
        const xPosAdjustedForScroll = xPosAdjustedForKeys - scrolledX;
        const currQuantizeAdjustment = Tone.Time(this.state.quantize).toTicks() / 2;
        const xPosAdjustedForQuantize = xPosAdjustedForScroll-(xPosAdjustedForScroll%currQuantizeAdjustment);
        const finalUIxPos = xPosAdjustedForQuantize;
        const sectionStartAsTicks = Tone.Time(this.section.start).toTicks();
        const sectionProgressAsTicks =  xPosAdjustedForQuantize * 2;
        const newTransportPosition = Tone.Ticks(sectionStartAsTicks+sectionProgressAsTicks).toBarsBeatsSixteenths();
        Tone.Transport.position = newTransportPosition;
        this.seekerLineRef.current.strokeWidth(2);
        this.seekerLineRef.current.x(finalUIxPos);
        this.seekerLayerRef.current.batchDraw();
    }

    /**
     * Convenience method for accessing the specific section object corresponding to the sectionId that
     * was passed in as a prop
     * @return {object} - the section object
     */
    // can't be pure
    get section() {
        return this.props.sections[this.props.id];
    }

    /**
     * The main function for handling click events on the canvas, delegating to other functions as needed.
     * @param {object} e - the event object supplied by the browser 
     */
    // can't be pure
    _handleStageClick(e) {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        
        let t = e.target;
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;
        if (yPos < 40) {
            this.handleTransportClick(xPos);
            return;
        }
        if (t.attrs.type && t.attrs.type === 'noteRect') {
            const { pitch, time } = t.attrs;
            const note_id = t.attrs._id;
            if (!this.state.currentlySelectedNotes.includes(note_id)) {
                this.setState({ currentlySelectedNotes: [note_id] });
            } else {
                this.setState({ currentlySelectedNotes: [] });
            }
        } else {
            if (!this.state.pencilActive && !e.evt.shiftKey) {
                let x = e.evt.layerX;
                let scrolledX = this.gridLayerRef.current.attrs.x || 0;
                let xWithScroll = x - scrolledX;
                let y = e.evt.layerY;
                let scrolledY = this.gridLayerRef.current.attrs.y || 0;
                let yWithScroll = y - scrolledY;
                let noteObject = calculateNoteInfo({
                    x: xWithScroll, 
                    y: yWithScroll,
                    pitchesArray: this._pitchesArray,
                    currentQuantizeValue: this.state.quantize,
                    currentDurationValue: this.state.duration
                });
                const noteIsValid = isValidNote({
                    noteToCheck: noteObject, 
                    allSectionNotes: this.section.notes
                });
                if (noteIsValid) {
                    this.props.addNote(this.section.id, noteObject);
                }
            }
        }
    }

    /**
     * Handles the clicking of a note Rect on the canvas, also prevents event bubbling to stop any events
     * on sublayers from firing
     * @param {object} e - the event object
     */
    // can't be pure
    handleNoteClick = (e) => {
        e.cancelBubble = true;
        const { _id } = e.target.attrs;
        const { ctrlKey } = e.evt;
        const currSelection = this.state.currentlySelectedNotes;
        const noteIsSelected = currSelection.includes(_id);
        // Different behaviour occurs depending on whether the ctrl key is currently pressed. If it is
        // pressed, we are adding/removing the current note to/from the selection. If the ctrl key is 
        // not pressed, we are either making the current note the entire selection, or clearing the
        // selection entirely.
        if (ctrlKey) {
            this.setState({
                currentlySelectedNotes: noteIsSelected ? 
                                        currSelection.filter(noteId => noteId !== _id) :
                                        [...currSelection, _id]
            });
        } else {
            this.setState({
                currentlySelectedNotes: noteIsSelected ? [] : [ _id ]
            });
        }
    }

    /**
     * The main function for handling mouseDown events on the canvas, delegating to other functions as needed.
     * @param {object} e - the event object supplied by the browser
     */
    // can't be pure
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
        // All we do here is update state with the coordinates that the mouseDown event happened
        // at, as the mouseUp event handler will later need to reference these.
        const scrolledX = this.gridLayerRef.current.attrs.x || 0;
        const scrolledY = this.gridLayerRef.current.attrs.y || 0;
        this.setState({
            mouseDownPosX: e.evt.layerX - scrolledX,
            mouseDownPosY: e.evt.layerY - scrolledY
        });
    }

    /**
     * The main function for handling mouseUp events on the canvas, delegating to other functions as needed.
     * @param {object} e - the event object supplied by the browser.  
     */
    // can't be pure
    _handleMouseUp(e) {
        // safeguard to ensure that nothing gets triggered on during/at the end of an interaction with the
        // scrollbars.
        if (this.state.scrollBarActive) {
            this.setState({ scrollBarActive: false });
            return;
        }
        // for ref - 48 ticks = '16n'
        if (this.state.pencilActive) {
            this.handlePencilToolNoteCreation(e);
        } else {
            this.handlePointerToolMultiSelect(e);
        }
    }

    /**
     * Contains the logic for creating a new note using the pencil tool.
     * @param {object} e - the event object
     */
    // can't be pure
    handlePencilToolNoteCreation = (e) => {
        // if a note was clicked on just return, the onClick handler already contains all of the
            // logic for that. 
            if (e.target.attrs.type && e.target.attrs.type === 'noteRect' || e.target.attrs.type === 'scrollRect') {
                return;
            }
            // We have take the information about the mouseDown event from state, and combined with
            // the information about this mouseUp event we have to calculate all of the details for 
            // the note that will be added - pitch, time, duration, _id, x, y, width.
            
            // x pos of cursor when mouseDown occurred
            let downX = this.state.mouseDownPosX;
            // y pos of cursor when mouseDown occurred
            let downY = this.state.mouseDownPosY;
            // x pos of cursor when mouseUp occurred, scrolledX is to account for any potential scrolling
            // of the canvas that has occured.
            let scrolledX = this.gridLayerRef.current.attrs.x || 0;
            let upX = e.evt.layerX - scrolledX;
            // current quantize value in state converted into ticks
            let currQuantizeAsTicks = Tone.Time(this.state.quantize).toTicks();
            // the row 'clicked' during mouseDown, according to the y pos
            let rowClicked = Math.floor(downY / 16);
            // the x pos during mouseDown, 'rolled back' to the last whole quantized unit,
            // based on the current quantize value. Can be used to set the visual x position
            // for the note on the grid.
            let adjustedDownX = downX - (downX%(currQuantizeAsTicks/2));
            // adjustment of the y pos during mouseDown, can be used to set the visual y 
            // position for the note on the grid.
            let adjustedDownY = downY - (downY % 16);
            // x pos during mousedown adjusted to a tick value. Note, this is different from
            // adjustedDownX - that is used for the visual coordinate of the note, whereas this
            // is used for the tick value that the note should start at. 
            let downXAsTicks = Tone.Ticks(adjustedDownX*2-(adjustedDownX*2%currQuantizeAsTicks));
            //let downXAsTicks = Tone.Ticks(downX*2-(downX*2%currQuantizeAsTicks));
            //let upXAsTicks = Tone.Ticks(upX*2-(upX*2%currQuantizeAsTicks));
            // x pos during mouseUp, adjusted to ticks, used to determine note duration.
            let upXAsTicks = Tone.Ticks(upX*2);
            // convert the tick-based downXAsTicks into "0:0:0" format.
            let noteTime = downXAsTicks.toBarsBeatsSixteenths();
            // work out the quantized, tick based length of the note based on the difference between
            // upXAsTicks and downXAsTicks. As a fallback, if this amount is less than the current quantize
            // level in ticks, just use that figure instead. This prevents accidentally creating notes that 
            // too small to see in the UI, by clicking whilst using the pencil tool.
            let noteDurationAsTicks = Math.max(
                Tone.Ticks(upXAsTicks-downXAsTicks).quantize(this.state.quantize),
                currQuantizeAsTicks
            );
            // convert the tick-based noteDurationAsTicks into BBS format - '0:0:1'.
            const noteDurationAsBBS = Tone.Ticks(noteDurationAsTicks).toBarsBeatsSixteenths();
            const noteObject = {
                pitch: this._pitchesArray[rowClicked],
                time: noteTime,
                duration: noteDurationAsBBS,
                velocity: 1,
                _id: generateId(),
                x: adjustedDownX,
                y: adjustedDownY,
                width: noteDurationAsTicks / 2 
            };
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
    // could probably split this up for part of it to be pure
    handlePointerToolMultiSelect = (e) => {
        // use the x and y coordinates from the mouseDown and mouseUp events to determine the range
        // of rows and columns included in the selection.

        // grab the current scroll amounts so that the x and y coords from this mouseUp event can be
        // adjusted accordingly.
        const scrolledX = this.gridLayerRef.current.attrs.x || 0;
        const scrolledY = this.gridLayerRef.current.attrs.y || 0;

        // we don't necessarily know which vertical bound is top/bottom, or which horizontal bound
        // is left/right at first.

        const verticalBound1 = this.state.mouseDownPosY;
        const horizontalBound1 = this.state.mouseDownPosX;
        const verticalBound2 = e.evt.layerY - scrolledY;
        const horizontalBound2 = e.evt.layerX - scrolledX;

        // now we determine which bounds are which
        const selectionLeft = Math.min(horizontalBound1, horizontalBound2);
        const selectionRight = Math.max(horizontalBound1, horizontalBound2);
        const selectionTop = Math.min(verticalBound1, verticalBound2);
        const selectionBottom = Math.max(verticalBound1, verticalBound2);

        const selectedNotes = this.section.notes.filter(note => {
            const {x, y, width, height } = note;
            //return (x >= leftBound && x <= rightBound && y >= topBound && y <= bottomBound);
            const noteLeft =  x;
            const noteRight = x + width;
            const noteTop = y;
            const noteBottom = y + height;

            // This series of conditional statements will evaluate to true for any possible overlap
            // between the vertical range of the selection and the vertical range of the note, 
            // regardless of which vertical range is greater. 
            const isInVerticalRange = (noteTop >= selectionTop && noteTop <= selectionBottom) ||
                                      (noteBottom >= selectionTop && noteBottom <= selectionBottom) ||
                                      (selectionTop >= noteTop && selectionTop <= noteBottom) ||
                                      (selectionBottom >= noteTop && selectionBottom <= noteBottom);

            // Similar to isInVerticalRange, accounts for any possible overlap regardless of whether the
            // note or selection has a larger horizontal range.
            const isInHorizontalRange = (noteLeft >= selectionLeft && noteLeft <= selectionRight) ||
                                        (noteRight >= selectionLeft && noteRight <= selectionRight) ||
                                        (selectionLeft >= noteLeft && selectionLeft <= noteRight) ||
                                        (selectionRight >= noteLeft && selectionRight <= noteRight);

            return isInVerticalRange && isInHorizontalRange;
        })
        .map(noteObject => noteObject._id);

        this.setState({
            currentlySelectedNotes: selectedNotes
        });
        // grab all of the current notes in the section.

        // filter out all of the notes whose pitch falls outside of the selection.

        // filter out all of the notes that don't reside, at least partially, within the left and
        // right bounds of the selection.

        // every note that hasn't been filtered out by this point will comprise our selection of notes, 
        // store in state.currentlySelectedNotes
    }


    /**
     * Updates the quantize value in state.
     * @param {object} e - the event object supplied by the browser
     */
    // can't be pure
    updateQuantizeValue(e) {
        this.setState({
            quantize: e.target.value
        });
    }

    /**
     * Updates the duration value in state.
     * @param {object} e - the event object supplied by the browser
     */
    // can't be pure
    updateDurationValue(e) {
        this.setState({
            duration: e.target.value
        });
    }

    /**
     * Updates the pencilActive boolean value in state.
     * @param {object} e - the event object supplied by the browser 
     */
    // can't be pure
    updateCursorValue(e) {
        this.setState({
            pencilActive: e.target.value === 'pencil'
        });
    }

    /**
     * Handles making the necessary updates whenever the horizontal scroll bar is dragged.
     * @param {object} e - the event object 
     */
    // can't be pure
    _horizontalDragMove(e) {


        // Strategy
        // Work out how far along the horizontal slider is, as a percentage (or rather decimal)
        // of the total range of space it can reside in. 
        // Then, using the .x() method, set the x values for the canvas layers as the negative of
        // the total canvas width multiplied by the decimal previously calculated.
        //
        // Working out how far along the horizontal slider is:
        // total range is this.state.stageWidth - (this.padding * 2) - 100
        // current position within that range is e.target.attrs.x - this.padding
        // to decimal => current position / total range
        //
        // total range for overal canvas is canvasWidth - stageWidth
        //  
        //
        //
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
    // can't be pure
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
     * Handles the click of a piano key.
     * @param {object} e - the event object
     * @param {object} pitch - the pitch of the key that was clicked
     */
    // can't be pure
    handlePianoKeyClick = (e, pitch) => {
        e.cancelBubble = true;
        window.instrumentReferences[this.section.channelId].triggerAttackRelease(pitch, '8n');
    }

    /**
     * The main function for handling keyDown events on this component, delegates to other functions
     * as necessary.
     * @param {object} e - the event object
     */
    // can't be pure
    handleKeyDown = e => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e);
        // console.log(e.key)

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

        if (e.key === 'd' && e.ctrlKey) {
            this.clearCurrentSelection();
        }
    }

    /**
     * Clears the current selectin in state, if there is a selection.
     */
    // can't be pure
    clearCurrentSelection = () => {
        if (this.state.currentlySelectedNotes.length) {
            this.setState({ currentlySelectedNotes: [] });
        }
    }

    /**
     * Ensures that the scrollBar active value in state is set to true when any mouse interactions with
     * the scroll bar occur. Also stops the event from bubbling up so that nothing on the layers underneath
     * the scroll bar layer gets triggered. 
     * @param {object} e - the event object
     */
    // can't be pure
    handleScrollBarClickEvents = (e) => {
        e.cancelBubble = true;
        if (!this.state.scrollBarActive) {
            this.setState({ scrollBarActive: true });
        }
    }

    /**
     * Handles the deletion of notes.
     */
    // can't be pure
    handleDeletion = () => {
        if (this.state.currentlySelectedNotes) {
            for (let note_id of this.state.currentlySelectedNotes) {
                const noteObject = this.section.notes.find(el => el._id === note_id);
                this.props.removeNote(this.section.id, noteObject._id);
            }
        }
    }

    /**
     * Handles the copying of notes
     */
    // can't be pure
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

    //
    // Pasting should be refactored so that it pastes all of the notes in one step, rather than dispatching
    // a new action for each note. This approach will also probably allow at least part of the process to be
    // made pure and extracted into the utils file as well, whereas in it's current state it all has to live
    // within the actual component.
    //

    /**
     * Handles the pasting of notes
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
            // now loop through the notes again and actually call the paste operation for each note. 
            for (let note of this.state.currentlyCopiedNotes) {
                this.pasteOneNote(note, currTransportPos, earliestNoteTime);
            }
        }
    }

    /**
     * Handles the pasting of one partiular notes, used internally by the handlePasting method. 
     * @param {object} noteToPaste - object containing the data for the note to be pasted
     * @param {number} currTransportPos - a Tick based value for the current transport position
     * @param {number} earliestNoteTime - a Tick based value for the earliest time value of any
     * of the notes being pasted
     */
    pasteOneNote = (noteToPaste, currTransportPos, earliestNoteTime) => {
        // calculate the delta between earliestNoteTime and the time value for this particular note
        const deltaTicks = Tone.Ticks(noteToPaste.time) - earliestNoteTime;
        // derive the start and end of the 'paste area' for this note from the other pieces of information
        // we already know
        const pasteAreaStartAsTicks = currTransportPos + deltaTicks;
        const pasteAreaEndAsTicks = pasteAreaStartAsTicks + Tone.Ticks(noteToPaste.duration);

        // check that it is within range of this section. First grab the start and end of the section
        // as ticks, then compare with the start and end of the paste area. If either the start or the
        // end of the paste area don't fall into the interval between the start and end of the section,
        // then paste operation is disallowed.
        const sectionStartAsTicks = Tone.Ticks(this.section.start).toTicks();
        const sectionEndAsTicks = sectionStartAsTicks + (768 * this.section.numberOfBars); 

        if (pasteAreaStartAsTicks < sectionStartAsTicks || pasteAreaEndAsTicks > sectionEndAsTicks) {
            console.log(`
                pasteAreaStartAsTicks: ${pasteAreaStartAsTicks}
                pasteAreaEndAsTicks: ${pasteAreaEndAsTicks}
                sectionStartAsTicks: ${sectionStartAsTicks}
                sectionEndAsTicks: ${sectionEndAsTicks}
            `);
            console.log('note could not be pasted.');
            return;
        }

        // construct a new note object based on the note that was copied and the current transport time
        const newNoteObject = {
            pitch: noteToPaste.pitch,
            time: Tone.Ticks(pasteAreaStartAsTicks).toBarsBeatsSixteenths(),
            duration: noteToPaste.duration,
            velocity: noteToPaste.velocity,
            _id: generateId(),
            x: (pasteAreaStartAsTicks-sectionStartAsTicks) / 2,
            y: noteToPaste.y,
            width: noteToPaste.width
        }
        // dispatch action to add the new note
        const noteIsValid = isValidNote({
            noteToCheck: newNoteObject,
            allSectionNotes: this.section.notes
        })
        if (noteIsValid) {
            this.props.addNote(this.section.id, newNoteObject);
        }
    }

    /**
     * Contains the logic for dealing with a click on the velocity layer of the canvas. 
     * @param {object} e - the event object
     */
    // can't be pure
    handleVelocityLayerClick = (e) => {
        e.cancelBubble = true;
        const shiftKeyPressed = e.evt.shiftKey;
        console.log(shiftKeyPressed)
        //const shiftKeyPress = 
        // Get the x position of the users click, adjust for scrolling and 'roll it back' to the 
        // last multiple of 8.
        const { layerX, layerY } = e.evt;
        const scrolledX = this.velocityLayerRef.current.attrs.x || 0;
        const xWithScroll = layerX - scrolledX;
        const xPos = xWithScroll - (xWithScroll%8);
        // initialized velocity with a default value of 1
        let velocity = 1;
        
        // Filter out the notes to get only the notes that have this x value.
        const matchingNotes = this.section.notes.filter(note => note.x === xPos);
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
        
        // Whichever notes we will be operating on, determined by the previous step, loop through each of these
        // notes, call removeNote() with the original note, and call addNote with a copy of the note that has an
        // updated velocity value. 
    }

    

    /**
     * Handles the mutation of selected notes, delegating to other functions as necessary. 
     * @param {array} selectionOfIds - the array of note ids that comprise the current selection
     * @param {string} mutationMethodToUse - string representing the mutation method to be used
     */
    // can't be pure
    mutateSelection = (selectionOfIds, mutationMethodToUse) => {
        // map over selectionOfIds to create an array of the actual note objects rather than just the ids.
        // let newNoteIds hold the ids of the new notes we create.
        // let newNoteObjects hold the new note objects we create.
        // rather than create dedicated variable for all of the original note ids we will remove later,
        // just use the selectionOfIds param.
        // save function we will us as our method of mutation in a variable methodOfMutation. Use a switch 
        // statement based on the method param we pass in to grab the right method. 
        // loop over the array of note objects, and call the methodOfMutation for each one. 
        // take the object we get  back and push it onto newNoteObjects, also take the id and push it
        // onto newNoteIds.
        // once the entire selection has been dealt with, call removeNotes() to get rid of the old notes, 
        // addNotes() to add the new notes, and then update currentlySelectedNotes in state to the the
        // newNoteIds array.

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

    // can probably be refactored for at least part of this to be pure
    stepUpThroughInversions = () => {
        // transform our array of note ids into an array of data structures containing the full note
        // object, as well as the pitchIndex (the index at which that pitch can be found in this._pitchesArray),
        // sorted from lowest pitch to highest. Note, that the lowest pitch is actually the highest index in
        // this._pitchesArray, since it stores the pitches in descending order. 
        const orderedSelection = this.state.currentlySelectedNotes.map(noteId => {
            const noteObject = this.section.notes.find(note => note._id === noteId);
            const pitchIndex = this._pitchesArray.findIndex(pitchString => pitchString === noteObject.pitch);
            return {
                noteObject,
                pitchIndex
            }
        })
        .sort((noteA, noteB) => {
            return noteB.pitchIndex - noteA.pitchIndex;
        });
        console.log(orderedSelection);
        // declare anchor note, which is the note we will update. 
        let pivotNote = orderedSelection[0];
        let newPitchIndex = null;
        for (let note of orderedSelection) {
            let candidatePitchIndex = note.pitchIndex - 12;
            const pitchIndexTaken = orderedSelection.find(el => el.pitchIndex === candidatePitchIndex);
            if (!pitchIndexTaken && candidatePitchIndex >= 0) {
                newPitchIndex = candidatePitchIndex;
                break;
            }
        }
        if (newPitchIndex) {
            const newNoteObject = {
                ...pivotNote.noteObject,
                pitch: this._pitchesArray[newPitchIndex],
                y: newPitchIndex * 16,
                _id: generateId()
            };
            this.props.removeNote(this.section.id, pivotNote.noteObject._id);
            this.props.addNote(this.section.id, newNoteObject);
            this.setState({
                currentlySelectedNotes: swapSelectedNoteIds({
                    selectedNotesState: this.state.currentlySelectedNotes,
                    newNoteIds: [newNoteObject._id],
                    oldNoteIds: [pivotNote.noteObject._id]
                })
            });
        }
    }
    // can probably be refactored for at least part of this to be pure
    stepDownThroughInversions = () => {
        // transform our array of note ids into an array of data structures containing the full note
        // object, as well as the pitchIndex (the index at which that pitch can be found in this._pitchesArray),
        // sorted from lowest pitch to highest. Note, that the lowest pitch is actually the highest index in
        // this._pitchesArray, since it stores the pitches in descending order. 
        const orderedSelection = this.state.currentlySelectedNotes.map(noteId => {
            const noteObject = this.section.notes.find(note => note._id === noteId);
            const pitchIndex = this._pitchesArray.findIndex(pitchString => pitchString === noteObject.pitch);
            return {
                noteObject,
                pitchIndex
            }
        })
        .sort((noteA, noteB) => {
            return noteA.pitchIndex - noteB.pitchIndex;
        });

        // declare anchor note, which is the note we will update. 
        let pivotNote = orderedSelection[0];
        let newPitchIndex = null;
        for (let note of orderedSelection) {
            let candidatePitchIndex = note.pitchIndex + 12;
            const pitchIndexTaken = orderedSelection.find(el => el.pitchIndex === candidatePitchIndex);
            if(!pitchIndexTaken && candidatePitchIndex < this._pitchesArray.length) {
                newPitchIndex = candidatePitchIndex;
                break;
            }
        }
        if (newPitchIndex) {
            const newNoteObject = {
                ...pivotNote.noteObject,
                pitch: this._pitchesArray[newPitchIndex],
                y: newPitchIndex * 16,
                _id: generateId()
            };
            this.props.removeNote(this.section.id, pivotNote.noteObject._id);
            this.props.addNote(this.section.id, newNoteObject);
            this.setState({
                currentlySelectedNotes: swapSelectedNoteIds({
                    selectedNotesState: this.state.currentlySelectedNotes,
                    newNoteIds: [newNoteObject._id],
                    oldNoteIds: [pivotNote.noteObject._id]
                })
            });
        }
    }

    render() {
        const gridLinesArray = createGridLinesArray({
            canvasWidth: this.canvasWidth,
            currentQuantizeValueAsTicks: Tone.Time(this.state.quantize).toTicks()
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
