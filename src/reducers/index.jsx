import { combineReducers } from 'redux';
import { default as UI } from './UI';
import { default as MissionStore } from './Mission';

const CombinedReducers = combineReducers({ UI, MissionStore });
export default CombinedReducers;