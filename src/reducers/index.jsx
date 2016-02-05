import { combineReducers } from 'redux';
import { default as UI } from './UI';
import { default as Mission } from './Mission';

const CombinedReducers = combineReducers({ UI, Mission });
export default CombinedReducers;