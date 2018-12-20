import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import Konva from 'konva';
import { throttle } from 'lodash';
import TrackInfo from '../TrackInfo';
import { UIColors } from '../../constants';
import { generateId } from '../../helpers';
import Tone from 'tone';
import CursorSelect from '../CursorSelect';
import AddTrackMenu from '../AddTrackMenu';
import SectionDurationSelect from '../SectionDurationSelect';
import Composer from './Composer';
/*

Behaviours to be implemented:

- Copying and pasting of sections with ctrl+c and ctrl+v
- Deletion of selected section(s) with delete key
- The selection functionality needs to be expanded to handle the selection of multiple sections rather than
just one.
- Will need a way to select which track a section gets pasted to. Perhaps maintain a currentlySelectedTrack
property in state and update it when a track is clicked on.

- Will need to consider how pasting should work in general.

- Implement similar functionality to the PianoRoll component, whereby holding down ctrl whilst clicking
on a section allows you to add to the selection rather than replacing the entire selection.

- Make as much of the functionality pure as possible and move into a seperate utils file. 

*/

class ComposerContainer extends Component {

    constructor(props) {
        super(props);
        //this.canvasWidth = 200 * 48;
        //this.canvasHeight = 7 * 70 + 40;
        this.stageWidth = 740;
        this.stageHeight = 300;
        this.scrollPadding = 10;
        this.stageRef = React.createRef();
        this.gridLayerRef = React.createRef();
        this.sectionsLayerRef = React.createRef();
        this.transportLayerRef = React.createRef();
        this.seekerLayerRef = React.createRef();
        this.seekerLineRef = React.createRef();
        this.rAFRef = null;
        this.horizontalDragMove = throttle(this.horizontalDragMove, 16);
        this.verticalDragMove = throttle(this.verticalDragMove, 16);
        this.state = {
            sectionDuration: 4,
            currentlySelectedSection: null,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
            pencilActive: false,
            trackInfoMenuTopScroll: 0,
            transportPosition: 0
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isPlaying !== this.props.isPlaying) {
            if (this.props.isPlaying) {
                requestAnimationFrame(this.getTransportPosition);
            } else {
                cancelAnimationFrame(this.rAFRef);
                this.seekerLineRef.current.x(0);
                this.seekerLayerRef.current.batchDraw();
            }
        }
    }

    get canvasHeight() {
        return Math.max(4, this.props.channels.length) * 70 + 40;
    }

    get canvasWidth() {
        return 200 * 48;
    }

    _createGridLinesArray() {
        let linesArray = [];
        // create vertical lines
        for (let i = 0; i <= 200;  i++) {
            linesArray.push([i*48 , 40, i*48, this.canvasHeight]);
        }
        // create horizontal lines
        let verticalBound = Math.max(4, this.props.channels.length);
        for (let j = 0; j <= verticalBound; j++) {
            linesArray.push([0, j*70+40, this.canvasWidth, j*70+40]);
        }
        return linesArray;
    }

    barsToNumbers = (barsString) => {
        let subStr = barsString.split(':')[0];
        return parseInt(subStr);
        //return parseInt(barsString.charAt(0));
    }

    verticalDragMove = (e) => {
        if (this.stageHeight > this.canvasHeight) {
            return;
        }
        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.y - this.scrollPadding;
        const totalSliderRange = this.stageHeight - this.scrollPadding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;
        // update the layers
        const totalCanvasRange = this.canvasHeight - this.stageHeight + this.scrollPadding + 24;
        const scrollAmount = -(totalCanvasRange * delta);
        this.setState({
            trackInfoMenuTopScroll: scrollAmount
        });
        this.gridLayerRef.current.y(-(totalCanvasRange * delta));
        this.sectionsLayerRef.current.y(-(totalCanvasRange * delta));
        this.gridLayerRef.current.batchDraw();
        this.sectionsLayerRef.current.batchDraw();
    }

