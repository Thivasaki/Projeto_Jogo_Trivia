import { combineReducers } from 'redux';
import player from './player';
import question from './questions';

const rootReducers = combineReducers({
  player,
  question,

});
export default rootReducers;
