import { combineReducers } from 'redux';
import sectionInfo from './sectionInfoReducer';
import playerInfo from './playerInfoReducer';
import channels from './channelsReducer';
import activeWindows from './activeWindowsReducer';
import sections from './sectionsReducer';
import instruments from './instrumentsReducer';

export default combineReducers({
    sectionInfo,
    playerInfo,
    activeWindows,
    channels,
    sections,
    instruments
});

