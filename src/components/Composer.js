import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import Konva from 'konva';
import { debounce, throttle } from 'lodash';
import TrackInfo from './TrackInfo';
import { UIColors } from '../constants';
import { generateId } from '../helpers';
import Tone from 'tone';
import CursorSelect from './CursorSelect';
import AddTrackMenu from './AddTrackMenu';
/*
outer dimensions - 960 x 300

Will consist of track info container, that will hold a track info component for each track, and the
composer canvas, which will display the actual composer view. The composer canvas will have a horizontal
scroll bar, which only scrolls the canvas, and a vertical scroll bar which will scroll the canvas and 
the track info container. 

*/


/*
Todo:

Implement add track - create the menu that will appear when the add track button is pressed,
and when a particular type of track is chosen from the menu, fire off the addTrack action
with the relevant arguments. 

Handle scrolling - horizontal scroll needs to affect several canvas layers, vertical scroll needs
to affect canvas layers plus the track info container. 

Add a remove button to each track info component that will remove that track from the project. 

Implement pencil functionality similar to that found in the piano roll - you start drawing when 
the mousedown event occurs, and on mouseup a new section is created of the appropriate length
etc. 

Think about the best way to implement copying and pasting sections. 

Think about possibly adding a vertical line that moves across the composer canvas that shows the 
current position in the track. Also clicking within the top section of the canvas (that shows the
bar numbers) will skip to that bar. 

*/

class Composer extends Component {

    constructor(props) {
        super(props);
        this.foo = 'bar';
        this.canvasWidth = 200 * 48;
        this.canvasHeight = 7 * 70 + 40;
        this.stageRef = React.createRef();
        window.stageRef = this.stageRef;
        this.state = {
            sectionDuration: 4,
            currentlySelectedSection: null,
            mouseDownPosX: 0,
            mouseDownPosY: 0,
            pencilActive: false
        };
    }

    componentDidMount() {

    }


    _createGridLinesArray() {
        let linesArray = [];
        // create vertical lines
        for (let i = 0; i <= 200;  i++) {
            linesArray.push([i*48 , 40, i*48, this.canvasHeight]);
        }
        // create horizontal lines
        for (let j = 0; j <= 7; j++) {
            linesArray.push([0, j*70+40, this.canvasWidth, j*70+40]);
        }
        return linesArray;
    }

