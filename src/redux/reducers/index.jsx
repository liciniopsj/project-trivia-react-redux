import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import player from './playerReducer';

const rootReducer = combineReducers({
  gameReducer,
  player,
});

export default rootReducer;
