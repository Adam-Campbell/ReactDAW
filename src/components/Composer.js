import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Rect, Line, Text } from 'react-konva';
import Konva from 'konva';
import { debounce, throttle } from 'lodash';
import TrackInfo from './TrackInfo';
import { UIColors } from '../constants';
/*
outer dimensions - 960 x 300

Will consist of track info container, that will hold a track info component for each track, and the
composer canvas, which will display the actual composer view. The composer canvas will have a horizontal
scroll bar, which only scrolls the canvas, and a vertical scroll bar which will scroll the canvas and 
the track info container. 

*/


class Composer extends Component {

    constructor(props) {
        super(props);
        this.foo = 'bar';
        this.canvasWidth = 200 * 48;
        this.canvasHeight = 7 * 70 + 40;
        this.stageRef = React.createRef();
        this.timestampArray = this._createTimestampArray();
    }

    componentDidMount() {
    }

    _createTimestampArray() { 
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
        return parseInt(barsString.charAt(0));
    }

    _createSectionRectsArray = () => {
        let arr = [];
        for (let i = 0; i < this.props.channels.length; i++) {
            let channel = this.props.channels[i];
            for (let sectionId of channel.sectionIds) {
                let section = this.props.sections[sectionId];
                let rectObject = {
                    x: this.barsToNumbers(section.start),
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

    handleStageClick = (e) => {
        console.log(e);
    }

    render() {
        const gridLines = this._createGridLinesArray();
        //const sectionRectsArray = this._createSectionRectsArray();

        return (
            <div className="composer__container">
                <div className="composer__track-info-container-outer">
                    <div className="add-track-menu">
                        <button className="add-track-menu__button">+ Add track</button>
                    </div>
                    <div className="composer__track-info-container-inner">
                        {
                            this.props.channels.map((channel, index) => (
                                <TrackInfo 
                                    trackId={channel.id}
                                    key={index} 
                                /> 
                            ))
                        }
                    </div>
                </div>
                <div className="composer__canvas-container" id="composer-canvas-container">
                    <Stage
                        container={'composer-canvas-container'}
                        onClick={this.handleStageClick}
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
                            <Rect 
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
                            />
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
        );
    }
}

const mapStateToProps = state => ({
    channels: state.channels,
    sections: state.sections
});

export default connect(mapStateToProps)(Composer);