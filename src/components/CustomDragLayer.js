import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';
import TrackDetails from './TrackDetails';
import PianoRoll from './PianoRoll';
import SynthInterface from './SynthInterface';
import EffectInterface from './EffectInterface';

const DragWrapperPreview = props => (
    <div 
        className="draggable-wrapper"
        style={{
            top: `${props.y}px`,
            left: `${props.x}px`
        }}
    >
        <div className="draggable-wrapper__header">
        <button className="draggable-wrapper__button">Move</button>
            <button className="draggable-wrapper__button">X</button>
        </div>
        <div>
            {props.children}
        </div>
    </div>
);


class CustomDragLayer extends Component {

    render() {
        const { 
            isDragging, 
            getSourceClientOffset,
            getItem ,
            getDifferenceFromInitialOffset
        } = this.props;

        if (!isDragging) {
            return null;
        }

        const { x, y } = getDifferenceFromInitialOffset;
        const { initialX, initialY, windowId, windowType } = getItem;
        const currX = initialX + x;
        const currY = initialY + y;

        switch (windowType) {
            case 'instrumentSettings':
                return <DragWrapperPreview
                    x={currX}
                    y={currY}
                >
                    <TrackDetails trackId={windowId} />
                </DragWrapperPreview>

            case 'section':
                return <DragWrapperPreview
                    x={currX}
                    y={currY}
                >
                    <PianoRoll id={windowId} />
                </DragWrapperPreview>

            case 'synth':
                return <DragWrapperPreview
                    x={currX}
                    y={currY}
                >
                    <SynthInterface instrumentId={windowId} />
                </DragWrapperPreview> 
                
                case 'effect':
                    return <DragWrapperPreview
                        x={currX}
                        y={currY}
                    >
                        <EffectInterface effectId={windowId} />
                    </DragWrapperPreview> 

            default:
                return null;
        }

    }
}

function collect(monitor) {
    return {
        isDragging: monitor.isDragging(),
        getSourceClientOffset: monitor.getSourceClientOffset(),
        getItem: monitor.getItem(),
        getDifferenceFromInitialOffset: monitor.getDifferenceFromInitialOffset()
    };
}

export default DragLayer(collect)(CustomDragLayer);