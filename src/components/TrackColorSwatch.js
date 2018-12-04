import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { UIColors } from '../constants';
/*



*/

class TrackColorSwatch extends Component {
    constructor(props) {
        super(props);
        this.root = document.getElementById('color-swatch-modal-root');
        this.el = document.createElement('div');
        const { top, left, width } = this.props.nodeRef.getBoundingClientRect();
        this.topPos = top;
        this.leftPos = left + width;
    }

    componentDidMount() {
        this.root.appendChild(this.el);
        window.document.addEventListener('click', this.props.exitColorEditMode);
    }

    componentWillUnmount() {
        this.root.removeChild(this.el);
        window.document.removeEventListener('click', this.props.exitColorEditMode);
    }

    render() {
        return ReactDOM.createPortal(
            <div
                style={{
                    position: 'absolute',
                    top: `${this.topPos}px`,
                    left: `${this.leftPos}px`
                }}
            >
                <span 
                    className="track-color-picker__color-swatch"
                    onClick={() =>this.props.handleColorSwatchClick(UIColors.pink)}
                    style={{
                        backgroundColor: UIColors.pink,
                        color: UIColors.pink
                    }}
                ></span>
                <span 
                    className="track-color-picker__color-swatch"
                    onClick={() =>this.props.handleColorSwatchClick(UIColors.brightBlue)}
                    style={{
                        backgroundColor: UIColors.brightBlue,
                        color: UIColors.brightBlue
                    }}
                ></span>
                <span 
                    className="track-color-picker__color-swatch"
                    onClick={() =>this.props.handleColorSwatchClick(UIColors.brightYellow)}
                    style={{
                        backgroundColor: UIColors.brightYellow,
                        color: UIColors.brightYellow
                    }}
                ></span>
                <span 
                    className="track-color-picker__color-swatch"
                    onClick={() =>this.props.handleColorSwatchClick(UIColors.brightRed)}
                    style={{
                        backgroundColor: UIColors.brightRed,
                        color: UIColors.brightRed
                    }}
                ></span>
                <span 
                    className="track-color-picker__color-swatch"
                    onClick={() =>this.props.handleColorSwatchClick(UIColors.brightGreen)}
                    style={{
                        backgroundColor: UIColors.brightGreen,
                        color: UIColors.brightGreen
                    }}
                ></span>
            </div>,
            this.el
        );
    }
}

export default TrackColorSwatch;