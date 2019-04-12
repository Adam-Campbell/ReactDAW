import React, { Component } from 'react';
import { Layer, Rect, Text } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';  
import Tone from 'tone';
import { adjustForScroll, adjustForTranslate } from '../../sharedUtils';


class TransportLayer extends Component {

    /**
     * Handles a click that occurs within the Transport section of the canvas, delegating to other
     * functions as needed. 
     * @param {number} xPos - the x position of the click event that occurred. 
     */
    handleTransportClick = (e) => {
        e.cancelBubble = true;
        const { 
            xPosWithTranslate,
            yPosWithTranslate
        } = adjustForTranslate({ 
            xPos: e.evt.layerX, 
            yPos: e.evt.layerY, 
            translateString: this.props.containerRef.current.style.transform 
        });
        const xPosWithScrollAndTranslate = adjustForScroll({ 
            raw: xPosWithTranslate, 
            scroll: this.props.transportLayerRef.current.attrs.x 
        });
        // adjust the xPos to snap it to the current quantize value
        const currQuantizeAdjustment = Tone.Time(this.props.snap).toTicks() / 2;
        const xPosAdjustedForQuantize = xPosWithScrollAndTranslate-(xPosWithScrollAndTranslate%currQuantizeAdjustment);
        // calculate the new transport position based on the section start time and the current progression into
        // the section.
        const sectionStartAsTicks = Tone.Time(this.props.sectionStart).toTicks();
        const sectionProgressAsTicks =  xPosAdjustedForQuantize * 2;
        const newTransportPosition = Tone.Ticks(sectionStartAsTicks+sectionProgressAsTicks).toBarsBeatsSixteenths();
        Tone.Transport.position = newTransportPosition;
        // update the canvas element with new xPos and redraw the canvas layer. 
        this.props.seekerLineRef.current.strokeWidth(2);
        this.props.seekerLineRef.current.x(xPosAdjustedForQuantize);
        this.props.seekerLayerRef.current.batchDraw();
    };

    render() {
        return (
            <Layer
                x={48}
                ref={this.props.transportLayerRef}
                onClick={this.handleTransportClick}
            >
                <Rect 
                    x={-48}
                    y={0}
                    width={this.props.canvasWidth+52}
                    height={40}
                    fill={UIColors.backgroundDark}
                />
                {this.props.transportBarNumbersArray.map((barObject, index) =>(
                    <Text 
                        text={barObject.barNumber}
                        x={barObject.xPos}
                        y={20}
                        key={index}
                        fill={UIColors.offWhite}
                        shadowColor={UIColors.offWhite}
                        shadowBlur={4}
                        shadowOffsetX={0}
                        shadowOffsetY={0}
                    />
                ))}
            </Layer>
        );
    }
};

TransportLayer.propTypes = {
    transportLayerRef: PropTypes.object.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    transportBarNumbersArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    seekerLineRef: PropTypes.object.isRequired,
    seekerLayerRef: PropTypes.object.isRequired,
    snap: PropTypes.string.isRequired,
    sectionStart: PropTypes.string.isRequired,
    containerRef: PropTypes.object.isRequired
};

export default TransportLayer;