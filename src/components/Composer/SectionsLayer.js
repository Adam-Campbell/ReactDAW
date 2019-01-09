import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect } from 'react-konva';
import { UIColors } from '../../constants';
import { adjustForScroll } from '../../sharedUtils';

class SectionsLayer extends Component {
    constructor(props) {
        super(props);
        this.overlayRectRef = React.createRef();
        this.state = {
            mouseIsDown: false,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
        };
    }

    handleMouseDown = (e) => {
        this.setState({
            mouseIsDown: true,
            mouseDownPosX: adjustForScroll({ raw: e.evt.layerX, scroll: this.props.sectionsLayerRef.current.attrs.x }),
            mouseDownPosY: adjustForScroll({ raw: e.evt.layerY, scroll: this.props.sectionsLayerRef.current.attrs.y })
        });
    }

    handleMouseUp = (e) => {
        this.setState({
            mouseIsDown: false,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
            currentMousePosX: 0,
            currentMousePosY: 0
        });
        const overlay = this.overlayRectRef.current;
        overlay.x(0);
        overlay.y(0);
        overlay.width(0);
        overlay.height(0);
        this.props.sectionsLayerRef.current.batchDraw();
    }

    handleMouseMove = (e) => {
        if (this.state.mouseIsDown && this.props.shiftKeyPressed) {
            const currentMousePosX = adjustForScroll({ raw: e.evt.layerX, scroll: this.props.sectionsLayerRef.current.attrs.x });
            const currentMousePosY = adjustForScroll({ raw: e.evt.layerY, scroll: this.props.sectionsLayerRef.current.attrs.y });
            const { x, y, width, height } = this.getOverlayPosition({
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
            this.props.sectionsLayerRef.current.batchDraw();
        }
    }

    getOverlayPosition = (optionsObject) => {
        const {
            mouseDownPosX,
            mouseDownPosY,
            currentMousePosX,
            currentMousePosY
        } = optionsObject;
        if (
            mouseDownPosX === 0 && mouseDownPosY === 0 && 
            currentMousePosX === 0 && currentMousePosY === 0
        ) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        }
        const leftBound = Math.min(mouseDownPosX, currentMousePosX);
        const rightBound = Math.max(mouseDownPosX, currentMousePosX);
        const topBound = Math.min(mouseDownPosY, currentMousePosY);
        const bottomBound = Math.max(mouseDownPosY, currentMousePosY);
        const width = rightBound - leftBound;
        const height = bottomBound - topBound;
        return {
            x: leftBound,
            y: topBound,
            width,
            height
        };
    }

    render() {
        const clickTargetHeight = Math.max(document.documentElement.clientHeight, this.props.canvasHeight);
        return (
            <Layer 
                ref={this.props.sectionsLayerRef}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}    
            >
                <Rect 
                    width={this.props.canvasWidth}
                    height={clickTargetHeight}
                    x={0}
                    y={0}
                />
                {
                    this.props.sectionRectsArray.map((section, index) => (
                        <Rect 
                            x={section.x}
                            y={section.y}
                            sectionId={section.sectionId}
                            height={section.height}
                            width={section.width}
                            fill={
                                this.props.currentlySelectedSections.includes(section.sectionId) ? 
                                UIColors.darkGrey :
                                section.color
                            }
                            stroke={UIColors.offWhite}
                            strokeWidth={2}
                            type={'section'}
                            key={index}
                            onClick={(e) => this.props.handleSectionClick(e, section.sectionId)}
                            onDblClick={(e) => this.props.handleSectionDoubleClick(e, section.sectionId)}
                        />
                    ))
                } 
                <Rect 
                    ref={this.overlayRectRef}
                    fill="#08b5d3"
                    opacity={0.4}
                    cornerRadius={3}
                />
            </Layer>
        );
    }
}

SectionsLayer.propTypes = {
    sectionsLayerRef: PropTypes.object.isRequired,
    sectionRectsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSectionClick: PropTypes.func.isRequired,
    handleSectionDoubleClick: PropTypes.func.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    shiftKeyPressed: PropTypes.bool.isRequired
};

export default SectionsLayer;