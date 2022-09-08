import { combineReducers } from 'redux';
import playerReducer from './player';

const rootReducers = combineReducers({
  player: playerReducer,

});
export default rootReducers;
