const fetchQuestions = async () => {
  const token = localStorage.getItem('token');
  const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export default fetchQuestions;
