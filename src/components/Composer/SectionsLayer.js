import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect } from 'react-konva';
import { UIColors } from '../../constants';
import { addOrRemoveElementFromSelection } from '../../sharedUtils';

class SectionsLayer extends Component {


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
        this.props.updateCurrentlySelectedSections(
            addOrRemoveElementFromSelection({
                currentSelectionState: this.props.currentlySelectedSections,
                element: sectionId,
                shouldPreserveSelection: e.evt.ctrlKey
            })
        )
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
        this.props.updateCurrentlySelectedSections([]);
        this.props.openWindow(sectionId, 'section');
    }

    render() {
        const clickTargetHeight = Math.max(document.documentElement.clientHeight, this.props.canvasHeight);
        return (
            <Layer 
                ref={this.props.sectionsLayerRef}
                onMouseDown={this.props.handleMouseDown}
                onMouseUp={this.props.handleMouseUp}
                onMouseMove={this.props.handleMouseMove}    
            >
                <Rect 
                    width={this.props.canvasWidth}
                    height={clickTargetHeight}
                    x={0}
                    y={0}
                />
                {
                    this.props.sectionRectsArray.map((section, index) => (
                        <Rect 
                            x={section.x}
                            y={section.y}
                            sectionId={section.sectionId}
                            height={section.height}
                            width={section.width}
                            fill={
                                this.props.currentlySelectedSections.includes(section.sectionId) ? 
                                UIColors.backgroundMedium :
                                section.color
                            }
                            stroke={UIColors.offWhite}
                            strokeWidth={2}
                            type={'section'}
                            key={index}
                            onClick={(e) => this.handleSectionClick(e, section.sectionId)}
                            onDblClick={(e) => this.handleSectionDoubleClick(e, section.sectionId)}
                        />
                    ))
                } 
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

SectionsLayer.propTypes = {
    sectionsLayerRef: PropTypes.object.isRequired,
    sectionRectsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateCurrentlySelectedSections: PropTypes.func.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    overlayRectRef: PropTypes.object.isRequired
};

export default SectionsLayer;