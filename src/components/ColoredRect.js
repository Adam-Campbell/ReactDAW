import React, { Component } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';

class ColoredRect extends Component {
    state = {
        color: 'green'
    };

    handleClick = (e) => {
        //console.log(e.target);
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    };

    render() {
        return (
            <Rect
                x={20}
                y={20}
                pitch={'C5'}
                width={50}
                height={50}
                fill={this.state.color}
                shadowBlur={5}
                onClick={this.handleClick}
                onTap={this.handleClick}
            />
        );
    }
}
// onClick={this.handleClick}
export default ColoredRect;