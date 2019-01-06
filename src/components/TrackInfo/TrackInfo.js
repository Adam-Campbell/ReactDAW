import React from 'react';
import PropTypes from 'prop-types';
import TrackColorSwatch from './TrackColorSwatch';

const TrackInfo = props => (
    <div 
        className={`track-info ${props.isSelected && 'selected'}`} 
        onClick={props.handleContainerClick}
    >
        <div>
            {props.isEditingName ?
                <input 
                    ref={props.inputRef}
                    className="track-info__track-name-input"
                    type="text" 
                    value={props.trackName} 
                    onChange={props.updateTrackName}
                    onKeyPress={props.handleInputKeyPress}
                    onClick={(e) => e.stopPropagation()}
                ></input> :
                <p 
                    className="track-info__track-name"
                    onClick={props.enterNameEditMode}
                >{props.trackName}</p>  
            }
            <button 
                className={`track-info__button ${props.isMuted ? 'active' : ''}`}
                onClick={props.handleMuteButtonClick}
            >M</button>
            <button 
                className={`track-info__button ${props.isSolo ? 'active' : ''}`}
                onClick={props.handleSoloButtonClick}
            >S</button>
            <button 
                className="track-info__button"
                onClick={props.handleSettingsButtonClick}
            >O</button>
            <button 
                className="track-info__button"
                onClick={props.handleDeleteButtonClick}
            >X</button>
        </div>
        <div className="track-info__color-picker">
            <span 
                className="track-info__color-swatch"
                onClick={props.enterColorEditMode}
                ref={props.swatchNodeRef}
                style={{
                    backgroundColor: props.trackColor,
                    color: props.trackColor
                }}
            ></span>
            {
                props.isEditingTrackColor && (
                    <TrackColorSwatch 
                        handleColorSwatchClick={props.handleColorSwatchClick}
                        nodeRef={props.swatchNodeRef.current}
                        exitColorEditMode={props.exitColorEditMode}
                    />
                )
            }
        </div>
    </div>
);

TrackInfo.propTypes = {
    // react refs
    inputRef: PropTypes.object.isRequired,
    swatchNodeRef: PropTypes.object.isRequired,
    // values
    isSelected: PropTypes.bool.isRequired,
    isEditingName: PropTypes.bool.isRequired,
    trackName: PropTypes.string.isRequired,
    trackColor: PropTypes.string.isRequired,
    isEditingTrackColor: PropTypes.bool.isRequired,
    isMuted: PropTypes.bool.isRequired,
    isSolo: PropTypes.bool.isRequired,
    // callback functions
    handleContainerClick: PropTypes.func.isRequired,
    updateTrackName: PropTypes.func.isRequired,
    handleInputKeyPress: PropTypes.func.isRequired,
    enterNameEditMode: PropTypes.func.isRequired,
    handleMuteButtonClick: PropTypes.func.isRequired,
    handleSoloButtonClick: PropTypes.func.isRequired,
    handleSettingsButtonClick: PropTypes.func.isRequired,
    handleDeleteButtonClick: PropTypes.func.isRequired,
    enterColorEditMode: PropTypes.func.isRequired,
    exitColorEditMode: PropTypes.func.isRequired,
    handleColorSwatchClick: PropTypes.func.isRequired,
};

export default TrackInfo;