    horizontalDragMove = (e) => {
        // work out horizontal % delta
        const currentSliderPos = e.target.attrs.x - this.scrollPadding;
        const totalSliderRange = this.stageWidth - this.scrollPadding - 24 - 100;
        const delta = currentSliderPos / totalSliderRange;
        // update the layers
        const totalCanvasRange = this.canvasWidth - this.stageWidth + this.scrollPadding + 24;
        this.gridLayerRef.current.x(-(totalCanvasRange * delta));
        this.sectionsLayerRef.current.x(-(totalCanvasRange * delta));
        this.transportLayerRef.current.x(-(totalCanvasRange * delta));
        this.seekerLayerRef.current.x(-(totalCanvasRange * delta));
        this.gridLayerRef.current.batchDraw();
        this.sectionsLayerRef.current.batchDraw();
        this.transportLayerRef.current.batchDraw();
        this.seekerLayerRef.current.batchDraw();
    }

    _createSectionRectsArray = () => {
        let arr = [];
        for (let i = 0; i < this.props.channels.length; i++) {
            let channel = this.props.channels[i];
            for (let sectionId of channel.sectionIds) {
                let section = this.props.sections[sectionId];
                let rectObject = {
                    x: this.barsToNumbers(section.start) * 48,
                    y: (i * 70) + 40,
                    width: section.numberOfBars * 48,
                    height: 70,
                    color: channel.color,
                    sectionId: section.id
                }
                arr.push(rectObject);
            }
        }
        return arr;
    }

    oldhandleStageClick = (e) => {
        // get x and y positions of click relative to layer.

        // to work out channel => Math.floor((y-40)/70), will produce 0 for first 
        // channel, 1 for second channel etc. The correct channel will be at that
        // that position in the channels array.

        // to work out start time => Math.floor(x/48), produces 0 for first bar, 1 
        // for second bar etc. Convert this number into bars:beats:sixteenths formatted
        // string, 0 becomes '0:0:0', 1 becomes '1:0:0' etc.

        if (e.target.attrs.type && e.target.attrs.type === 'section') {
            console.log('section was clicked on!');
            //this.props.openWindow(e.target.attrs.sectionId, 'section');
        } else {
            console.log('stage was clicked on!');
            const x = e.evt.layerX;
            const y = e.evt.layerY;
            const channelIndex = Math.floor((y-40)/70);
            const startAsNumber = Math.floor(x/48);
            const startAsBBS = `${startAsNumber}:0:0`;
            this.props.addSection(
                generateId(),
                this.props.channels[channelIndex].id,
                startAsBBS,
                this.state.sectionDuration
            );
        }
        
    }



    handleStageClick = (e) => {

        // set currentlySelectedSection back to null on every stage click to be safe.
        this.setState({
            currentlySelectedSection: null
        });

        // grab x and y positions for click
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;

        // if yPos < 40 then we have clicked on the transport section of the canvas
        if (yPos < 40) {
            const barClicked = `${Math.floor(xPos / 48)}:0:0`;
            Tone.Transport.position = barClicked;
            const newXPos = this.convertTransportPositionToXPos(Tone.Transport.position);        
            this.seekerLineRef.current.x(newXPos);
            this.seekerLayerRef.current.batchDraw();
            // otherwise we have clicked on the main section of the canvas
        } else {
            // if pencil is active then we don't want to do anything in the click event, everything is
            // handled by mouseDown and mouseUp events. 
            if (!this.state.pencilActive) {
                // use the information from the click event to dispatch an addSection action with the
                // necessary arguments.
                const scrolledX = this.gridLayerRef.current.attrs.x || 0;
                const scrolledY = this.gridLayerRef.current.attrs.y || 0;
                const adjustedXPos = xPos - scrolledX;
                const adjustedYPos = yPos - scrolledY;

                // this catches clicks that occur on rows that exist on the grid but do not have
                // channels assigned to them yet, we return early because we cannot try and add a 
                // section here yet.
                if (adjustedYPos > this.props.channels.length * 70 + 40) {
                    return;
                }

                const channelIndex = Math.floor((adjustedYPos-40)/70);
                const startAsNumber = Math.floor(adjustedXPos/48);
                const startAsBBS = `${startAsNumber}:0:0`;
                this.props.addSection(
                    generateId(),
                    this.props.channels[channelIndex].id,
                    startAsBBS,
                    this.state.sectionDuration
                );
            }
        }

    }

    handleStageMouseDown = (e) => {
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;
        const scrolledX = this.gridLayerRef.current.attrs.x || 0;
        const scrolledY = this.gridLayerRef.current.attrs.y || 0;
        const adjustedXPos = xPos - scrolledX;
        const adjustedYPos = yPos - scrolledY;
        const isSection = e.target.attrs.type && e.target.attrs.type === 'section';
        if (yPos >= 40 && this.state.pencilActive && !isSection) {
            this.setState({
                mouseDownPosX: adjustedXPos,
                mouseDownPosY: adjustedYPos
            });
        }
    }

