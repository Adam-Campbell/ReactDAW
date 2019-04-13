import React from 'react';
import { Layer, Rect } from 'react-konva';
import PropTypes from 'prop-types';
import { UIColors } from '../../constants';

/**
 * Handles the click of a piano key.
 * @param {Object} e - the event object
 * @param {String} pitch - the pitch of the key that was clicked
 * @param {String} channelId - the id of the channel this section belongs to
 */
const handlePianoKeyClick = (e, pitch, channelId) => {
    // Trigger a note to play on the instrument corresponding to this channel, but do it by directly 
    // interacting with the instrument rather than going through Redux, since this is not state that
    // should be persisted in any way. 
    e.cancelBubble = true;
    window.instrumentReferences[channelId].triggerAttackRelease(pitch, '8n');
};

const PianoKeyLayer = props => (
    <Layer
        y={40}
        ref={props.pianoKeyLayerRef}
    >
        {props.pitchesArray.map((pitch, index) => (
            <Rect 
                x={0}
                y={index * 16}
                width={48}
                height={16}
                stroke={UIColors.backgroundDark}
                strokeWidth={2}
                fill={pitch.includes('#') ? UIColors.backgroundMedium : UIColors.offWhite} 
                key={index} 
                pitch={pitch}
                type={'pianoKeyRect'}
                onClick={e => handlePianoKeyClick(e, pitch, props.channelId)}
                onMouseDown={e => { e.cancelBubble = true; }}
                onMouseUp={e => { e.cancelBubble = true; }}
            />
        ))}
    </Layer>
);

PianoKeyLayer.propTypes = {
    pianoKeyLayerRef: PropTypes.object.isRequired,
    pitchesArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    channelId: PropTypes.string.isRequired
};

export default PianoKeyLayer;