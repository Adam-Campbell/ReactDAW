import React, { Component } from 'react';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import Konva from 'konva';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import { generateId } from '../helpers';
import Tone from 'tone';
import QuantizeSelect from './QuantizeSelect';
import CursorSelect from './CursorSelect';
import DurationSelect from './DurationSelect';
import { Rnd } from 'react-rnd';
import { debounce, throttle } from 'lodash';
import { UIColors } from '../constants';

/*
Current work:

Working on updating the pasting functionality to support pasting multiple notes at once. Have already
updated the copy functionality to support multiple notes. 
*/

class PianoRoll extends Component {
    constructor(props) {
        super(props);
        this.padding = 10;
        this.pianoKeysWidth = 48;
        this.stageWidth = 800;
        this.stageHeight = 600;
        this.outerContainerRef = React.createRef();
        this.stageRef = React.createRef();
        this.gridLayerRef = React.createRef();
        this.noteLayerRef = React.createRef();
        this.pianoKeyLayerRef = React.createRef();
        this.transportLayerRef = React.createRef();
        this.seekerLayerRef = React.createRef();
        this.seekerLineRef = React.createRef();
        this.velocityLayerRef = React.createRef();
        this.rAFRef = null;
        this.horizontalDragMove = throttle(this._horizontalDragMove, 16).bind(this);
        this.verticalDragMove = throttle(this._verticalDragMove, 16).bind(this);
        this.canvasWidth = this.section.numberOfBars * 384;
        this.canvasHeight = 1768;
        this._notesArray = this._createNotesArray();
        this._transportBarNumbersArray = this._createTransportBarNumbersArray();
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
        const initialLineAttrs = this.getTransportLineAttrs();
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

    createVelocityArrays = () => {
        // We want to return an object with two properties - selectedNotes will be an array of all selected
        // notes, and unselectedNotes will be an array of all unselectedNotes.
        // First we can check if there actually are any selected notes, and if there aren't then we can just
        // return all of the notes in the unselectedNotes array, and return an empty array for the selectedNotes
        // array. 
        if (!this.state.currentlySelectedNotes) {
            return {
                selectedNotes: [],
                unselectedNotes: [ ...this.section.notes ]
            };
        }
        // however if there are currentlySelectedNotes, then we have to loop through all of the notes in this
        // section and sort them into selected and unselected notes before returning them. 
        let selectedNotes = [];
        let unselectedNotes = [];
        for (let note of this.section.notes) {
            if (this.state.currentlySelectedNotes.includes(note._id)) {
                selectedNotes.push(note);
            } else {
                unselectedNotes.push(note);
            }
        }
        return {
            selectedNotes,
            unselectedNotes
        };
    }

    /**
     * The main function responsible for updating the seeker line, called in each animation frame, gets
     * the new location for the seeker line and redraws the seeker layer of the canvas. 
     */
    getTransportPosition = () => {
        const newLineAttrs = this.getTransportLineAttrs();        
        this.seekerLineRef.current.x(newLineAttrs.xPos);
        this.seekerLineRef.current.strokeWidth(newLineAttrs.strokeWidth);
        this.seekerLayerRef.current.batchDraw();
        this.rAFRef = requestAnimationFrame(this.getTransportPosition);
    }

    /**
     * Given a BBS string, determine the amount of whole bars present in the time described by the string
     * and return this value as an integer.
     * @param {string} transportPositionString - the BBS string to query
     * @return {number} - the whole bars as an integer.
     */
    getWholeBarsFromString = (transportPositionString) => {
        const splitString= transportPositionString.split(':');
        return parseInt(splitString[0]);
    }

    /**
     * Given a BBS string, reduce the string down on floating point number which is the total value of the 
     * bars, beats and sixteenths, all in terms of sixteenths. 
     * @param {string} transportPositionString - the BBS string to query.
     * @return {number} - the amount of sixteenths as a floating point number - if it doesn't come to a
     * discrete amount of sixteenths it will return parts of sixteenths as well.
     */
    transportPositionStringToSixteenths = (transportPositionString) => {
        const splitString= transportPositionString.split(':');
        const asSixteenths = parseInt(splitString[0])*16 + 
                           parseInt(splitString[1])*4 +
                           parseFloat(splitString[2]);
        return asSixteenths;
    }

    /**
     * Works out the next x position that the seeker line needs to be rendered to. Only used by the 
     * getTransportPosition() function.
     * @return {object} - an object containing the information needed for the next render. 
     */
    getTransportLineAttrs = () => {
        // verify whether current transport position is within this section. If not, return some value
        // for xPos (unimportant in this case), and return 0 for strokeWidth.
        // If it is in this section, return 2 for strokeWidth and return a precise xPos.
        const currentTransportPosition = Tone.Transport.position;
        const sectionStartBar = this.getWholeBarsFromString(this.section.start);
        const sectionEndBar = sectionStartBar + this.section.numberOfBars;
        const currentTransportBar = this.getWholeBarsFromString(currentTransportPosition);
        if (currentTransportBar < sectionStartBar || currentTransportBar > sectionEndBar) {
            return {
                xPos: -96,
                strokeWidth: 0
            };
        } else {
            const sectionStartAsSixteenths = this.transportPositionStringToSixteenths(this.section.start);
            const currentPositionAsSixteenths = this.transportPositionStringToSixteenths(currentTransportPosition);
            const diff = currentPositionAsSixteenths - sectionStartAsSixteenths;
            const diffToXPos = (diff * 24);
            return {
                xPos: diffToXPos,
                strokeWidth: 2
            };
        }
    }

    /**
     * Handles a click that occurs within the Transport section of the canvas, delegating to other
     * functions as needed. 
     * @param {number} xPos - the x position of the click event that occurred. 
     */
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
    get section() {
        return this.props.sections[this.props.id];
    }

    /**
     * Programmaticaly create an array of all of the notes ranging from C0 to B8.
     * @return {array} - the array of notes.
     */
    _createNotesArray() {
        const onlyNotes = ['B', 'A#', 'A','G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'];
        const onlyOctaves = ['8', '7', '6', '5', '4', '3', '2', '1', '0'];
        let notesArray = [];
        for (let octave of onlyOctaves) {
            for (let note of onlyNotes) {
                notesArray.push(note + octave);
            }
        }
        return notesArray;
    }

    /**
     * Programatically creates an array of objects describing each individual grid line required by the
     * component, such that when it comes to rendering the component can simply map over this array and
     * construct a <Line/> component from each object in the array. 
     * @return {array} - the array of grid line objects.
     */
    _createGridLinesArray() {
        let linesArray = [];
        let strokeWidth = 2;
        let escapeHatch = 0;
        let currPos = 0;
        let quantizeInterval = Tone.Time(this.state.quantize).toTicks() / 2;

        while(currPos <= this.canvasWidth && escapeHatch < 1000) {
            if (currPos % 384 === 0) {
                strokeWidth = 2;
            } else if (currPos % 96 === 0) {
                strokeWidth = 1;
            } else {
                strokeWidth = 0.5;
            }
            linesArray.push({
                points: [currPos, 0, currPos, 1728],
                strokeWidth: strokeWidth
            });
            currPos += quantizeInterval;
            escapeHatch++;
        }

        // create horizontal lines
        for (let j = 0; j <= 108; j++) {
            linesArray.push({
                points: [0, j*16, this.canvasWidth, j*16],
                strokeWidth: 1
            });
        }

        return linesArray;
    }

    /**
     * Given an x and y position for a click event that has occurred, performs the calculations required
     * to create a note object corresponding to the x and y values supplied as arguments.
     * @param {number} x - x position of the click event
     * @param {number} y - y position of the click event
     * @return {object} - the generated note object. 
     */
    _calculateNoteInfo(x, y) {
        let currQuantizeAsTicks = Tone.Time(this.state.quantize).toTicks();
        let rowClicked = Math.floor(y / 16);
        let adjustedX = x - (x%(currQuantizeAsTicks/2));
        let adjustedY = y - (y % 16);
        let xPosAsBBS = Tone.Ticks(x*2-(x*2%currQuantizeAsTicks)).toBarsBeatsSixteenths();
        const durationAsBBS = Tone.Time(this.state.duration).toBarsBeatsSixteenths();
        const noteInfo = {
            pitch: this._notesArray[rowClicked],
            time: xPosAsBBS,
            duration: durationAsBBS,
            velocity: 1,
            _id: generateId(),
            x: adjustedX,
            y: adjustedY,
            width: Tone.Time(durationAsBBS).toTicks() / 2
        };
        return noteInfo;
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
            //this.props.removeNote(this.section.id, pitch, time);
        } else {
            //this.setState({ currentlySelectedNotes: [] });
            if (!this.state.pencilActive) {
                let x = e.evt.layerX;
                let scrolledX = this.gridLayerRef.current.attrs.x || 0;
                let xWithScroll = x - scrolledX;
                let y = e.evt.layerY;
                let scrolledY = this.gridLayerRef.current.attrs.y || 0;
                let yWithScroll = y - scrolledY;
                let noteObject = this._calculateNoteInfo(xWithScroll, yWithScroll);
                if (this._isValidNote(noteObject)) {
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
    handleNoteClick = (e) => {
        e.cancelBubble = true;
        const { _id } = e.target.attrs;
        this.setState({
            currentlySelectedNotes: this.state.currentlySelectedNotes.includes(_id) ?
                                    [] :
                                    [ _id ]
        });
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
                pitch: this._notesArray[rowClicked],
                time: noteTime,
                duration: noteDurationAsBBS,
                velocity: 1,
                _id: generateId(),
                x: adjustedDownX,
                y: adjustedDownY,
                width: noteDurationAsTicks / 2 
            };
            if (this._isValidNote(noteObject)) {
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
        const leftBound = Math.min(horizontalBound1, horizontalBound2);
        const rightBound = Math.max(horizontalBound1, horizontalBound2);
        const topBound = Math.min(verticalBound1, verticalBound2);
        const bottomBound = Math.max(verticalBound1, verticalBound2);

        const selectedNotes = this.section.notes.filter(note => {
            const {x, y} = note;
            return (x >= leftBound && x <= rightBound && y >= topBound && y <= bottomBound);
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
     * Given a new note, noteToCheck, check this note against all other notes with the same pitch in this
     * section, if this note overlaps any of those notes then it is invalid and the function returns false,
     * if no such note is found then the new note is valid and the function returns true.
     * @param {Object} noteToCheck - the note object for the new note to check.
     * @returns {Boolean} - true if note is valid, false if note is invalid.
     */
    _isValidNote(noteToCheck) {
        const startOfNoteToCheck = Tone.Time(noteToCheck.time).toTicks();
        const endOfNoteToCheck = startOfNoteToCheck + Tone.Time(noteToCheck.duration).toTicks() - 1;
        for (let currentNote of this.section.notes) {
            if (noteToCheck.pitch === currentNote.pitch) {
                const startOfCurrentNote = Tone.Time(currentNote.time).toTicks();
                const endOfCurrentNote = startOfCurrentNote + Tone.Time(currentNote.duration).toTicks() - 1;
                if (
                    (startOfNoteToCheck >= startOfCurrentNote && startOfNoteToCheck <= endOfCurrentNote) ||
                    (endOfNoteToCheck >= startOfCurrentNote && endOfNoteToCheck <= endOfCurrentNote) ||
                    (startOfCurrentNote >= startOfNoteToCheck && startOfCurrentNote <= endOfNoteToCheck) ||
                    (endOfCurrentNote >= startOfNoteToCheck && endOfCurrentNote <= endOfNoteToCheck)
                ) {
                    // console.log(`
                    //     new note start: ${startOfNoteToCheck}
                    //     new note end: ${endOfNoteToCheck}
                    //     current note start: ${startOfCurrentNote}
                    //     current note end: ${endOfCurrentNote}
                    // `);
                    return false;
                }
            }
        }
        return true;
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
    _verticalDragMove(e) {
        // make necessary calculations
        const currentSliderPos = e.target.attrs.y - this.padding;
        const { stageHeight } = this.state;
        const totalSliderRange = stageHeight - this.padding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;

        const canvasHeight = 1728;
        const totalCanvasRange = canvasHeight - stageHeight + this.padding + 24 + 40;

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
    handlePianoKeyClick = (e, pitch) => {
        e.cancelBubble = true;
        window.instrumentReferences[this.section.channelId].triggerAttackRelease(pitch, '8n');
    }

    /**
     * Programmaticaly creates an array of objects representing the bar numbers that should appear in the 
     * transport area of the canvas, such that when the component renders it can simply map over the array
     * and create a <Text/> component from each object in the array. 
     * @returns {array} - array containing the bar number objects.
     */
    _createTransportBarNumbersArray = () => {
        let arr = [];
        const start = parseInt(this.section.start.split(':')[0]);
        for (let i = 0; i < this.section.numberOfBars; i++) {
            arr.push({
                barNumber: start + i,
                xPos: i * 384
            });
        }
        return arr;
    }

    /**
     * The main function for handling keyDown events on this component, delegates to other functions
     * as necessary.
     * @param {object} e - the event object
     */
    handleKeyDown = e => {
        console.log(e);
        console.log(e.key)
        // ArrowUp, ArrowDown, ArrowLeft, ArrowRight
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
                this.mutateSelection(this.state.currentlySelectedNotes, 'shiftPitchUp');
            }
        }

        if (e.key === 'ArrowDown') {
            if (this.state.currentlySelectedNotes.length) {
                this.mutateSelection(this.state.currentlySelectedNotes, 'shiftPitchDown');
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
     * Handles the deletion of notes.
     */
    handleDeletion = () => {
        if (this.state.currentlySelectedNotes) {
            for (let note_id of this.state.currentlySelectedNotes) {
                const noteObject = this.section.notes.find(el => el._id === note_id);
                this.props.removeNote(this.section.id, noteObject.pitch, noteObject.time);
            }
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
            }, () => console.log(this.state.currentlyCopiedNotes));
        }
    }

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
        if (this._isValidNote(newNoteObject)) {
            this.props.addNote(this.section.id, newNoteObject);
        }
    }

    /**
     * Contains the logic for dealing with a click on the velocity layer of the canvas. 
     * @param {object} e - the event object
     */
    handleVelocityLayerClick = (e) => {
        e.cancelBubble = true;
        // Get the x position of the users click, adjust for scrolling and 'roll it back' to the 
        // last multiple of 8.
        const { layerX, layerY } = e.evt;
        const scrolledX = this.velocityLayerRef.current.attrs.x || 0;
        const xWithScroll = layerX - scrolledX;
        const xPos = xWithScroll - (xWithScroll%8);
        
        
        // Filter out the notes to get only the notes that have this x value.
        const matchingNotes = this.section.notes.filter(note => note.x === xPos);
        // Determine if any of these notes are currently selected.
        const selectedMatchingNotes = matchingNotes.filter(note => (
            this.state.currentlySelectedNotes.includes(note._id)
        ));

        // now we derive the desired velocity from the y position of the click event
        // first account for layer offsetting
        const yAdjustedForLayer = layerY - (this.stageHeight - 134) - 10;
        // clicks further down the page result in a lower velocity but a higher y value,
        // we have to get the 'reflection' of our y value
        const yAsVelocity = 100 - yAdjustedForLayer;
        // Ensure it stays within our desired range of 0-100, then convert to normal range.
        const velocity = Math.min(Math.max(yAsVelocity, 0), 100) / 100;


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
                currentlySelectedNotes: this.swapSelectedNoteIds(
                    this.state.currentlySelectedNotes,
                    newNoteIds,
                    noteIdsToRemove
                )
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
     * Generate a new selection of notes with some or all of the old notes removed, and some
     * new notes added.
     * @param {array} selectedNotesState - the starting array of selected note ids
     * @param {array} newIds - ids to be added to the state
     * @param {array} oldIds - ids to be removed from the state
     * @returns {array} - the new array of selected note ids after all addition and removal has
     * been performed
     */
    swapSelectedNoteIds = (selectedNotesState, newIds, oldIds) => {
        return [
            ...selectedNotesState.filter(id => !oldIds.includes(id)),
            ...newIds
        ];
    }

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
                mutationMethod = this.shiftPitchUp;
                break;

            case 'shiftPitchDown':
                mutationMethod = this.shiftPitchDown;
                break;

            case 'shiftTimeBackwards':
                mutationMethod = this.shiftTimeBackwards(Tone.Ticks(this.state.quantize));
                break;

            case 'shiftTimeForwards':
                mutationMethod = this.shiftTimeForwards(Tone.Ticks(this.state.quantize));
                break;

            default:
                mutationMethod = this.shiftPitchUp;
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

    shiftPitchUp = (originalNote) => {
        const newY = originalNote.y - 16;
        const newPitch = this._notesArray[newY/16];
        return {
            ...originalNote, 
            y: newY,
            pitch: newPitch,
            _id: generateId()
        };
    }

    shiftPitchDown = (originalNote) => {
        const newY = originalNote.y + 16;
        const newPitch = this._notesArray[newY/16];
        return {
            ...originalNote, 
            y: newY,
            pitch: newPitch,
            _id: generateId()
        };
    }

    shiftTimeBackwards = (currentQuantizeAsTicks) => (originalNote) => {
        const oldTimeAsTicks = Tone.Ticks(originalNote.time);
        const newTime = Tone.Ticks(oldTimeAsTicks - currentQuantizeAsTicks).toBarsBeatsSixteenths();
        const newX = originalNote.x - (currentQuantizeAsTicks / 2);
        return {
            ...originalNote,
            x: newX,
            time: newTime,
            _id: generateId()
        };
    }

    shiftTimeForwards = (currentQuantizeAsTicks) => (originalNote) => {
        const oldTimeAsTicks = Tone.Ticks(originalNote.time);
        const newTime = Tone.Ticks(oldTimeAsTicks + currentQuantizeAsTicks).toBarsBeatsSixteenths();
        const newX = originalNote.x + (currentQuantizeAsTicks / 2);
        return {
            ...originalNote,
            x: newX,
            time: newTime,
            _id: generateId()
        };
    }

    render() {
        const gridLinesArray = this._createGridLinesArray();
        const { selectedNotes, unselectedNotes } = this.createVelocityArrays();
        return (
            <div 
                className="piano-roll-container" 
                tabIndex="0" 
                onKeyDown={this.handleKeyDown}
                style={{outline: 'none'}}
                ref={this.outerContainerRef}
            >
                <div className="piano-roll-controls-container">
                    <QuantizeSelect 
                        value={this.state.quantize} 
                        handleChange={this.updateQuantizeValue.bind(this)} 
                    />
                    <DurationSelect 
                        value={this.state.duration}
                        handleChange={this.updateDurationValue.bind(this)}
                    />
                    <CursorSelect 
                        value={this.state.pencilActive ? 'pencil' : 'pointer'}
                        handleChange={this.updateCursorValue.bind(this)}
                    />
                </div>
                <div className="canvas-container" id="piano-roll-canvas-container">
                    <Stage 
                        container={'piano-roll-canvas-container'}
                        ref={this.stageRef}
                        width={800} 
                        height={600} 
                        onClick={this.handleStageClick}
                        onMouseDown={this.handleMouseDown} 
                        onMouseUp={this.handleMouseUp}
                    >
                        <Layer 
                            x={48} 
                            y={40} 
                            ref={this.gridLayerRef} 
                        >
                            <Rect 
                                x={0}
                                y={0}
                                width={this.canvasWidth}
                                height={1728}
                                fill={'#201826'}
                            />
                            {
                                gridLinesArray.map((line, index) => (
                                    <Line 
                                        points={line.points}
                                        listening={false}
                                        stroke={'#d86597'}
                                        strokeWidth={line.strokeWidth}
                                        shadowColor={'#ed90b9'}
                                        shadowBlur={4}
                                        shadowOffsetX={0}
                                        shadowOffsetY={0}
                                        key={index}
                                    />
                                ))
                            }
                        </Layer>
                        <Layer
                            x={48}
                            y={40}
                            ref={this.noteLayerRef}
                        >
                        {
                            this.section.notes.map((note, index) => (
                                <Rect 
                                    x={note.x}
                                    y={note.y}
                                    width={note.width}
                                    height={16}
                                    stroke={'#d86597'}
                                    strokeWidth={2}
                                    fill={this.state.currentlySelectedNotes.includes(note._id) ? 
                                        '#222222' :
                                        '#ed90b9'
                                    }
                                    shadowColor={'#d86597'}
                                    shadowBlur={4}
                                    shadowOffsetX={0}
                                    shadowOffsetY={0}
                                    pitch={note.pitch}
                                    time={note.time}
                                    _id={note._id}
                                    type={'noteRect'}
                                    key={note._id}
                                    onClick={this.handleNoteClick}
                                    onMouseUp={e => e.cancelBubble = true}
                                />
                            ))
                        }
                        </Layer>
                        <Layer
                            x={48}
                            y={this.stageHeight - 134}
                            ref={this.velocityLayerRef}
                            onClick={this.handleVelocityLayerClick}
                            onMouseUp={e => e.cancelBubble = true}
                        >
                            <Line 
                                points={[0, 0, this.canvasWidth, 0]}
                                listening={false}
                                stroke={UIColors.pink}
                                strokeWidth={4}
                                shadowColor={UIColors.pink}
                                shadowBlur={4}
                                shadowOffsetX={0}
                                shadowOffsetY={0}
                            />
                            <Rect
                                x={0}
                                y={0}
                                height={110}
                                width={this.canvasWidth} 
                                fill={UIColors.deepPurple}
                            />
                            {unselectedNotes.map(note => (
                                <Rect 
                                    fill={UIColors.pink}
                                    width={8}
                                    height={note.velocity*100}
                                    x={note.x}
                                    y={110 - (note.velocity*100)}
                                    key={note._id}
                                />
                            ))}
                            {selectedNotes.map(note => (
                                <Rect 
                                    fill={UIColors.lightPurple}
                                    width={8}
                                    height={note.velocity*100}
                                    x={note.x}
                                    y={110 - (note.velocity*100)}
                                    key={note._id}
                                />
                            ))}
                        </Layer>
                        <Layer
                            y={40}
                            ref={this.pianoKeyLayerRef}
                        >
                            {this._notesArray.map((note, index) => (
                                <Rect 
                                    x={0}
                                    y={index * 16}
                                    width={48}
                                    height={16}
                                    stroke={'#201826'}
                                    strokeWidth={2}
                                    fill={note.includes('#') ? '#47426c' : '#e0e0e0'} 
                                    key={index} 
                                    pitch={note}
                                    type={'pianoKeyRect'}
                                    onClick={e => this.handlePianoKeyClick(e, note)}
                                />
                            ))}
                        </Layer>
                        <Layer
                            x={48}
                            ref={this.transportLayerRef}
                        >
                            <Rect 
                                x={-48}
                                y={0}
                                width={this.canvasWidth+52}
                                height={40}
                                fill={'#201826'}
                            />
                            {this._transportBarNumbersArray.map((barObject, index) =>(
                                <Text 
                                    text={barObject.barNumber}
                                    x={barObject.xPos}
                                    y={20}
                                    key={index}
                                    fill={'#e0e0e0'}
                                    shadowColor={'#e0e0e0'}
                                    shadowBlur={4}
                                    shadowOffsetX={0}
                                    shadowOffsetY={0}
                                />
                            ))}
                        </Layer>
                        <Layer
                            x={48}
                            ref={this.seekerLayerRef}
                        >
                            <Line
                                ref={this.seekerLineRef}
                                points={[0, 0, 0, this.canvasHeight]}
                                listening={false}
                                stroke={'#e0e0e0'}
                                strokeWidth={0}
                            />
                        </Layer>
                        <Layer>
                            <Rect 
                                x={0}
                                y={this.state.stageHeight - 24}
                                width={this.state.stageWidth}
                                height={24}
                                fill={'#47426c'}
                                shadowColor={'#47426c'}
                                shadowBlur={4}
                                shadowOffsetX={0}
                                shadowOffsetY={0}
                            />
                            <Rect 
                                width={100}
                                height={14}
                                fill={'#d86597'}
                                x={this.padding}
                                y={this.state.stageHeight - 19}
                                draggable={true}
                                type={'scrollRect'}
                                dragBoundFunc={(pos) => {
                                    const currX = pos.x;
                                    const highBound = this.state.stageWidth - 24 - 100;
                                    pos.x = Math.min(Math.max(currX, this.padding), highBound);
                                    pos.y = this.state.stageHeight - 19;
                                    return pos;
                                }}
                                onDragMove={this.horizontalDragMove}
                                onMouseDown={this.handleScrollBarClickEvents}
                                onClick={this.handleScrollBarClickEvents}
                            />
                            <Rect 
                                x={this.state.stageWidth - 24}
                                y={0}
                                width={24}
                                height={this.state.stageHeight}
                                fill={'#47426c'}
                                shadowColor={'#47426c'}
                                shadowBlur={4}
                                shadowOffsetX={0}
                                shadowOffsetY={0}
                            />
                            <Rect 
                                width={14}
                                height={100}
                                fill={'#d86597'}
                                y={this.padding}
                                x={this.state.stageWidth - 19}
                                draggable={true}
                                type={'scrollRect'}
                                dragBoundFunc={(pos) => {
                                    const currY = pos.y;
                                    const highBound = this.state.stageHeight - 24 - 100;
                                    pos.y = Math.min(Math.max(currY, this.padding), highBound);
                                    pos.x = this.state.stageWidth - 19;
                                    return pos;
                                }}
                                onDragMove={this.verticalDragMove}
                                onMouseDown={this.handleScrollBarClickEvents}
                                onClick={this.handleScrollBarClickEvents}
                            />
                        </Layer>
                    </Stage>
                </div>
            </div>
        );
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
)(PianoRoll);




/*

improvements to be made to piano roll


no particular order




||DONE|| 1. Bug when using pencil tool needs to be fixed. It sometimes isn't letting notes be
added that should be valid, most likely an error in the note validation steps. 


The source of this bug is the fact that note durations are being stored as notation, ie '8n', '8n.' etc.
Certain note lengths, such as notes lasting for 10 16th notes can't be expressed properly by this system,
and in the case of a note lasting for 10 16th notes, it would be expressed as '2n.', which is actually equal
to 12 16th notes. 

To solve this, instead of storing the note durations as notation, I will store them as BBS, which allows for 
necessary levels of precision. They could be stored as Ticks, however BBS is a bit less abstract and easier 
to reason about.

Places that this will impact:

Note creation - both in the handleClick and handleMouseUp methods, will have to be updated to use BBS for the
note durations. 

The isValidNote method will possibly have to be updated to handle the note durations being in BBS.





||DONE|| 2. Scrollbars need to be updated to match the looks and functionality of the composer
scrollbars. 





||DONE|| 3. Add a piano to the left of the piano roll, such that the user can click a key
on the piano to sample that note. In order for the piano roll component to directly
trigger a note on the instrument rather than having to go through redux and the
audio engine, store a global variable on the window that is a dictionary where each
key is the id of an instrument in use, and the corresponding value is a reference
to instrument in memory. That way the piano roll can just grab the reference and 
set a triggerAttackRelease on demand, since the piano roll knows its instrument id. 
On second thoughts, does it? If the piano roll only knows the channel id, maybe use
the channel ids for the dictionary and add a getter method to the channel that lets
the piano roll access the current instrument for that channel.



drawing the piano

draw a series of Rects along the left hand side 

Rects will be 48px wide, 16px tall

Each rect will be assigned a note from the notes array, as well  as a type attr
of 'pianoKeyRect'

If the note is a sharp note, give the piano key a dark color, otherwise it gets a
light color. To work this out - noteString.includes('#') 

For now, just add an onClick to each key that logs its notes


Handling the triggering of notes...

In the AudioEngine component, on intialization, create a global object on the window, called 
instrumentReferences. This will be a dictionary, where each key is the id for a channel/track in the
project, and the corresponding value is a reference to that channels current instrument in memory. This
means that whenever the instrument for a particular channel gets replaced (but not when its settings are
updated), the AudioEngine will have to also update this global object, but that's okay. 

So now, whenever the piano roll component needs to trigger a note on its instrument, it can just access
window.instrumentReferences[this.section.channelId], which will provide a direct reference to the instrument
in memory, and the piano roll component can then call the triggerAttackRelease method on that instrument. 




||DONE|| 4. Fix weird behaviours arising when the scrollbars are used whilst the pencil tool 
is active - the mouseup event is still firing which causes a note to be drawn when
it shouldn't be. 

Perhaps have a scrollBarActive boolean value in state. When a mouseDown event occurs on a scrollBar 
we set this value to true, and for any other mouse event we set it to false. In our mouseup event handler, 
before we actually do anything we check that thie scrollBarActive value is false. If it's true, we don't do
anything besides setting it to true. This means that the mouseUp event immediately following a mouseDown 
event occuring on a scrollBar will not be subject to the usual handleMouseUp method, but all other mouseUp 
events will be. 



||DONE|| 5. Modify the behaviour of the pencil tool - if the distance between mousedown and
mouseup doesn't meet some minimum note duration requirement, say a 32nd note, we'll 
just create a 32nd note automatically.





||DONE|| 6. When you click on a pre-existing note it doesn't automatically delete it, it 
just highlights it. You can delete it with a dedicated delete button, or a keyboard
shortcut. You can also copy it to be pasted later.

Keep a currentlySelectedNote value in state. When you click on a note, it takes the note object
and copies it to the currentlySelectedNote value in state, or should it just take the note id?




7. When a note (or multiple notes, see next point) is/are selected, pressing the up
arrow will move the note up be a semitone, down arrow down by a semitone. The right
arrow will move the note along to the next step it can occupy according to the 
current quantize/snap, the left key will move it back to the previous one.  





||Partially done - haven't set up the ctrl key shortcut||
8. Multi-select of notes - either hold down the control key while selecting, or,
with the pointer tool, click and drag along the canvas to select all notes that 
fall within the area that you specified. 


We can use the coordinates of the mouseDown event and the following mouseUp event to get the four corners
of our selection rectangle. 

Then, using the y coords of the top and bottom edges, we can determine what pitch the selection starts and
stops at. This allows us to filter out the notes to just get the ones that reside within the 'pitch range'
of our selection. 

Then we can look at the left and right edges of our selection to get the start and stop times for the
selection. We can then filter the notes again, only keeping the ones that reside, at least partially,
within the time range described by the start and finish times of our selection.








||DONE|| 9. Copy pasting will be linked to where you are on currently on the transport
timeline. Will have to manually ensure that the current spot on the timeline 
is within the current section, and if not then prevent the user from pasting, to
avoid weirdness. 

Copy - grab the currentlySelectedNote from state, which is a note _id, and then grab the actual
corresponding note object from this.section.notes. Take this note object, and save it in the
currentlyCopiedNote value in state. 

Copy is done for now, but only supports single note copying currently. 

Pasting: 

Grab current transport time, round it down to the nearest whole interval according to the current
level of quantisation. We also need to check that the transport time is within the currently active
section, and if it isn't we don't allow pasting to occur. Assuming it is, we construct a new note object 
like so:

const noteInfo = {
    pitch: pitch from original note object
    time: the time we just calculated,
    duration: duration from original note,
    _id: a newly generated id,
    x: a newly calculate x, based off of the new time,
    y: the y from the original not object,
    width: the width from the original note object
};

Then we just call this.props.addNote with the new note object.


All copy and pasting work complete.



||DONE|| 10. Add a transport section to the top of the piano roll canvas - similar in
appearance and functionality to the one in the composer component. If performance
permits, add a seeker line as well that shows where abouts the track is within the 
section. 

























11. Implement note velocity - have a section at the bottom of the canvas where users 
can pull a notes velocity up/down.


Thoughts on note velocity


Will need to be its own layerat the bottom of the canvas. In front of the grid and notes layers,
but behind the piano keys and scroll bar layers. 

Every note in the section will get a vertical bar in the velocity sectino at the same x coord as that note, 
the height of the bar will correspond to the velocity of the note. 

You can only change the velocity of the note if the note is selected. 

When we render the velocity bars for the notes, they will each be one of two colors, a lighter color if the
corresponding note is not currently selected, and a darker color if it is. So in effect the only velocity bars
that will be editable on any given render are the ones with the darker colors. 


Details for implementing the interaction with the velocity bars go here...

The velocity bars will be clickable, rather than draggable. Each velocity bar will be 12px wide - the width
of a 32nd note in the piano roll. Clicking anywhere within the 12px vertical slice belonging to that velocity
bar will update the value of that velocity bar according to the vertical position that you clicked at.

To render the velocity bars, we will take the array of notes and split it into two arrays, one containing
all non selected notes and the other containing all of the selected notes. We will map over the array of non
selected notes and render a Rect for each one, using the lighter, non selected color for their fills. Then
we will map over the array of selected notes and render a Rect for each one of those, using the darker selected
color for their fills. Rendering in this order ensures that any selected Rects will always visually be in
front of any non selected Rects occupying the horizontal position. 

When user clicks in the velocity section, we check if their are any notes that correspond to the horizontal
position they clicked at. If there is only one note, we just change the velocity of that one note to correspond
with the vertical point at which they clicked. 

However, if there are multiple notes, we check if any of those notes are selected. If none of them are selected,
then we just update them all to the new velocity. If one or more of them are selected, then we update all selected
notes to the new velocity, but we leave the non selected ones as they were. 

Note that when the piano roll is 'changing' the velocity of a note, it's really calling removeNote() to get rid
of the previous note and then calling addNote() to add a new copy of that note with the updated velocity. 




Details for dealing with any implications the addition of note velocity will have on other aspects of 
the component go here...

Will have to update the audio engine to also include the given velocity in its triggerAttackRelease calls. 
The diffing algorithm doesn't need to care about this because it works off of notes ids anyway. 

In the piano roll component, whenever we create a brand new note, we just pass in the default velocity, which
is 1. If we copy and then paste a note, we need to honour the velocity of the original note when we paste the
new note into the piano roll. 



















||PARTIALLY DONE|| 12. Neaten up the piano roll component in general. It's probably a good idea to do
this before moving onto the more advanced features in this list. 










*/