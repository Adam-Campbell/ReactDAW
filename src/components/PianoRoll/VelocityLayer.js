import React, { Component } from 'react';
import { Layer, Rect, Line } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';
import { 
    adjustForScroll, 
    adjustForTranslate,
    generateId 
} from '../../sharedUtils';
import { swapSelectedNoteIds } from './PianoRollUtils';

class VelocityLayer extends Component {

    /**
     * Contains the logic for dealing with a click on the velocity layer of the canvas. 
     * @param {object} e - the event object
     */
    handleVelocityLayerClick = (e) => {
        e.cancelBubble = true;
        const shiftKeyPressed = e.evt.shiftKey;
        // Get the x position of the users click, adjust for scrolling and 'roll it back' to the 
        // last multiple of 8.
        const {
            xPosWithTranslate,
            yPosWithTranslate
        } = adjustForTranslate({
            xPos: e.evt.layerX,
            yPos: e.evt.layerY,
            translateString: this.props.containerRef.current.style.transform
        });
        const xPosWithScrollAndTranslate = adjustForScroll({ 
            raw: xPosWithTranslate, 
            scroll: this.props.velocityLayerRef.current.attrs.x 
        });
        const xPosRolledBack = xPosWithScrollAndTranslate - (xPosWithScrollAndTranslate%8);
        
        // Filter out the notes to get only the notes that have this x value.
        const matchingNotes = this.props.section.notes.filter(note => note.x === xPosRolledBack);
        // Determine if any of these notes are currently selected.
        const selectedMatchingNotes = matchingNotes.filter(note => (
            this.props.currentlySelectedNotes.includes(note._id)
        ));

        const velocity = shiftKeyPressed ? 1 : this.calculateVelocity(yPosWithTranslate);

        // If any of the notes are selected, use the y position of the click to determine the new velocity
        // for those notes.
        if (selectedMatchingNotes.length) {
            this.adjustSelectedMatchingNotesVelocity(selectedMatchingNotes, velocity);
        // If none of the notes are selected, use the y position of the click to determine the new velocity
        // for all of the notes at this x position. 
        } else if (matchingNotes.length) {
            this.adjustMatchingNotesVelocity(matchingNotes, velocity)
        }
    };

    /**
     * Calculates a velocity values based off of the y position of a click.
     * @param {Number} yPos - the y position to calculate the velocity value from.
     * @returns {Number} - a velocity value from 0 to 1.
     */
    calculateVelocity = (yPos) => {
        // now we derive the desired velocity from the y position of the click event
        // first account for layer offsetting
        const yAdjustedForLayer = yPos - (this.props.stageHeight - 134) - 10;
        // clicks further down the page result in a lower velocity but a higher y value,
        // we have to get the 'reflection' of our y value
        const yAsVelocity = 100 - yAdjustedForLayer;
        // Ensure it stays within our desired range of 0-100, then convert to normal range.
        return Math.min(Math.max(yAsVelocity, 0), 100) / 100;
    }

    /**
     * Adjusts the velocity for notes that match the location clicked and are also part of the
     * current selection.
     * @param {Array} selectedMatchingNotes - an array of objects containing the data for the currently
     * selected matching notes.
     * @param {Number} velocity - the velocity value to update the notes to.
     */
    adjustSelectedMatchingNotesVelocity = (selectedMatchingNotes, velocity) => {
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
        this.props.addNotes(this.props.section.id, noteObjectsToAdd);
        this.props.removeNotes(this.props.section.id, noteIdsToRemove);
        this.props.updateCurrentlySelectedNotes(
            swapSelectedNoteIds({
                selectedNotesState: this.props.currentlySelectedNotes,
                newNoteIds: newNoteIds,
                oldNoteIds: noteIdsToRemove
            })
        );
    }

    /**
     * Adjusts the velocity for notes that match the location clicked but are not part of the current
     * selection.
     * @param {Array} matchingNotes - an array of objects containing the data for the matching notes.
     * @param {Number} velcity - the velocity value to update the notes to.
     */
    adjustMatchingNotesVelocity = (matchingNotes, velocity) => {
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
            this.props.addNotes(this.props.section.id, noteObjectsToAdd);
            this.props.removeNotes(this.props.section.id, noteIdsToRemove);
    }

    render() {
        return (
            <Layer
                x={48}
                y={this.props.stageHeight - 134}
                ref={this.props.velocityLayerRef}
                onClick={this.handleVelocityLayerClick}
                onMouseDown={e => e.cancelBubble = true}
                onMouseUp={e => e.cancelBubble = true}
            >
                <Line 
                    points={[0, 0, this.props.canvasWidth, 0]}
                    listening={false}
                    stroke={UIColors.main}
                    strokeWidth={4}
                    shadowColor={UIColors.main}
                    shadowBlur={4}
                    shadowOffsetX={0}
                    shadowOffsetY={0}
                />
                <Rect
                    x={0}
                    y={0}
                    height={110}
                    width={this.props.canvasWidth} 
                    fill={UIColors.backgroundDark}
                />
                {this.props.unselectedNotes.map(note => (
                    <Rect 
                        fill={UIColors.main}
                        width={8}
                        height={note.velocity*100}
                        x={note.x}
                        y={110 - (note.velocity*100)}
                        key={note._id}
                    />
                ))}
                {this.props.selectedNotes.map(note => (
                    <Rect 
                        fill={UIColors.backgroundMedium}
                        width={8}
                        height={note.velocity*100}
                        x={note.x}
                        y={110 - (note.velocity*100)}
                        key={note._id}
                    />
                ))}
            </Layer>
        );
    }
}

VelocityLayer.propTypes = {
    stageHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    velocityLayerRef: PropTypes.object.isRequired,
    unselectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    addNotes: PropTypes.func.isRequired,
    removeNotes: PropTypes.func.isRequired,
    containerRef: PropTypes.object.isRequired,
    currentlySelectedNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateCurrentlySelectedNotes: PropTypes.func.isRequired,
    section: PropTypes.object.isRequired
};

export default VelocityLayer;