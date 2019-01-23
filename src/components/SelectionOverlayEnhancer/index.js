import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { adjustForScroll, adjustForTranslate } from '../../sharedUtils';
import { getOverlayPosition } from './utils';

/*
This component enhances a canvas layer component by adding the logic to control a visual selection overlay
on that layer. This overlay will show when the shift key is pressed and the mouse is down. 

Keeping track of whether or not the shift key is pressed is not handled by this component, so the main canvas
component that renders this component should keep track of the shift keys status. 

This component also requires a reference (a React ref) to the canvas layer that it is rendering as its child. 
This is because it needs to call the batchDraw method on that layer to update the overlay, and it needs to be 
able to check the current scrolling for that layer in order to adjust its calculations. 


Constraints on the child component:

It must render a Konva.Layer component. 
It must contain accept an overlayRectRef prop, which is a React ref. It must then render a Konva.Rect and set 
overlayRectRef as its ref, this is in order to allow the SelectionOverlayEnhancer component to make changes to
the rect node directly. 

Because Konva events originate from canvas elements rather than the layers, the layer rendered by the child 
component cannot be an empty/partially empty layer, or else the mouse events won't render when they occur over
any of the 'gaps'. If the canvas layer does not have any kind of background etc to give it complete coverage, 
an invisible Rect can be added to the layer so that mouse events will still register. 

*/


class SelectionOverlayEnhancer extends Component {
    constructor(props) {
        super(props);
        this.overlayRectRef = React.createRef();
        this.state = {
            mouseIsDown: false,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
        }
    }

    /**
     * Handles mouseDown events by updating state with the new mouseIsDown status and the x and y coords of the
     * mouseDown event.
     * @param {object} e - the event object.
     */
    handleMouseDown = (e) => {
        let { layerX, layerY } = e.evt;
        if (this.props.requiresTranslateAdjustment && this.props.containerRef) {
            const {
                xPosWithTranslate,
                yPosWithTranslate
            } = adjustForTranslate({ 
                xPos: layerX,
                yPos: layerY,
                translateString: this.props.containerRef.current.style.transform
            });
            layerX = xPosWithTranslate;
            layerY = yPosWithTranslate;
        }
        this.setState({
            mouseIsDown: true,
            mouseDownPosX: adjustForScroll({ raw: layerX, scroll: this.props.childLayerRef.current.attrs.x }),
            mouseDownPosY: adjustForScroll({ raw: layerY, scroll: this.props.childLayerRef.current.attrs.y })
        });
    }

    /**
     * Handles mouseUp events. Sets state back to its default values. Hides the overlayRect node and calls
     * batchDraw on the child canvas layer.
     * @param {object} e - the event object. 
     */
    handleMouseUp = (e) => {
        this.setState({
            mouseIsDown: false,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
        });
        const overlay = this.overlayRectRef.current;
        overlay.x(0);
        overlay.y(0);
        overlay.width(0);
        overlay.height(0);
        this.props.childLayerRef.current.batchDraw();
    }

    /**
     * Handles mouseMove events. If the conditions are met for a selection overlay to be shown, it updates the 
     * overlayRect node with new values based off of the x and y coords for the last recorded mouseDown event, 
     * and the x and y coords of the current mouse position.
     * @param {object} e - the event object.
     */
    handleMouseMove = (e) => {
        if (this.state.mouseIsDown && this.props.selectionToolActive) {
            let { layerX, layerY } = e.evt;
            if (this.props.requiresTranslateAdjustment && this.props.containerRef) {
                const {
                    xPosWithTranslate,
                    yPosWithTranslate
                } = adjustForTranslate({ 
                    xPos: layerX,
                    yPos: layerY,
                    translateString: this.props.containerRef.current.style.transform
                });
                layerX = xPosWithTranslate;
                layerY = yPosWithTranslate;
            }
            const currentMousePosX = adjustForScroll({ raw: layerX, scroll: this.props.childLayerRef.current.attrs.x });
            const currentMousePosY = adjustForScroll({ raw: layerY, scroll: this.props.childLayerRef.current.attrs.y });
            const { x, y, width, height } = getOverlayPosition({
                mouseDownPosX: this.state.mouseDownPosX,
                mouseDownPosY: this.state.mouseDownPosY,
                currentMousePosX,
                currentMousePosY,
            });
            const overlay = this.overlayRectRef.current;
            overlay.x(x);
            overlay.y(y);
            overlay.width(width);
            overlay.height(height);
            this.props.childLayerRef.current.batchDraw();
        }
    }

    render() {
        const { 
            children, 
            childLayerRef,
            selectionToolActive,
            ...passedProps 
        } = this.props;
        return children({
            handleMouseDown: this.handleMouseDown,
            handleMouseUp: this.handleMouseUp,
            handleMouseMove: this.handleMouseMove,
            overlayRectRef: this.overlayRectRef,
            ...passedProps
        });
    }
}

SelectionOverlayEnhancer.propTypes = {
    childLayerRef: PropTypes.object.isRequired,
    shiftKeyPressed: PropTypes.bool.isRequired,
    selectionToolActive: PropTypes.bool.isRequired,
    requiresTranslateAdjustment: PropTypes.bool,
    containerRef: PropTypes.object
};

export default SelectionOverlayEnhancer;