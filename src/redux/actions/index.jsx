import { REQUEST_API, ADD_NAME_EMAIL, ADD_SCORE } from './actionsTypes';

export const requestApi = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  return fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_API,
      token: data.token }))
    .catch((err) => {
      console.log(err);
    });
};

export const addNomeEmail = (nome, email) => ({
  type: ADD_NAME_EMAIL,
  payload: {
    name: nome,
    email,
  },
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: {
    score,
  },
});
