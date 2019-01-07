import { combineReducers } from 'redux';
import playerInfo from './playerInfoReducer';
import channels from './channelsReducer';
import activeWindows from './activeWindowsReducer';
import sections from './sectionsReducer';
import instruments from './instrumentsReducer';
import effects from './effectsReducer';
import modals from './modalsReducer';
import composition from './compositionReducer';

export default combineReducers({
    playerInfo,
    composition,
    activeWindows,
    channels,
    sections,
    instruments,
    effects,
    modals
});

