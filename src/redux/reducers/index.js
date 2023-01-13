import { combineReducers } from 'redux';
import {
  ERROR,
  FETCHING_QUESTIONS,
  RETRIEVED_QUESTIONS,
  SAVE_GRAVATAR_LINK,
  SAVE_SESSION_TOKEN,
  SAVE_USER_NAME,
} from '../actions';

const INITIAL_GAME_STATE = {
  sessionToken: '',
  userName: '',
  gravatarLink: '',
  status: '',
  questions: [],
};

const login = (state = INITIAL_GAME_STATE, action) => {
  switch (action.type) {
  case ERROR:
    return {
      ...state,
      status: action.error,
    };
  case SAVE_SESSION_TOKEN:
    return {
      ...state,
      sessionToken: action.payload,
    };
  case SAVE_USER_NAME:
    return {
      ...state,
      userName: action.payload,
    };
  case SAVE_GRAVATAR_LINK:
    return {
      ...state,
      gravatarLink: action.payload,
    };
  case FETCHING_QUESTIONS:
    return {
      ...state,
      status: action.payload,
    };
  case RETRIEVED_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ login });

export default rootReducer;
