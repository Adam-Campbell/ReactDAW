import React from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-konva';
import TrackInfo from './TrackInfo';
import AddTrackMenu from '../AddTrackMenu';
import ComposerControls from './ComposerControls';
import GridLayer from './GridLayer';
import SectionsLayer from './SectionsLayer';
import TransportLayer from './TransportLayer';
import SeekerLayer from './SeekerLayer';
import ScrollBarLayer from './ScrollBarLayer';

const Composer = props => (
    <div 
        className="composer__container"
        tabIndex="0"
        onKeyDown={props.handleKeyDown}
        style={{outline: 'none'}}
    >
        <ComposerControls 
            cursorValue={props.cursorValue}
            updateCursorValue={props.updateCursorValue}
            durationValue={props.durationValue}
            updateDurationValue={props.updateDurationValue}
        />
        <div className="composer__row">
            <div className="composer__track-info-container-outer">
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
            <div className="composer__canvas-container" id="composer-canvas-container">
                <Stage
                    container={'composer-canvas-container'}
                    onClick={props.handleStageClick}
                    onMouseDown={props.handleStageMouseDown}
                    onMouseUp={props.handleStageMouseUp}
                    ref={props.stageRef}
                    width={740} 
                    height={300} 
                >
                    <GridLayer 
                        gridLayerRef={props.gridLayerRef}
                        canvasWidth={props.canvasWidth}
                        canvasHeight={props.canvasHeight}
                        gridLinesArray={props.gridLinesArray}
                    />
                    <SectionsLayer 
                        sectionsLayerRef={props.sectionsLayerRef}
                        sectionRectsArray={props.sectionRectsArray}
                        currentlySelectedSections={props.currentlySelectedSections}
                        handleSectionClick={props.handleSectionClick}
                        handleSectionDoubleClick={props.handleSectionDoubleClick}
                    />
                    <TransportLayer 
                        transportLayerRef={props.transportLayerRef}
                        canvasWidth={props.canvasWidth}
                    />
                    <SeekerLayer 
                        seekerLayerRef={props.seekerLayerRef}
                        seekerLineRef={props.seekerLineRef}
                        canvasHeight={props.canvasHeight}
                    />
                    <ScrollBarLayer 
                        stageHeight={props.stageHeight}
                        stageWidth={props.stageWidth}
                        scrollPadding={props.scrollPadding}
                        verticalDragMove={props.verticalDragMove}
                        horizontalDragMove={props.horizontalDragMove}
                        handleScrollBarClickEvents={props.handleScrollBarClickEvents}
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
    // input values
    cursorValue: PropTypes.string.isRequired,
    durationValue: PropTypes.number.isRequired,
    // callback functions
    handleKeyDown: PropTypes.func.isRequired,
    updateCursorValue: PropTypes.func.isRequired,
    updateDurationValue: PropTypes.func.isRequired,
    handleStageClick: PropTypes.func.isRequired,
    handleStageMouseDown: PropTypes.func.isRequired,
    handleStageMouseUp: PropTypes.func.isRequired,
    handleSectionClick: PropTypes.func.isRequired,
    handleSectionDoubleClick: PropTypes.func.isRequired,
    verticalDragMove: PropTypes.func.isRequired,
    horizontalDragMove: PropTypes.func.isRequired,
    updateSelectedChannel: PropTypes.func.isRequired,
    handleScrollBarClickEvents: PropTypes.func.isRequired,
    // other
    trackInfoMenuTopScroll: PropTypes.number.isRequired,
    channels: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentlySelectedSections: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentlySelectedChannel: PropTypes.any
};

export default Composer;