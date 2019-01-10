import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect } from 'react-konva';
import { UIColors } from '../../constants';

const SectionsLayer = props => {
    const clickTargetHeight = Math.max(document.documentElement.clientHeight, props.canvasHeight);
    return (
        <Layer 
            ref={props.sectionsLayerRef}
            onMouseDown={props.handleMouseDown}
            onMouseUp={props.handleMouseUp}
            onMouseMove={props.handleMouseMove}    
        >
            <Rect 
                width={props.canvasWidth}
                height={clickTargetHeight}
                x={0}
                y={0}
            />
            {
                props.sectionRectsArray.map((section, index) => (
                    <Rect 
                        x={section.x}
                        y={section.y}
                        sectionId={section.sectionId}
                        height={section.height}
                        width={section.width}
                        fill={
                            props.currentlySelectedSections.includes(section.sectionId) ? 
                            UIColors.darkGrey :
                            section.color
                        }
                        stroke={UIColors.offWhite}
                        strokeWidth={2}
                        type={'section'}
                        key={index}
                        onClick={(e) => props.handleSectionClick(e, section.sectionId)}
                        onDblClick={(e) => props.handleSectionDoubleClick(e, section.sectionId)}
                    />
                ))
            } 
            <Rect 
                ref={props.overlayRectRef}
                fill="#08b5d3"
                opacity={0.4}
                cornerRadius={3}
            />
        </Layer>
    );
}

SectionsLayer.propTypes = {
    sectionsLayerRef: PropTypes.object.isRequired,
    sectionRectsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSectionClick: PropTypes.func.isRequired,
    handleSectionDoubleClick: PropTypes.func.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    handleMouseUp: PropTypes.func.isRequired,
    handleMouseMove: PropTypes.func.isRequired,
    overlayRectRef: PropTypes.object.isRequired
};

export default SectionsLayer;