    handleStageMouseUp = (e) => {
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;
        const scrolledX = this.gridLayerRef.current.attrs.x || 0;
        const scrolledY = this.gridLayerRef.current.attrs.y || 0;
        const adjustedXPos = xPos - scrolledX;
        const adjustedYPos = yPos - scrolledY;

        // this catches clicks that occur on rows that exist on the grid but do not have
        // channels assigned to them yet, we return early because we cannot try and add a 
        // section here yet.
        if (adjustedYPos > this.props.channels.length * 70 + 40) {
            return;
        }

        const isSection = e.target.attrs.type && e.target.attrs.type === 'section';
        if (yPos >= 40 && this.state.pencilActive && !isSection) {
            // logic for creating section goes here...

            // to add a section we need:
            // sectionId - generate using generateId(),
            // channelId -  derive from state.mouseDownPosY
            // sectionStart - derive from state.mouseDownPosX
            // sectionLength - derive from diff between state.mouseDownPosX and xPos

            const { mouseDownPosX, mouseDownPosY } = this.state;
            const adjustedMouseDownPosY = mouseDownPosY - scrolledY
            if (adjustedMouseDownPosY > this.props.channels.length * 70 + 40) {
                return;
            }

            const channelIndex = Math.floor((mouseDownPosY - 40) / 70);
            const channelId = this.props.channels[channelIndex].id;
            const sectionStartAsNumber = Math.floor(mouseDownPosX / 48);
            const sectionStartAsBBS = `${sectionStartAsNumber}:0:0`;
            const sectionEndAsNumber = Math.round(adjustedXPos / 48);
            const sectionLengthInBars = sectionEndAsNumber - sectionStartAsNumber > 1 ?
                                        sectionEndAsNumber - sectionStartAsNumber : 1;
            
            this.props.addSection(
                generateId(),
                channelId,
                sectionStartAsBBS,
                sectionLengthInBars
            );
        }
    }

    handleSectionClick = (e, sectionId) => {
        // this is Konvas method for stopping the event from bubbling up to the other canvas elements,
        // we don't want to trigger their event listeners. 
        e.cancelBubble = true;
        this.setState({
            currentlySelectedSection: sectionId
        });
    }

    handleSectionDoubleClick = (e, sectionId) => {
        // this is Konvas method for stopping the event from bubbling up to the other canvas elements,
        // we don't want to trigger their event listeners. 
        e.cancelBubble = true;
        this.setState({
            currentlySelectedSection: null
        });
        this.props.openWindow(sectionId, 'section');
    }

    updateCursorValue = (e) => {
        this.setState({
            pencilActive: e.target.value === 'pencil'
        });
    }

    updateSectionDurationValue = (e) => {
        this.setState({
            sectionDuration: parseInt(e.target.value)
        });
    }

    removeSelectedSection = () => {
        if (this.state.currentlySelectedSection) {
            const sectionId = this.state.currentlySelectedSection;
            const channelId = this.props.sections[sectionId].channelId;
            this.props.removeSection(sectionId, channelId);
        }
    }

    getTransportPosition = () => {
        const newXPos = this.convertTransportPositionToXPos(Tone.Transport.position);        
        this.seekerLineRef.current.x(newXPos);
        this.seekerLayerRef.current.batchDraw();
        this.rAFRef = requestAnimationFrame(this.getTransportPosition);
    }

    convertTransportPositionToXPos = (transportPositionString) => {
        // Format of input string is "0:0:0", this will split it into an array of
        // [bars, beats, sixteenths]
        const spl= transportPositionString.split(':');
        // Convert the bars, beats and sixteenths into one figure in terms of sixteenths.
        const asSixteenths = parseInt(spl[0])*16 + 
                           parseInt(spl[1])*4 +
                           parseFloat(spl[2]);
        // ratio of sixteenths to pixels is 1/3, so multiply by 3 to turn the sixteenths value
        // into the appropriate x position.
        const asXPos = asSixteenths * 3;
        return asXPos;

    }

    handleKeyDown = (e) => {
        console.log('handleKeyDown on the Composer was called');
        console.log(e);
    }

