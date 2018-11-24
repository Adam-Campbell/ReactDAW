import { combineReducers } from 'redux';
import sectionInfo from './sectionInfoReducer';
import eventQueue from './eventQueueReducer';
import playerInfo from './playerInfoReducer';

export default combineReducers({
    sectionInfo,
    eventQueue,
    playerInfo
});