import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DraggableWindow from '../DraggableWindow';
import { DraggableWindowContextConsumer } from '../DraggableWindowContext';
import PianoRoll from '../PianoRoll';
import InstrumentInterface from '../InstrumentInterface';
import TrackDetails from '../TrackDetails';
import EffectInterface from '../EffectInterface';
import Mixer from '../Mixer';

const ActiveWindows = props => (
  <DraggableWindowContextConsumer>
		{({
			windows,
			mouseDownX,
			mouseDownY,
			subscribeWindow,
			unsubscribeWindow,
		}) => {
			return props.activeWindows.map((window) => {
				switch (window.type) {
					case 'section':
						return (
							<DraggableWindow 
								windowId={window.id} 
								key={window.id} 
								windowType={window.type}
								subscribeWindow={subscribeWindow}
								unsubscribeWindow={unsubscribeWindow}
								mouseDownX={mouseDownX}
								mouseDownY={mouseDownY}
								windows={windows}
							>
								{({ containerRef }) => <PianoRoll id={window.id} containerRef={containerRef}/>}
							</DraggableWindow>
						);
										
					case 'synth':
						return (
							<DraggableWindow 
								windowId={window.id} 
								key={window.id} 
								windowType={window.type}
								subscribeWindow={subscribeWindow}
								unsubscribeWindow={unsubscribeWindow}
								mouseDownX={mouseDownX}
								mouseDownY={mouseDownY} 
								windows={windows}
							>
								{({ containerRef }) => <InstrumentInterface instrumentId={window.id} containerRef={containerRef} />}
							</DraggableWindow>
						);

					case 'instrumentSettings':
						return (
							<DraggableWindow 
								windowId={window.id} 
								key={window.id} 
								windowType={window.type}
								subscribeWindow={subscribeWindow}
								unsubscribeWindow={unsubscribeWindow}
								mouseDownX={mouseDownX}
								mouseDownY={mouseDownY}
								windows={windows}
							>
								{({ containerRef }) => <TrackDetails trackId={window.id} containerRef={containerRef} />}
							</DraggableWindow>
						);

					case 'effect':
						return (
							<DraggableWindow 
								windowId={window.id} 
								key={window.id} 
								windowType={window.type}
								subscribeWindow={subscribeWindow}
								unsubscribeWindow={unsubscribeWindow}
								mouseDownX={mouseDownX}
								mouseDownY={mouseDownY}
								windows={windows}
							>
								{({ containerRef }) => <EffectInterface effectId={window.id} containerRef={containerRef} />}
							</DraggableWindow>
						);

					case 'mixer':
						return (
							<DraggableWindow 
								windowId={window.id} 
								key={window.id} 
								windowType={window.type}
								subscribeWindow={subscribeWindow}
								unsubscribeWindow={unsubscribeWindow}
								mouseDownX={mouseDownX}
								mouseDownY={mouseDownY}
								windows={windows}
							>
								{({ containerRef }) => <Mixer containerRef={containerRef} />}
							</DraggableWindow>
						);

					default:
						return null;
				} // end switch
			}); // end map
		}}  
  </DraggableWindowContextConsumer>
);

const mapStateToProps = state => ({
    activeWindows: state.activeWindows
});

export default connect(mapStateToProps)(ActiveWindows);
