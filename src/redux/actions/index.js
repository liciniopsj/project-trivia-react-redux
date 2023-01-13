import { fetchQuestions } from '../../api/trivia';

export const SAVE_SESSION_TOKEN = 'SAVE_SESSION_TOKEN';
export const SAVE_USER_NAME = 'SAVE_USER_NAME';
export const SAVE_GRAVATAR_LINK = 'SAVE_GRAVATAR_LINK';
export const FETCHING_QUESTIONS = 'FETCHING_QUESTIONS';
export const RETRIEVED_QUESTIONS = 'RETRIEVED_QUESTIONS';
export const ERROR = 'ERROR';

export const saveTokenAction = (value) => ({
  type: SAVE_SESSION_TOKEN,
  payload: value,
});

export const saveNameAction = (value) => ({
  type: SAVE_USER_NAME,
  payload: value,
});

export const saveGravatarLinkAction = (value) => ({
  type: SAVE_GRAVATAR_LINK,
  payload: value,
});

export const fetchQuestionsAction = (value) => ({
  type: FETCHING_QUESTIONS,
  payload: value,
});

export const retrievedQuestionsAction = (value) => ({
  type: RETRIEVED_QUESTIONS,
  payload: value,
});

export const test = async (dispatch, token) => {
  dispatch(fetchQuestionsAction('Fetching questions...'));
  try {
    const AMOUNT_OF_QUESTIONS = 5; // Isso precisa ser 5, caso contrário o cypress quebra
    const questionsFetched = await fetchQuestions(AMOUNT_OF_QUESTIONS, token);
    console.log('original arr', questionsFetched);
    const filteredArray = [];
    questionsFetched.map((e) => (
      e.incorrect_answers.map((inc) => (filteredArray.push({
        category: e.category,
        question: e.question,
        answer: inc,
        correct: false,
        testid: 'incorrect-answer',
      })))
    ));
    questionsFetched.map((f) => (filteredArray.push({
      category: f.category,
      question: f.question,
      answer: f.correct_answer,
      correct: true,
      testid: 'correct-answer',
    })));
    console.log('filtered arr', filteredArray);
    // TODO: randomizar o conteudo de dentro do "filteredArray"
    // e passar para o estado global abaixo:
    dispatch(retrievedQuestionsAction(filteredArray));
  } catch (e) {
    console.log(e.message);
    dispatch(fetchQuestionsAction('Error trying to fetch the questions!'));
    dispatch({ type: ERROR, error: e.message });
  }
};