    render() {
        const gridLinesArray = this._createGridLinesArray();
        const sectionRectsArray = this._createSectionRectsArray();

        return <Composer 
            stageRef={this.stageRef}
            gridLayerRef={this.gridLayerRef}
            sectionsLayerRef={this.sectionsLayerRef}
            transportLayerRef={this.transportLayerRef}
            seekerLayerRef={this.seekerLayerRef}
            seekerLineRef={this.seekerLineRef}
            canvasWidth={this.canvasWidth}
            canvasHeight={this.canvasHeight}
            stageWidth={this.stageWidth}
            stageHeight={this.stageHeight}
            scrollPadding={this.scrollPadding}
            gridLinesArray={gridLinesArray}
            sectionRectsArray={sectionRectsArray}
            cursorValue={this.state.pencilActive ? 'pencil' : 'pointer'}
            durationValue={this.state.sectionDuration}
            handleKeyDown={this.handleKeyDown}
            updateCursorValue={this.updateCursorValue}
            updateDurationValue={this.updateSectionDurationValue}
            removeSelectedSection={this.removeSelectedSection}
            handleStageClick={this.handleStageClick}
            handleStageMouseDown={this.handleStageMouseDown}
            handleStageMouseUp={this.handleStageMouseUp}
            handleSectionClick={this.handleSectionClick}
            handleSectionDoubleClick={this.handleSectionDoubleClick}
            verticalDragMove={this.verticalDragMove}
            horizontalDragMove={this.horizontalDragMove}
            trackInfoMenuTopScroll={this.state.trackInfoMenuTopScroll}
            channels={this.props.channels}
            currentlySelectedSection={this.state.currentlySelectedSection}
        />

        
        // return (
        //     <div 
        //         className="composer__container"
        //         tabIndex="0"
        //         onKeyDown={this.handleKeyDown}
        //         style={{outline: 'none'}}
        //     >
        //         <div className="composer__controls-container">
        //             <CursorSelect 
        //                 value={this.state.pencilActive ? 'pencil' : 'pointer'}
        //                 handleChange={this.updateCursorValue.bind(this)}
        //             />
        //             <SectionDurationSelect 
        //                 value={this.state.sectionDuration}
        //                 handleChange={this.updateSectionDurationValue}
        //             />
        //             <button 
        //                 className="composer__delete-section-button"
        //                 onClick={this.removeSelectedSection}
        //             >Delete Selected Section</button>
        //         </div>
        //         <div className="composer__row">
        //             <div className="composer__track-info-container-outer">
        //                 <AddTrackMenu />
        //                 <div className="composer__track-info-scroll-outer">
        //                     <div 
        //                         className="composer__track-info-scroll-inner"
        //                         style={{top: this.state.trackInfoMenuTopScroll}}
        //                     >
        //                         {
        //                             this.props.channels.map((channel, index) => (
        //                                 <TrackInfo 
        //                                     trackId={channel.id}
        //                                     key={channel.id} 
        //                                 /> 
        //                             ))
        //                         }
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="composer__canvas-container" id="composer-canvas-container">
        //                 <Stage
        //                     container={'composer-canvas-container'}
        //                     onClick={this.handleStageClick}
        //                     onMouseDown={this.handleStageMouseDown}
        //                     onMouseUp={this.handleStageMouseUp}
        //                     ref={this.stageRef}
        //                     width={740} 
        //                     height={300} 
        //                 >
        //                     <Layer ref={this.gridLayerRef}>
        //                         <Rect 
        //                             x={0}
        //                             y={0}
        //                             width={this.canvasWidth}
        //                             height={this.canvasHeight}
        //                             fill={'#201826'}
        //                         />
        //                         {
        //                             gridLines.map((linePoints, index) => (
        //                                 <Line
        //                                     points={linePoints}
        //                                     listening={false}
        //                                     stroke={'#47426c'}
        //                                     strokeWidth={2}
        //                                     shadowColor={'#47426c'}
        //                                     shadowBlur={4}
        //                                     shadowOffsetX={0}
        //                                     shadowOffsetY={0}
        //                                     key={index}
        //                                 />
        //                             ))
        //                         }
        //                     </Layer>
        //                     <Layer ref={this.sectionsLayerRef}>
        //                         {
        //                             sectionRectsArray.map((section, index) => (
        //                                 <Rect 
        //                                     x={section.x}
        //                                     y={section.y}
        //                                     sectionId={section.sectionId}
        //                                     height={section.height}
        //                                     width={section.width}
        //                                     fill={
        //                                         section.sectionId === this.state.currentlySelectedSection ? 
        //                                         '#222222' :
        //                                         section.color
        //                                     }
        //                                     stroke={UIColors.offWhite}
        //                                     strokeWidth={2}
        //                                     type={'section'}
        //                                     key={index}
        //                                     onClick={(e) => this.handleSectionClick(e, section.sectionId)}
        //                                     onDblClick={(e) => this.handleSectionDoubleClick(e, section.sectionId)}
        //                                 />
        //                             ))
        //                         } 
        //                     </Layer>
        //                     <Layer ref={this.transportLayerRef}>
        //                         <Rect 
        //                             x={0}
        //                             y={0}
        //                             width={this.canvasWidth}
        //                             height={40}
        //                             fill={'#201826'}
        //                         />
        //                         {
        //                             new Array(200).fill(0).map((el, index) => (
        //                                 <Text 
        //                                     text={`${index+1}`}
        //                                     x={(index+1) * 48}
        //                                     y={20}
        //                                     key={index}
        //                                     fill={'#e0e0e0'}
        //                                     shadowColor={'#e0e0e0'}
        //                                     shadowBlur={4}
        //                                     shadowOffsetX={0}
        //                                     shadowOffsetY={0}
        //                                 />
        //                             ))
        //                         }
        //                     </Layer>
        //                     <Layer ref={this.seekerLayerRef}>
        //                         <Line
        //                             ref={this.seekerLineRef}
        //                             points={[0, 0, 0, this.canvasHeight]}
        //                             listening={false}
        //                             stroke={'#e0e0e0'}
        //                             strokeWidth={2}
        //                         />
        //                     </Layer>
        //                     <Layer>
        //                         <Rect 
        //                             x={716}
        //                             y={0}
        //                             width={24}
        //                             height={300}
        //                             fill={'#47426c'}
        //                             shadowColor={'#47426c'}
        //                             shadowBlur={4}
        //                             shadowOffsetX={0}
        //                             shadowOffsetY={0}
        //                         />
        //                         <Rect 
        //                             x={721}
        //                             y={10}
        //                             width={14}
        //                             height={100}
        //                             fill={'#d86597'}
        //                             draggable={true}
        //                             dragBoundFunc={(pos) => {
        //                                 const currY = pos.y;
        //                                 // total stage height minus height of horizontal scroll bar
        //                                 // minus height of scroll slider
        //                                 const highBound = this.stageHeight - 24 - 100;
        //                                 pos.y = Math.min(Math.max(this.scrollPadding, currY), highBound);
        //                                 pos.x = 721;
        //                                 return pos;
        //                             }}
        //                             onDragMove={this.verticalDragMove}
        //                         />
        //                         <Rect 
        //                             x={0}
        //                             y={276}
        //                             width={740}
        //                             height={24}
        //                             fill={'#47426c'}
        //                             shadowColor={'#47426c'}
        //                             shadowBlur={4}
        //                             shadowOffsetX={0}
        //                             shadowOffsetY={0}
        //                         />
        //                         <Rect 
        //                             x={10}
        //                             y={281}
        //                             width={100}
        //                             height={14}
        //                             fill={'#d86597'}
        //                             draggable={true}
        //                             dragBoundFunc={(pos) => {
        //                                 const currX = pos.x;
        //                                 const highBound = this.stageWidth - 24 - 100;
        //                                 pos.x = Math.min(Math.max(currX, this.scrollPadding), highBound);
        //                                 pos.y = 281;
        //                                 return pos;
        //                             }}
        //                             onDragMove={this.horizontalDragMove}
        //                         />
        //                     </Layer>
        //                 </Stage>
        //             </div>
        //         </div>
        //     </div>
        // );
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
    sections: state.sections,
    isPlaying: state.playerInfo.isPlaying
});

export default connect(
    mapStateToProps,
    {
        addChannel: ActionCreators.addChannel,
        removeChannel: ActionCreators.removeChannel,
        addSection: ActionCreators.addSection,
        removeSection: ActionCreators.removeSection,
        openWindow: ActionCreators.openWindow
    }
)(ComposerContainer);