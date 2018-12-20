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
                        section.sectionId === props.currentlySelectedSection ? 
                        '#222222' :
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

export default SectionsLayer;