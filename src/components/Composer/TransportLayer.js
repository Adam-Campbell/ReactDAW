import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Text } from 'react-konva';
import { UIColors } from '../../constants';
import Tone from 'tone';
import { 
    transportPositionStringToSixteenths,
    adjustForScroll 
} from '../../sharedUtils';

class TransportLayer extends Component {

    /**
     * Handle clicks that occur on the transport section of the canvas.
     * @param {Object} e - the event object. 
     */
    handleTransportClick = (e) => {
        e.cancelBubble = true;
        const xPos = adjustForScroll({ 
            raw: e.evt.layerX, 
            scroll: this.props.transportLayerRef.current.attrs.x 
        });
        const barClicked = `${Math.floor(xPos / 48)}:0:0`;
        Tone.Transport.position = barClicked;
        const newXPos = transportPositionStringToSixteenths(Tone.Transport.position) * 3;        
        this.props.seekerLineRef.current.x(newXPos);
        this.props.seekerLayerRef.current.batchDraw();
    }

    render() {
        return (
            <Layer 
                ref={this.props.transportLayerRef}
                onClick={this.handleTransportClick}
            >
                <Rect 
                    x={0}
                    y={0}
                    width={this.props.canvasWidth}
                    height={40}
                    fill={UIColors.backgroundDark}
                />
                {
                    new Array(200).fill(0).map((el, index) => (
                        <Text 
                            text={`${index+1}`}
                            x={(index+1) * 48}
                            y={20}
                            key={index}
                            fill={UIColors.offWhite}
                            shadowColor={UIColors.offWhite}
                            shadowBlur={4}
                            shadowOffsetX={0}
                            shadowOffsetY={0}
                        />
                    ))
                }
            </Layer>
        );
    }
}

TransportLayer.propTypes = {
    transportLayerRef: PropTypes.object.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    seekerLineRef: PropTypes.object.isRequired,
    seekerLayerRef: PropTypes.object.isRequired
};

export default TransportLayer;