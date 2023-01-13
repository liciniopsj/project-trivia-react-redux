export const fetchToken = async () => {
  try {
    const url = 'https://opentdb.com/api_token.php?command=request';

    const response = await fetch(url);
    const { token } = await response.json();

    return token;
  } catch (e) {
    return 'INVALID_TOKEN';
  }
};

export const fetchQuestions = async (quantity, token) => {
  try {
    const url = `https://opentdb.com/api.php?amount=${quantity}&token=${token}`;
    const response = await fetch(url);
    const { results } = await response.json();

    return results;
  } catch (e) {
    return {};
  }
};
