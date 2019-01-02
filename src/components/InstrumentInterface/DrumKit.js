import React from 'react';
import PropTypes from 'prop-types';
import HeaderModule from './HeaderModule';
import { drumSampleURLs } from '../../constants';
import DrumModule from './DrumModule';

const DrumKit = props => (
    <div className="synth-interface__container">
        <HeaderModule synthTitle="Drum Kit" />
        <div className="synth-interface__module-container">
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
                    { value: drumSampleURLs.kick010, text: 'Kick 010' },
                    { value: drumSampleURLs.kick011, text: 'Kick 011' },
                    { value: drumSampleURLs.kick012, text: 'Kick 012' },
                    { value: drumSampleURLs.kick013, text: 'Kick 013' },
                    { value: drumSampleURLs.kick014, text: 'Kick 014' },
                    { value: drumSampleURLs.kick015, text: 'Kick 015' },
                    { value: drumSampleURLs.kick016, text: 'Kick 016' },
                    { value: drumSampleURLs.kick017, text: 'Kick 017' },
                    { value: drumSampleURLs.kick018, text: 'Kick 018' },
                    { value: drumSampleURLs.kick019, text: 'Kick 019' },
                    { value: drumSampleURLs.kick020, text: 'Kick 020' },
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
                    { value: drumSampleURLs.snare007, text: 'Snare 007' },
                    { value: drumSampleURLs.snare008, text: 'Snare 008' },
                    { value: drumSampleURLs.snare009, text: 'Snare 009' },
                    { value: drumSampleURLs.snare010, text: 'Snare 010' },
                    { value: drumSampleURLs.snare011, text: 'Snare 011' },
                    { value: drumSampleURLs.snare012, text: 'Snare 012' },
                    { value: drumSampleURLs.snare013, text: 'Snare 013' },
                    { value: drumSampleURLs.snare014, text: 'Snare 014' },
                    { value: drumSampleURLs.snare015, text: 'Snare 015' },
                    { value: drumSampleURLs.snare016, text: 'Snare 016' },
                    { value: drumSampleURLs.snare017, text: 'Snare 017' },
                    { value: drumSampleURLs.snare018, text: 'Snare 018' },
                    { value: drumSampleURLs.snare019, text: 'Snare 019' },
                    { value: drumSampleURLs.snare020, text: 'Snare 020' },
                    { value: drumSampleURLs.snare021, text: 'Snare 021' },
                    { value: drumSampleURLs.snare022, text: 'Snare 022' },
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
                    { value: drumSampleURLs.clap004, text: 'Clap 004' },
                    { value: drumSampleURLs.clap005, text: 'Clap 005' },
                    { value: drumSampleURLs.clap006, text: 'Clap 006' },
                    { value: drumSampleURLs.clap007, text: 'Clap 007' },
                    { value: drumSampleURLs.clap008, text: 'Clap 008' },
                    { value: drumSampleURLs.clap009, text: 'Clap 009' },
                    { value: drumSampleURLs.clap010, text: 'Clap 010' }
                ]}
            />
        </div>
        <div className="synth-interface__module-container">
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
                    { value: drumSampleURLs.closedHat006, text: 'Closed Hat 006' },
                    { value: drumSampleURLs.closedHat007, text: 'Closed Hat 007' },
                    { value: drumSampleURLs.closedHat008, text: 'Closed Hat 008' },
                    { value: drumSampleURLs.closedHat009, text: 'Closed Hat 009' },
                    { value: drumSampleURLs.closedHat010, text: 'Closed Hat 010' },
                    { value: drumSampleURLs.closedHat011, text: 'Closed Hat 011' },
                    { value: drumSampleURLs.closedHat012, text: 'Closed Hat 012' },
                    { value: drumSampleURLs.closedHat013, text: 'Closed Hat 013' },
                    { value: drumSampleURLs.closedHat014, text: 'Closed Hat 014' },
                    { value: drumSampleURLs.closedHat015, text: 'Closed Hat 015' },
                    { value: drumSampleURLs.closedHat016, text: 'Closed Hat 016' }
                ]}   
            />
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
                    { value: drumSampleURLs.openHat005, text: 'Open Hat 005' },
                    { value: drumSampleURLs.openHat006, text: 'Open Hat 006' },
                    { value: drumSampleURLs.openHat007, text: 'Open Hat 007' },
                    { value: drumSampleURLs.openHat008, text: 'Open Hat 008' },
                    { value: drumSampleURLs.openHat009, text: 'Open Hat 009' }
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
                    { value: drumSampleURLs.crash004, text: 'Crash 004' },
                    { value: drumSampleURLs.crash005, text: 'Crash 005' }
                ]}   
            />
        </div>
        <div className="synth-interface__module-container">
            <DrumModule 
                drumType="ride"
                drumName="Ride"
                drumData={props.instrumentData.ride}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.ride001, text: 'Ride 001' },
                    { value: drumSampleURLs.ride002, text: 'Ride 002' },
                    { value: drumSampleURLs.ride003, text: 'Ride 003' },
                    { value: drumSampleURLs.ride004, text: 'Ride 004' },
                    { value: drumSampleURLs.ride005, text: 'Ride 005' },
                    { value: drumSampleURLs.ride006, text: 'Ride 006' },
                    { value: drumSampleURLs.ride007, text: 'Ride 007' }
                ]}   
            />
            <DrumModule 
                drumType="highTom"
                drumName="High Tom"
                drumData={props.instrumentData.highTom}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.highTom001, text: 'High Tom 001' },
                    { value: drumSampleURLs.highTom002, text: 'High Tom 002' },
                    { value: drumSampleURLs.highTom003, text: 'High Tom 003' },
                    { value: drumSampleURLs.highTom004, text: 'High Tom 004' },
                    { value: drumSampleURLs.highTom005, text: 'High Tom 005' }
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
                    { value: drumSampleURLs.midTom003, text: 'Mid Tom 003' },
                    { value: drumSampleURLs.midTom004, text: 'Mid Tom 004' },
                    { value: drumSampleURLs.midTom005, text: 'Mid Tom 005' },
                    { value: drumSampleURLs.midTom006, text: 'Mid Tom 006' }
                ]}   
            />
        </div>
        <div className="synth-interface__module-container">
            <DrumModule 
                drumType="lowTom"
                drumName="Low Tom"
                drumData={props.instrumentData.lowTom}
                instrumentId={props.instrumentId}
                handleChange={props.handleChange}
                drumSampleOptions={[
                    { value: drumSampleURLs.lowTom001, text: 'Low Tom 001' },
                    { value: drumSampleURLs.lowTom002, text: 'Low Tom 002' },
                    { value: drumSampleURLs.lowTom003, text: 'Low Tom 003' },
                    { value: drumSampleURLs.lowTom004, text: 'Low Tom 004' },
                    { value: drumSampleURLs.lowTom005, text: 'Low Tom 005' }
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
                    { value: drumSampleURLs.fx004, text: 'FX 004' },
                    { value: drumSampleURLs.fx005, text: 'FX 005' },
                    { value: drumSampleURLs.fx006, text: 'FX 006' },
                    { value: drumSampleURLs.fx007, text: 'FX 007' },
                    { value: drumSampleURLs.fx008, text: 'FX 008' },
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