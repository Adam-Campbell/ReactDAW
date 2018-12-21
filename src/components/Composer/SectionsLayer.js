import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Line } from 'react-konva';
import { UIColors } from '../../constants';

const SectionsLayer = props => (
    <Layer ref={props.sectionsLayerRef}>
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
    </Layer>
);

SectionsLayer.propTypes = {
    sectionsLayerRef: PropTypes.object.isRequired,
    sectionRectsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSectionClick: PropTypes.func.isRequired,
    handleSectionDoubleClick: PropTypes.func.isRequired
};

export default SectionsLayer;