import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { UIColors } from '../../constants';

/*

A, D, R => width ranges from 0 to 60, height always 100
S => width always 60, height ranges from 0 to 100.
Line defined by a points array expressed as [x1, y1, x2, y2]

To work out the horizontal position for A, D, R, take the current value x, and (x / 0.995) * 60
To work out vertical position for S, 100 - ((x / 0.995) * 100)

Defining the line points.

let ah = horizontal position for a
let dh = horizontal position for d
let sv = vertical position for s
let rh = horizontal position for release

points for a = [0, 0, ah, 100]
points for d = [ah, 100, ah+dh, sv]
points for s = [ah+dh, sv, ah+dh+60, sv]
points for r = [ah+dh+60, sv, ah+dh+60+rg, 0]

*/

export const calculateLinePoints = (attack, decay, sustain, release) => {
    const aW = (attack / 0.995) * 60;
    const dW = (decay / 0.995) * 60;
    const sH = 100 - ((sustain / 0.995) * 100);
    const rW = (release / 0.995) * 60; 
    return {
        attackPoints: [0, 100, aW, 0],
        decayPoints: [aW, 0, aW+dW, sH],
        sustainPoints: [aW+dW, sH, aW+dW+60, sH],
        releasePoints: [aW+dW+60, sH, aW+dW+60+rW, 100]
    };
}

class ADSRDisplay extends Component {

    static propTypes = {
        attack: PropTypes.number.isRequired,
        decay: PropTypes.number.isRequired,
        sustain: PropTypes.number.isRequired,
        release: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.stageRef = React.createRef();
    }

    componentWillUnmount() {
        if (this.stageRef.current) {
            this.stageRef.current.content = null;
        }
    }

    render() {
        const {
            attackPoints,
            decayPoints,
            sustainPoints,
            releasePoints
        } = calculateLinePoints(
            this.props.attack, 
            this.props.decay, 
            this.props.sustain, 
            this.props.release
        );
        return (
            <div id={this.props.id}>
                <Stage
                    container={this.props.id}
                    ref={this.stageRef}
                    width={300} 
                    height={120} 
                >
                    <Layer>
                        <Rect 
                            x={0}
                            y={0}
                            width={300}
                            height={120}
                            fill={UIColors.lightPurple}
                        />
                    </Layer>
                    <Layer x={30} y={10}>
                        <Line 
                            points={attackPoints}
                            listening={false}
                            stroke={UIColors.offWhite}
                            strokeWidth={3}  
                        />
                        <Line 
                            points={decayPoints}
                            listening={false}
                            stroke={UIColors.offWhite}
                            strokeWidth={3}  
                        />
                        <Line 
                            points={sustainPoints}
                            listening={false}
                            stroke={UIColors.offWhite}
                            strokeWidth={3}  
                        />
                        <Line 
                            points={releasePoints}
                            listening={false}
                            stroke={UIColors.offWhite}
                            strokeWidth={3}  
                        />
                    </Layer>
                </Stage>
            </div>
        )
    }
}

export default ADSRDisplay;