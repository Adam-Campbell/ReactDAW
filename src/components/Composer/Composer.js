import React from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-konva';
import TrackInfo from '../TrackInfo';
import AddTrackMenu from '../AddTrackMenu';
import ComposerControls from './ComposerControls';
import GridLayer from './GridLayer';
import SectionsLayer from './SectionsLayer';
import TransportLayer from './TransportLayer';
import SeekerLayer from './SeekerLayer';
import ScrollBarLayer from './ScrollBarLayer';
import SelectionOverlayEnhancer from '../SelectionOverlayEnhancer'

const Composer = props => (
    <div 
        className="composer__container"
        tabIndex="-1"
        onKeyDown={props.handleKeyDown}
        style={{outline: 'none'}}
    >
        <div className="composer__row">
            <div 
                className="composer__track-info-container-outer"
                style={{ height: props.stageHeight }}
            >
                <AddTrackMenu />
                <div className="composer__track-info-scroll-outer">
                    <div 
                        className="composer__track-info-scroll-inner"
                        style={{top: props.trackInfoMenuTopScroll}}
                    >
                        {
                            props.channels.map((channel, index) => (
                                <TrackInfo 
                                    trackId={channel.id}
                                    key={channel.id}
                                    isSelected={props.currentlySelectedChannel === channel.id}
                                    updateSelectedChannel={props.updateSelectedChannel}
                                /> 
                            ))
                        }
                    </div>
                </div>
            </div>
            <div id="composer-canvas-container">
                <Stage
                    container={'composer-canvas-container'}
                    onClick={props.handleStageClick}
                    onMouseDown={props.handleStageMouseDown}
                    onMouseUp={props.handleStageMouseUp}
                    ref={props.stageRef}
                    width={props.stageWidth} 
                    height={props.stageHeight} 
                >
                    <GridLayer 
                        gridLayerRef={props.gridLayerRef}
                        canvasWidth={props.canvasWidth}
                        canvasHeight={props.canvasHeight}
                        gridLinesArray={props.gridLinesArray}
                    />
                    <SelectionOverlayEnhancer
                        childLayerRef={props.sectionsLayerRef}
                        sectionsLayerRef={props.sectionsLayerRef}
                        sectionRectsArray={props.sectionRectsArray}
                        currentlySelectedSections={props.currentlySelectedSections}
                        handleSectionClick={props.handleSectionClick}
                        handleSectionDoubleClick={props.handleSectionDoubleClick}
                        canvasWidth={props.canvasWidth}
                        canvasHeight={props.canvasHeight}
                        updateCurrentlySelectedSections={props.updateCurrentlySelectedSections}
                        openWindow={props.openWindow}
                        selectionToolActive={props.selectionToolActive}
                    >
                        {props => <SectionsLayer {...props} />}
                    </SelectionOverlayEnhancer>
                    <TransportLayer 
                        transportLayerRef={props.transportLayerRef}
                        canvasWidth={props.canvasWidth}
                        seekerLineRef={props.seekerLineRef}
                        seekerLayerRef={props.seekerLayerRef}
                    />
                    <SeekerLayer 
                        seekerLayerRef={props.seekerLayerRef}
                        seekerLineRef={props.seekerLineRef}
                        canvasHeight={props.canvasHeight}
                        stageHeight={props.stageHeight}
                    />
                    <ScrollBarLayer 
                        stageHeight={props.stageHeight}
                        stageWidth={props.stageWidth}
                        scrollPadding={props.scrollPadding}
                        enterScrollBarActiveState={props.enterScrollBarActiveState}
                        canvasWidth={props.canvasWidth}
                        canvasHeight={props.canvasHeight}
                        gridLayerRef={props.gridLayerRef}
                        sectionsLayerRef={props.sectionsLayerRef}
                        transportLayerRef={props.transportLayerRef}
                        seekerLayerRef={props.seekerLayerRef}
                        stageRef={props.stageRef}
                        updateTrackInfoMenuTopScroll={props.updateTrackInfoMenuTopScroll}
                    />
                </Stage>
            </div>
        </div>
    </div>
);

Composer.propTypes = {
    // react refs
    stageRef: PropTypes.object.isRequired,
    gridLayerRef: PropTypes.object.isRequired,
    sectionsLayerRef: PropTypes.object.isRequired,
    transportLayerRef: PropTypes.object.isRequired,
    seekerLayerRef: PropTypes.object.isRequired,
    seekerLineRef: PropTypes.object.isRequired,
    // canvas figures
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    stageHeight: PropTypes.number.isRequired,
    scrollPadding: PropTypes.number.isRequired,
    stageWidth: PropTypes.number.isRequired,
    // constructed arrays
    gridLinesArray: PropTypes.arrayOf(PropTypes.array).isRequired,
    sectionRectsArray: PropTypes.arrayOf(PropTypes.object).isRequired,
    
    // callback functions
    handleKeyDown: PropTypes.func.isRequired,
    handleStageClick: PropTypes.func.isRequired,
    handleStageMouseDown: PropTypes.func.isRequired,
    handleStageMouseUp: PropTypes.func.isRequired,
    updateSelectedChannel: PropTypes.func.isRequired,
    enterScrollBarActiveState: PropTypes.func.isRequired,
    updateTrackInfoMenuTopScroll: PropTypes.func.isRequired,
    updateCurrentlySelectedSections: PropTypes.func.isRequired,
    openWindow: PropTypes.func.isRequired,
    // other
    trackInfoMenuTopScroll: PropTypes.number.isRequired,
    channels: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentlySelectedChannel: PropTypes.any,
    selectionToolActive: PropTypes.bool.isRequired
};

export default Composer;