import React from 'react';
import PropTypes from 'prop-types';
import HeaderModule from './HeaderModule';
import drumSampleURLs from '../../soundFiles';
import DrumModule from './DrumModule';

const DrumKit = props => (
    <div className="instrument-interface__container">
        <HeaderModule instrumentTitle="Drum Kit" />
        <div className="instrument-interface__drum-module-row">
            <DrumModule 
                drumType="kick"
                drumName="Kick"
                drumData={props.instrumentData.kick}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.kick001, text: 'Kick 001' },
                    { value: drumSampleURLs.kick002, text: 'Kick 002' },
                    { value: drumSampleURLs.kick003, text: 'Kick 003' },
                    { value: drumSampleURLs.kick004, text: 'Kick 004' },
                    { value: drumSampleURLs.kick005, text: 'Kick 005' },
                    { value: drumSampleURLs.kick006, text: 'Kick 006' },
                    { value: drumSampleURLs.kick007, text: 'Kick 007' },
                    { value: drumSampleURLs.kick008, text: 'Kick 008' },
                    { value: drumSampleURLs.kick009, text: 'Kick 009' },
                    { value: drumSampleURLs.kick010, text: 'Kick 010' }
                ]}
            />
            <DrumModule 
                drumType="snare"
                drumName="Snare"
                drumData={props.instrumentData.snare}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.snare001, text: 'Snare 001' },
                    { value: drumSampleURLs.snare002, text: 'Snare 002' },
                    { value: drumSampleURLs.snare003, text: 'Snare 003' },
                    { value: drumSampleURLs.snare004, text: 'Snare 004' },
                    { value: drumSampleURLs.snare005, text: 'Snare 005' },
                    { value: drumSampleURLs.snare006, text: 'Snare 006' },
                    { value: drumSampleURLs.snare007, text: 'Snare 007' }
                ]}   
            />
            <DrumModule 
                drumType="clap"
                drumName="Clap"
                drumData={props.instrumentData.clap}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.clap001, text: 'Clap 001' },
                    { value: drumSampleURLs.clap002, text: 'Clap 002' },
                    { value: drumSampleURLs.clap003, text: 'Clap 003' },
                    { value: drumSampleURLs.clap004, text: 'Clap 004' }
                ]}
            />
            <DrumModule 
                drumType="closedHat"
                drumName="Closed Hat"
                drumData={props.instrumentData.closedHat}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.closedHat001, text: 'Closed Hat 001' },
                    { value: drumSampleURLs.closedHat002, text: 'Closed Hat 002' },
                    { value: drumSampleURLs.closedHat003, text: 'Closed Hat 003' },
                    { value: drumSampleURLs.closedHat004, text: 'Closed Hat 004' },
                    { value: drumSampleURLs.closedHat005, text: 'Closed Hat 005' },
                    { value: drumSampleURLs.closedHat006, text: 'Closed Hat 006' }
                ]}   
            />
        </div>
        <div className="instrument-interface__drum-module-row">
            <DrumModule 
                drumType="openHat"
                drumName="Open Hat"
                drumData={props.instrumentData.openHat}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.openHat001, text: 'Open Hat 001' },
                    { value: drumSampleURLs.openHat002, text: 'Open Hat 002' },
                    { value: drumSampleURLs.openHat003, text: 'Open Hat 003' },
                    { value: drumSampleURLs.openHat004, text: 'Open Hat 004' },
                    { value: drumSampleURLs.openHat005, text: 'Open Hat 005' }
                ]}   
            />
            <DrumModule 
                drumType="crash"
                drumName="Crash"
                drumData={props.instrumentData.crash}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.crash001, text: 'Crash 001' },
                    { value: drumSampleURLs.crash002, text: 'Crash 002' },
                    { value: drumSampleURLs.crash003, text: 'Crash 003' },
                    { value: drumSampleURLs.crash004, text: 'Crash 004' }
                ]}   
            />
            <DrumModule 
                drumType="ride"
                drumName="Ride"
                drumData={props.instrumentData.ride}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.ride001, text: 'Ride 001' },
                    { value: drumSampleURLs.ride002, text: 'Ride 002' },
                    { value: drumSampleURLs.ride003, text: 'Ride 003' }
                ]}   
            />
            <DrumModule 
                drumType="fx"
                drumName="fx"
                drumData={props.instrumentData.fx}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.fx001, text: 'FX 001' },
                    { value: drumSampleURLs.fx002, text: 'FX 002' },
                    { value: drumSampleURLs.fx003, text: 'FX 003' },
                    { value: drumSampleURLs.fx004, text: 'FX 004' }
                ]}   
            />
        </div>
        <div className="instrument-interface__drum-module-row">
            <DrumModule 
                drumType="highTom"
                drumName="High Tom"
                drumData={props.instrumentData.highTom}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.highTom001, text: 'High Tom 001' },
                    { value: drumSampleURLs.highTom002, text: 'High Tom 002' },
                    { value: drumSampleURLs.highTom003, text: 'High Tom 003' }
                ]}   
            />
            <DrumModule 
                drumType="midTom"
                drumName="Mid Tom"
                drumData={props.instrumentData.midTom}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.midTom001, text: 'Mid Tom 001' },
                    { value: drumSampleURLs.midTom002, text: 'Mid Tom 002' },
                    { value: drumSampleURLs.midTom003, text: 'Mid Tom 003' }
                ]}   
            />
            <DrumModule 
                drumType="lowTom"
                drumName="Low Tom"
                drumData={props.instrumentData.lowTom}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.lowTom001, text: 'Low Tom 001' },
                    { value: drumSampleURLs.lowTom002, text: 'Low Tom 002' }
                ]}   
            />
        </div>
    </div>
);

DrumKit.propTypes = {
    instrumentData: PropTypes.object.isRequired,
    instrumentId: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default DrumKit;