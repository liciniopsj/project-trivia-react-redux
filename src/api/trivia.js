export const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';

  const response = await fetch(url);
  const { token } = await response.json();

  return token;
};

export const fetchResponses = async (token) => {
  const questions = 5;
  const url = `https://opentdb.com/api.php?amount=${questions}&token=${token}`;
  const response = await fetch(url);
  const { results } = await response.json();

  return results;
};