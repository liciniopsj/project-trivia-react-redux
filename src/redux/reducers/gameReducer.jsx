import { REQUEST_API } from '../actions/actionsTypes';

const INITIAL_STATE = {
  token: '',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default gameReducer;
