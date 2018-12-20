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
            fill={'#47426c'}
            shadowColor={'#47426c'}
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={0}
        />
        <Rect 
            x={721}
            y={10}
            width={14}
            height={100}
            fill={'#d86597'}
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
            fill={'#47426c'}
            shadowColor={'#47426c'}
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={0}
        />
        <Rect 
            x={10}
            y={281}
            width={100}
            height={14}
            fill={'#d86597'}
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

export default ScrollBarLayer;