    barsToNumbers = (barsString) => {
        let subStr = barsString.split(':')[0];
        return parseInt(subStr);
        //return parseInt(barsString.charAt(0));
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
            // otherwise we have clicked on the main section of the canvas
        } else {
            // if pencil is active then we don't want to do anything in the click event, everything is
            // handled by mouseDown and mouseUp events. 
            if (!this.state.pencilActive) {
                // use the information from the click event to dispatch an addSection action with the
                // necessary arguments.
                const channelIndex = Math.floor((yPos-40)/70);
                const startAsNumber = Math.floor(xPos/48);
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
        const isSection = e.target.attrs.type && e.target.attrs.type === 'section';
        if (yPos >= 40 && this.state.pencilActive && !isSection) {
            this.setState({
                mouseDownPosX: xPos,
                mouseDownPosY: yPos
            });
        }
    }

    handleStageMouseUp = (e) => {
        const xPos = e.evt.layerX;
        const yPos = e.evt.layerY;
        const isSection = e.target.attrs.type && e.target.attrs.type === 'section';
        if (yPos >= 40 && this.state.pencilActive && !isSection) {
            // logic for creating section goes here...

            // to add a section we need:
            // sectionId - generate using generateId(),
            // channelId -  derive from state.mouseDownPosY
            // sectionStart - derive from state.mouseDownPosX
            // sectionLength - derive from diff between state.mouseDownPosX and xPos

            const { mouseDownPosX, mouseDownPosY } = this.state;
            const channelIndex = Math.floor((mouseDownPosY - 40) / 70);
            const channelId = this.props.channels[channelIndex].id;
            const sectionStartAsNumber = Math.floor(mouseDownPosX / 48);
            const sectionStartAsBBS = `${sectionStartAsNumber}:0:0`;
            const sectionEndAsNumber = Math.round(xPos / 48);
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

    updateCursorValue(e) {
        this.setState({
            pencilActive: e.target.value === 'pencil'
        });
    }

    removeSelectedSection = () => {
        if (this.state.currentlySelectedSection) {
            const sectionId = this.state.currentlySelectedSection;
            const channelId = this.props.sections[sectionId].channelId;
            this.props.removeSection(sectionId, channelId);
        }
    }


    render() {
        const gridLines = this._createGridLinesArray();
        const sectionRectsArray = this._createSectionRectsArray();
        
        return (
            <div className="composer__container">
                <div className="composer__controls-container">
                    <CursorSelect 
                        value={this.state.pencilActive ? 'pencil' : 'pointer'}
                        handleChange={this.updateCursorValue.bind(this)}
                    />
                    <button 
                        className="composer__delete-section-button"
                        onClick={this.removeSelectedSection}
                    >Delete Selected Section</button>
                </div>
                <div className="composer__row">
                    <div className="composer__track-info-container-outer">
                        <AddTrackMenu />
                        <div className="composer__track-info-container-inner">
                            {
                                this.props.channels.map((channel, index) => (
                                    <TrackInfo 
                                        trackId={channel.id}
                                        key={channel.id} 
                                    /> 
                                ))
                            }
                        </div>
                    </div>
                    <div className="composer__canvas-container" id="composer-canvas-container">
                        <Stage
                            container={'composer-canvas-container'}
                            onClick={this.handleStageClick}
                            onMouseDown={this.handleStageMouseDown}
                            onMouseUp={this.handleStageMouseUp}
                            ref={this.stageRef}
                            width={740} 
                            height={300} 
                        >
                            <Layer>
                                <Rect 
                                    x={0}
                                    y={0}
                                    width={this.canvasWidth}
                                    height={this.canvasHeight}
                                    fill={'#201826'}
                                />
                                {
                                    gridLines.map((linePoints, index) => (
                                        <Line
                                            points={linePoints}
                                            listening={false}
                                            stroke={'#47426c'}
                                            strokeWidth={2}
                                            shadowColor={'#47426c'}
                                            shadowBlur={4}
                                            shadowOffsetX={0}
                                            shadowOffsetY={0}
                                            key={index}
                                        />
                                    ))
                                }
                            </Layer>
                            <Layer>
                                {
                                    sectionRectsArray.map((section, index) => (
                                        <Rect 
                                            x={section.x}
                                            y={section.y}
                                            sectionId={section.sectionId}
                                            height={section.height}
                                            width={section.width}
                                            fill={
                                                section.sectionId === this.state.currentlySelectedSection ? 
                                                '#222222' :
                                                section.color
                                            }
                                            stroke={UIColors.offWhite}
                                            strokeWidth={2}
                                            type={'section'}
                                            key={index}
                                            onClick={(e) => this.handleSectionClick(e, section.sectionId)}
                                            onDblClick={(e) => this.handleSectionDoubleClick(e, section.sectionId)}
                                        />
                                    ))
                                } 
                            </Layer>
                            <Layer>
                                <Rect 
                                    x={0}
                                    y={0}
                                    width={this.canvasWidth}
                                    height={40}
                                    fill={'#201826'}
                                />
                                {
                                    new Array(200).fill(0).map((el, index) => (
                                        <Text 
                                            text={`${index+1}`}
                                            x={(index+1) * 48}
                                            y={20}
                                            key={index}
                                            fill={'#e0e0e0'}
                                            shadowColor={'#e0e0e0'}
                                            shadowBlur={4}
                                            shadowOffsetX={0}
                                            shadowOffsetY={0}
                                        />
                                    ))
                                }
                            </Layer>
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
                                />
                            </Layer>
                        </Stage>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
    sections: state.sections
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
)(Composer);









/* <Rect 
                                x={0}
                                y={40}
                                height={70}
                                width={48}
                                fill={UIColors.pink}
                                stroke={UIColors.offWhite}
                                strokeWidth={2}
                            />
                            <Rect 
                                x={48}
                                y={40}
                                height={70}
                                width={96}
                                fill={UIColors.pink}
                                stroke={UIColors.offWhite}
                                strokeWidth={2}
                            />
                            <Rect 
                                x={144}
                                y={40}
                                height={70}
                                width={48}
                                fill={UIColors.pink}
                                stroke={UIColors.offWhite}
                                strokeWidth={2}
                            />
                            <Rect 
                                x={192}
                                y={40}
                                height={70}
                                width={48}
                                fill={UIColors.pink}
                                stroke={UIColors.offWhite}
                                strokeWidth={2}
                            />
                            <Rect 
                                x={144}
                                y={110}
                                height={70}
                                width={48}
                                fill={UIColors.brightBlue}
                                stroke={UIColors.offWhite}
                                strokeWidth={2}
                            /> */