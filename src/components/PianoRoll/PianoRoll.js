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
import SelectionOverlayEnhancer from '../SelectionOverlayEnhancer'

const PianoRoll = props => (
    <div 
        className="piano-roll__container" 
        tabIndex="-1" 
        onKeyDown={props.handleKeyDown}
        style={{outline: 'none'}}
        ref={props.outerContainerRef}
    >
        <div className="piano-roll__canvas-container" id="piano-roll-canvas-container">
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
                
                <SelectionOverlayEnhancer
                    childLayerRef={props.noteLayerRef}
                    selectionToolActive={props.selectionToolActive}
                    noteLayerRef={props.noteLayerRef}
                    sectionNotes={props.section.notes}
                    currentlySelectedNotes={props.currentlySelectedNotes}
                    canvasWidth={props.canvasWidth}
                    canvasHeight={props.canvasHeight}
                    containerRef={props.containerRef}
                    requiresTranslateAdjustment={true}
                    updateCurrentlySelectedNotes={props.updateCurrentlySelectedNotes}
                >
                    {props => <NoteLayer {...props} />}
                </SelectionOverlayEnhancer>
                <VelocityLayer 
                    stageHeight={props.stageHeight}
                    velocityLayerRef={props.velocityLayerRef}
                    canvasWidth={props.canvasWidth}
                    unselectedNotes={props.unselectedNotes}
                    selectedNotes={props.selectedNotes}
                    addNotes={props.addNotes}
                    removeNotes={props.removeNotes}
                    containerRef={props.containerRef}
                    currentlySelectedNotes={props.currentlySelectedNotes}
                    updateCurrentlySelectedNotes={props.updateCurrentlySelectedNotes}
                    section={props.section}
                />
                <PianoKeyLayer 
                    pianoKeyLayerRef={props.pianoKeyLayerRef}
                    pitchesArray={props.pitchesArray}
                    channelId={props.section.channelId}
                />
                <TransportLayer 
                    transportLayerRef={props.transportLayerRef}
                    canvasWidth={props.canvasWidth}
                    transportBarNumbersArray={props.transportBarNumbersArray}
                    seekerLineRef={props.seekerLineRef}
                    seekerLayerRef={props.seekerLayerRef}
                    snap={props.snap}
                    sectionStart={props.section.start}
                    containerRef={props.containerRef}
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
                    canvasWidth={props.canvasWidth}
                    enterScrollBarActiveState={props.enterScrollBarActiveState}
                    gridLayerRef={props.gridLayerRef}
                    noteLayerRef={props.noteLayerRef}
                    transportLayerRef={props.transportLayerRef}
                    seekerLayerRef={props.seekerLayerRef}
                    velocityLayerRef={props.velocityLayerRef}
                    stageRef={props.stageRef}
                    pianoKeyLayerRef={props.pianoKeyLayerRef}
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
    containerRef: PropTypes.object.isRequired,
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
    
    selectionToolActive: PropTypes.bool.isRequired,

    // callback functions
    handleKeyDown: PropTypes.func.isRequired,
    handleStageClick: PropTypes.func.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    enterScrollBarActiveState: PropTypes.func.isRequired,
    addNotes: PropTypes.func.isRequired,
    removeNotes: PropTypes.func.isRequired,
    updateCurrentlySelectedNotes: PropTypes.func.isRequired,
    // reference to the section object from redux store
    section: PropTypes.object.isRequired,
    snap: PropTypes.string.isRequired,

};

export default PianoRoll;
