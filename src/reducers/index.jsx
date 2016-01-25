import { combineReducers } from 'redux';
import { default as UI } from './ui';

const CombinedReducers = combineReducers({ UI });
export default CombinedReducers;