import React from 'react';
import { Layer, Rect } from 'react-konva';

const ScrollBarLayer = props => (
    <Layer>
        <Rect 
            x={0}
            y={props.stageHeight - 24}
            width={props.stageWidth}
            height={24}
            fill={'#47426c'}
            shadowColor={'#47426c'}
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={0}
        />
        <Rect 
            width={100}
            height={14}
            fill={'#d86597'}
            x={props.padding}
            y={props.stageHeight - 19}
            draggable={true}
            type={'scrollRect'}
            dragBoundFunc={(pos) => {
                const currX = pos.x;
                const highBound = props.stageWidth - 24 - 100;
                pos.x = Math.min(Math.max(currX, props.padding), highBound);
                pos.y = props.stageHeight - 19;
                return pos;
            }}
            onDragMove={props.horizontalDragMove}
            onMouseDown={props.handleScrollBarClickEvents}
            onClick={props.handleScrollBarClickEvents}
        />
        <Rect 
            x={props.stageWidth - 24}
            y={0}
            width={24}
            height={props.stageHeight}
            fill={'#47426c'}
            shadowColor={'#47426c'}
            shadowBlur={4}
            shadowOffsetX={0}
            shadowOffsetY={0}
        />
        <Rect 
            width={14}
            height={100}
            fill={'#d86597'}
            y={props.padding}
            x={props.stageWidth - 19}
            draggable={true}
            type={'scrollRect'}
            dragBoundFunc={(pos) => {
                const currY = pos.y;
                const highBound = props.stageHeight - 24 - 100;
                pos.y = Math.min(Math.max(currY, props.padding), highBound);
                pos.x = props.stageWidth - 19;
                return pos;
            }}
            onDragMove={props.verticalDragMove}
            onMouseDown={props.handleScrollBarClickEvents}
            onClick={props.handleScrollBarClickEvents}
        />
    </Layer>
);

export default ScrollBarLayer;  