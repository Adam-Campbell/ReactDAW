import React from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect } from 'react-konva';
import { UIColors } from '../../constants';

const ScrollBarLayer = props => (
    <Layer>
        <Rect 
            x={716}
            y={0}
            width={24}
            height={300}
            fill={UIColors.lightPurple}
            shadowColor={UIColors.lightPurple}
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={0}
        />
        <Rect 
            x={721}
            y={10}
            width={14}
            height={100}
            fill={UIColors.pink}
            draggable={true}
            dragBoundFunc={(pos) => {
                const currY = pos.y;
                // total stage height minus height of horizontal scroll bar
                // minus height of scroll slider
                const highBound = props.stageHeight - 24 - 100;
                pos.y = Math.min(Math.max(props.scrollPadding, currY), highBound);
                pos.x = 721;
                return pos;
            }}
            onDragMove={props.verticalDragMove}
        />
        <Rect 
            x={0}
            y={276}
            width={740}
            height={24}
            fill={UIColors.lightPurple}
            shadowColor={UIColors.lightPurple}
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={0}
        />
        <Rect 
            x={10}
            y={281}
            width={100}
            height={14}
            fill={UIColors.pink}
            draggable={true}
            dragBoundFunc={(pos) => {
                const currX = pos.x;
                const highBound = props.stageWidth - 24 - 100;
                pos.x = Math.min(Math.max(currX, props.scrollPadding), highBound);
                pos.y = 281;
                return pos;
            }}
            onDragMove={props.horizontalDragMove}
        />
    </Layer>
);

ScrollBarLayer.propTypes = {
    stageHeight: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
    scrollPadding: PropTypes.number.isRequired,
    verticalDragMove: PropTypes.func.isRequired,
    horizontalDragMove: PropTypes.func.isRequired
};

export default ScrollBarLayer;