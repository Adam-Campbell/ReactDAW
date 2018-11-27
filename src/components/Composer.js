import React, { Component } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import Konva from 'konva';

class Composer extends Component {

    constructor(props) {
        super(props);
        this.foo = 'bar';
        //this.lines = this._createLinesArray();
        this.lines = [48, 96, 144, 192, 240, 288, 336, 384, 432, 480, 528, 576, 624, 672, 720,
        768, 816, 864, 912, 960, 1008, 1056, 1104, 1152, 1200];
        this.handleClick = this._handleClick.bind(this);
    }

    _createLinesArray() {

    }

    _handleClick(e) {
        //console.log(e);
        // clientX, clientY, pageX, pageY, screenX, screenY, target, currentTarget
        //console.log(e.clientX);
        //console.log(e.clientY);
        console.log(e.target.getBoundingClientRect(), e.currentTarget.getBoundingClientRect());

    }

    render() {
        return (
            <div className="composer__container" onClick={this.handleClick}>
                <svg width="100%" height="350px" xmlns="http://www.w3.org/2000/svg">
                    
                    
                    {
                        this.lines.map((xPos, index) => {
                            return <rect 
                                    x={`${xPos}px`} 
                                    y="0px" 
                                    width="1" 
                                    height="350px" 
                                    fill="slateblue"
                                    key={index} 
                                />
                        })
                    }
                    <rect x={0} y={0} height={'32px'} width={'96px'} fill="crimson" stroke="#222222"/>
                    <rect x={'96px'} y={0} height={'32px'} width={'192px'} fill="crimson" stroke="#222222"/>
                </svg>
            </div>
        );
    }
}


// <svg viewBox="0 0 220 100" width="100%" height="350px" xmlns="http://www.w3.org/2000/svg">
export default Composer;