import React, { Component } from 'react';
import { Layer, Rect } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';
import { addOrRemoveElementFromSelection } from '../../sharedUtils';
    

class NoteLayer extends Component {

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
        this.props.updateCurrentlySelectedNotes(
            addOrRemoveElementFromSelection({
                currentSelectionState: this.props.currentlySelectedNotes,
                element: note_id,
                shouldPreserveSelection: e.evt.ctrlKey
            })
        );
    }

    render() {
        return (
            <Layer
                x={48}
                y={40}
                ref={this.props.noteLayerRef}
                onMouseDown={this.props.handleMouseDown}
                onMouseUp={this.props.handleMouseUp}
                onMouseMove={this.props.handleMouseMove}
            >
                <Rect 
                    width={this.props.canvasWidth}
                    height={this.props.canvasHeight}
                    x={0}
                    y={0}
                />
                {this.props.sectionNotes.map((note, index) => (
                    <Rect 
                        x={note.x}
                        y={note.y}
                        width={note.width}
                        height={16}
                        stroke={UIColors.pink}
                        strokeWidth={2}
                        fill={this.props.currentlySelectedNotes.includes(note._id) ? 
                            UIColors.darkGrey :
                            '#ed90b9'
                        }
                        shadowColor={UIColors.pink}
                        shadowBlur={4}
                        shadowOffsetX={0}
                        shadowOffsetY={0}
                        pitch={note.pitch}
                        time={note.time}
                        _id={note._id}
                        type={'noteRect'}
                        key={note._id}
                        onClick={this.handleNoteClick}
                    />
                ))}
                <Rect 
                    ref={this.props.overlayRectRef}
                    fill="#08b5d3"
                    opacity={0.4}
                    cornerRadius={3}
                />
            </Layer>
        );
    }
}

NoteLayer.propTypes = {
    noteLayerRef: PropTypes.object.isRequired,
    sectionNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    overlayRectRef: PropTypes.object.isRequired,
    updateCurrentlySelectedNotes: PropTypes.func.isRequired
};

export default NoteLayer;