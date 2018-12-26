import { combineReducers } from 'redux';
import playerInfo from './playerInfoReducer';
import channels from './channelsReducer';
import activeWindows from './activeWindowsReducer';
import sections from './sectionsReducer';
import instruments from './instrumentsReducer';
import effects from './effectsReducer';

export default combineReducers({
    playerInfo,
    activeWindows,
    channels,
    sections,
    instruments,
    effects
});

