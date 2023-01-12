import { combineReducers } from 'redux';

const INITIAL_GAME_STATE = {};

const exampleReducer = (state = INITIAL_GAME_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer });

export default rootReducer;
