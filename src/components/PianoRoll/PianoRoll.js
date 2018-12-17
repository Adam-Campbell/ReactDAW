import React from 'react';
import { Stage } from 'react-konva';
import PropTypes from 'prop-types';
import PianoRollControls from './PianoRollControls'; 
import GridLayer from './GridLayer';
import NoteLayer from './NoteLayer';
import VelocityLayer from './VelocityLayer';
import PianoKeyLayer from './PianoKeyLayer';
import TransportLayer from './TransportLayer';
import SeekerLayer from './SeekerLayer';
import ScrollBarLayer from './ScrollBarLayer';

const PianoRoll = props => (
    <div 
        className="piano-roll-container" 
        tabIndex="0" 
        onKeyDown={props.handleKeyDown}
        style={{outline: 'none'}}
        ref={props.outerContainerRef}
    >
        <PianoRollControls 
            quantizeValue={props.quantizeValue}
            updateQuantizeValue={props.updateQuantizeValue}
            durationValue={props.durationValue}
            updateDurationValue={props.updateDurationValue}
            cursorValue={props.cursorValue}
            updateCursorValue={props.updateCursorValue}
        />
        <div className="canvas-container" id="piano-roll-canvas-container">
            <Stage 
                container={'piano-roll-canvas-container'}
                ref={props.stageRef}
                width={800} 
                height={600} 
                onClick={props.handleStageClick}
                onMouseDown={props.handleMouseDown} 
                onMouseUp={props.handleMouseUp}
            >
                <GridLayer 
                    gridLayerRef={props.gridLayerRef}
                    canvasWidth={props.canvasWidth}
                    gridLinesArray={props.gridLinesArray}
                />
                <NoteLayer 
                    noteLayerRef={props.noteLayerRef}
                    section={props.section}
                    currentlySelectedNotes={props.currentlySelectedNotes}
                    handleNoteClick={props.handleNoteClick}
                />
                <VelocityLayer 
                    stageHeight={props.stageHeight}
                    velocityLayerRef={props.velocityLayerRef}
                    handleVelocityLayerClick={props.handleVelocityLayerClick}
                    canvasWidth={props.canvasWidth}
                    unselectedNotes={props.unselectedNotes}
                    selectedNotes={props.selectedNotes}
                />
                <PianoKeyLayer 
                    pianoKeyLayerRef={props.pianoKeyLayerRef}
                    pitchesArray={props.pitchesArray}
                    handlePianoKeyClick={props.handlePianoKeyClick}
                />
                <TransportLayer 
                    transportLayerRef={props.transportLayerRef}
                    canvasWidth={props.canvasWidth}
                    transportBarNumbersArray={props.transportBarNumbersArray}
                />
                <SeekerLayer 
                    seekerLayerRef={props.seekerLayerRef}
                    seekerLineRef={props.seekerLineRef}
                    canvasHeight={props.canvasHeight}
                />
                <ScrollBarLayer 
                    stageHeight={props.stageHeight}
                    stageWidth={props.stageWidth}
                    padding={props.padding}
                    horizontalDragMove={props.horizontalDragMove}
                    verticalDragMove={props.verticalDragMove}
                    handleScrollBarClickEvents={props.handleScrollBarClickEvents}
                />
            </Stage>
        </div>
    </div>  
);

PianoRoll.propTypes = {
    // React refs
    outerContainerRef: PropTypes.object.isRequired,
    stageRef: PropTypes.object.isRequired,
    gridLayerRef: PropTypes.object.isRequired,
    noteLayerRef: PropTypes.object.isRequired,
    velocityLayerRef: PropTypes.object.isRequired,
    pianoKeyLayerRef: PropTypes.object.isRequired,
    transportLayerRef: PropTypes.object.isRequired,
    seekerLayerRef: PropTypes.object.isRequired,
    seekerLineRef: PropTypes.object.isRequired,
    // canvas figures
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    stageHeight: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    // constructed arrays
    gridLinesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    unselectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    pitchesArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    transportBarNumbersArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    // input values
    quantizeValue: PropTypes.string.isRequired,
    durationValue: PropTypes.string.isRequired,
    cursorValue: PropTypes.string.isRequired,
    // callback functions
    handleKeyDown: PropTypes.func.isRequired,
    updateQuantizeValue: PropTypes.func.isRequired,
    updateDurationValue: PropTypes.func.isRequired,
    updateCursorValue: PropTypes.func.isRequired,
    handleStageClick: PropTypes.func.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    handleNoteClick: PropTypes.func.isRequired,
    handleVelocityLayerClick: PropTypes.func.isRequired,
    handlePianoKeyClick: PropTypes.func.isRequired,
    horizontalDragMove: PropTypes.func.isRequired,
    verticalDragMove: PropTypes.func.isRequired,
    handleScrollBarClickEvents: PropTypes.func.isRequired,
    // reference to the section object from redux store
    section: PropTypes.object.isRequired  
};

export default PianoRoll;

/*
Props
handleKeyDown = callback function
outerContainerRef - react ref
quantizeValue - quantize value from state
updateQuantizeValue - callback
durationValue - duration value from state
updateDurationValue - callback
cursorValue - cursor value, either 'pointer' or 'pencil'
updateCursorValue - callback
stageRef - react ref
handleStageClick - callback
handleMouseDown - callback
handleMouseUp - callback
gridLayerRef - react ref
canvasWidth - num, width of canvas
canvasHeight - num, height of canvas
gridLinesArray - array of data objects for grid line rendering
noteLayerRef - react ref
section - reference to the section object from redux store
currentlySelectedNotes - currentlySelectedNotes from state
handleNoteClick - callback
stageHeight - num, the height of the stage (visible area of canvas)
stageWidth - num, the width of the stage (visible area of canvas)
velocityLayerRef - react ref
handleVelocityLayerClick - callback
selectedNotes - array of data objects representing the currently selected notes
unselectedNotes - array of data object representing the currently unselected notes
pianoKeyLayerRef - react ref
notesArray - array of strings representing the range of pitches available for notes
handlePianoKeyClick - callback
transportLayerRef - react ref
transportBarNumbersArray - array of data objects for rendering the transport bar numbers programatically
seekerLayerRef - react ref
seekerLineRef - react ref
padding - num, the padding value for this component
horizontalDragMove - callback
verticalDragMove - callback
handleScrollBarClickEvents - callback

*/