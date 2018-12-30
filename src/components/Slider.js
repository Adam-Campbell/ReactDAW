import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttle, debounce } from 'lodash';
import * as ActionCreators from '../actions';


/*

In mouseMove event, figure out the how far from the bottom of the sliderTrack the mouse is.
If the mouse is fully above or below the sliderTrack then just return early, we won't be doing
any work.
Convert this to a percentage => (posFromBottom / sliderTrackHeight) * 100;
Work out the value that resides at that point within the range being manipulated (in this case
it's just 0 to 100 so the conversion isn't necessary but that won't always be the case).

*/

class Slider extends Component {
    constructor(props) {
        super(props);
        this.sliderHandleHeight = 16;
        this.sliderTrackHeight = 100;
        this.sliderTrackRef = React.createRef();
        this.handleMouseMove = throttle(this._handleMouseMove, 16).bind(this);
        //this.handleMouseMove = debounce(this._handleMouseMove, 16, { leading: true, trailing: true }).bind(this);
        this.state = {
            sliderActive: false,
            sliderTrackTop: null,
            sliderTrackBottom: null,
            dataRangeMin: 0,
            dataRangeMax: 100,
            dataRange: 100
        }
    }

    componentDidMount() {
        const { top, bottom } = this.sliderTrackRef.current.getBoundingClientRect();
        this.setState({
            sliderTrackTop: top,
            sliderTrackBottom: bottom,
        });
    }

    makeSliderActive = () => {
        this.setState({
            sliderActive: true
        }, () => console.log('slider has been made active'));
    }

    makeSliderInactive = () => {
        this.setState({
            sliderActive: false
        }, () => console.log('slider has been made inactive'));
    }


    _handleMouseMove = (e) => {
        if (!this.state.sliderActive) return;
        const { top, bottom, height } = this.sliderTrackRef.current.getBoundingClientRect();
        const rawY = e.clientY;
        // return early if the latest y position is not within the range of the sliderTrack
        if (rawY < (top + this.sliderHandleHeight) || rawY > bottom) return;

        const { dataRange, dataRangeMin, dataRangeMax } = this.state;
        // adjust the range of movement to account for the height of the handle. 
        const adjustedSliderRange = height - this.sliderHandleHeight;
        // take the current y position relative to the slider track and convert to decimal
        const yAsDecimal = (bottom - rawY) / adjustedSliderRange;
        // get the value within our dataRange that resides at the decimal location calculated
        // previously.
        const dataRangeValueAtDecimal = dataRangeMin + (dataRange * yAsDecimal);
        this.props.updateSlider(dataRangeValueAtDecimal);
    }

    sliderValueToPercent = (sliderValue) => {
        const { dataRange, dataRangeMin } = this.state;
        const percentVal = (sliderValue - dataRangeMin) / dataRange * 100;
        return percentVal;
    }

    sliderValueToPixels = (sliderValue) => {
        const { dataRange, dataRangeMin } = this.state;
        //const { top, bottom, height } = this.sliderTrackRef.current.getBoundingClientRect();
        const decimalVal = (sliderValue - dataRangeMin) / dataRange;
        const pixelValue = (this.sliderTrackHeight - this.sliderHandleHeight) * decimalVal;
        return pixelValue;
    }

    __handleMouseMove = (e) => {
        if (!this.state.sliderActive) return;
        const { top, bottom, height } = this.sliderTrackRef.current.getBoundingClientRect();
        const rawY = e.clientY;
        // return early if the latest y position is not within the range of the sliderTrack
        if (rawY < (top + this.sliderHandleHeight) || rawY > bottom) return;

        // get the y position as a percent value relative to the sliderTrack, with 0 as the bottom
        // of the sliderTrack, and 100 as the top
        const yAsDecimal = (bottom - rawY) / (height - this.sliderHandleHeight);
        
        const { range, rangeMin, rangeMax } = this.state;
        
        const rangeValueAtDecimal = (range * yAsDecimal) + rangeMin;

        this.props.updateSlider(rangeValueAtDecimal);
        // const sliderTrackHeight = this.state.sliderTrackBottom - this.state.sliderTrackTop;
        // const y = e.clientY;
        // const yRelativeToSliderTrack = this.state.sliderTrackBottom - y;
        // //const asPercent = (yRelativeToSliderTrack)
        // if (yRelativeToSliderTrack >= 0 && yRelativeToSliderTrack <= sliderTrackHeight) {
        //     this.props.updateSlider(yRelativeToSliderTrack);
        // }
    }

    render() {
        return (
            <div 
                className="slider__container"
                onMouseUp={this.makeSliderInactive}
                onMouseMove={(e) => {
                    e.persist();
                    this.handleMouseMove(e);
                }}
            >
                <span className="slider__track" ref={this.sliderTrackRef}>
                    <span 
                        className="slider__handle"
                        style={{
                            bottom: `${this.sliderValueToPixels(this.props.slider)}px`
                        }}
                        onMouseDown={this.makeSliderActive}
                    ></span>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(
    mapStateToProps,
    {
        updateSlider: ActionCreators.updateSlider
    }
)(Slider);
