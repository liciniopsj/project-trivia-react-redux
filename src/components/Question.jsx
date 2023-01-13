import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import fetchQuestions from '../api/trivia';

import { addScore } from '../redux/actions';

class Question extends React.Component {
  state = {
    id: 0,
    alternatives: [],
    timeout: false,
    clicked: false,
    valid: true,
    seconds: 30,
    loading: true,
  };

  componentDidMount() {
    const { questions } = this.props;
    const { id } = this.state;
    this.tokenValidation();
    this.shuffleAnswers(questions[id]);
    this.timer();
  }

  componentDidUpdate() {
    const { id, valid } = this.state;
    const { questions } = this.props;
    if (valid === true) {
      this.shuffleAnswers(questions[id]);
    }
    this.stopTimer();
  }

  tokenValidation = async () => {
    const { history, questions } = this.props;
    const verifyToken = 3;
    const data = await fetchQuestions();
    if (data.response_code === verifyToken) {
      history.push('/');
    } else {
      this.setState({
        questions,
        loading: false,
      });
    }
  };

  timer = () => {
    const one = 1000;
    setInterval(() => {
      const { seconds } = this.state;

      if (seconds > 0) {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      } else {
        this.setState({ timeout: true, clicked: true });
      }
    }, one);
  };

  stopTimer = () => {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  };

  btnNext = () => {
    const { history, questions } = this.props;
    const { id } = this.state;
    const limit = 4;

    console.log('btnNext question:', questions[id].category);
    console.log('btnNext history:', history);

    if (id === limit) {
      history.push('/feedback');
    }

    this.setState({
      id: id + 1, valid: true, clicked: false, seconds: 30, timeout: false,
    });
  };

  shuffleAnswers = (question) => {
    const noMagicNumber = 0.5;
    const altCorrect = question.correct_answer;
    const altIncorrect = question.incorrect_answers;
    const alternatives = [...altIncorrect, altCorrect];
    const altersShuffled = alternatives.sort(() => Math.random() - noMagicNumber);
    console.log(altersShuffled);
    this.setState({ alternatives: altersShuffled, valid: false });
  };

  handleClickAnswers = (event) => {
    const { questions, actAddScore } = this.props;
    const { id, seconds } = this.state;
    this.setState({ clicked: true });

    if (event.target.value === questions[id].correct_answer) {
      let number = 0;
      const numberThree = 3;
      const valorDefault = 10;

      if (questions[id].difficulty === 'hard') { number = numberThree; }
      if (questions[id].difficulty === 'medium') { number = 2; }
      if (questions[id].difficulty === 'easy') { number = 1; }
      actAddScore(valorDefault + (seconds * number));
    }
  };

  answerBorder = (item, question) => ((item === question.correct_answer)
    ? 'correct-answer'
    : 'incorrect-answer');

  displayQuestion = () => {
    const { id, questions, timeout,
      clicked, seconds, alternatives } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{ questions[id].category }</h2>
        <p data-testid="question-text">{ questions[id].question }</p>
        <div>
          {seconds}
        </div>
        <div data-testid="answer-options">
          {
            alternatives.map((item, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ (questions[id].correct_answer === item)
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                className={ clicked
                  ? this.answerBorder(item, questions[id]) : '' }
                disabled={ clicked || timeout }
                onClick={ (event) => this.handleClickAnswers(event) }
                value={ item }
              >
                {item}
              </button>
            ))
          }
        </div>
        {clicked ? (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.btnNext }
          >
            Next
          </button>
        )
          : ''}
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        {
          loading ? ''
            : this.displayQuestion()
        }

      </div>
    );
  }
}

Question.propTypes = {
  id: PropTypes.number,
  questions: PropTypes.array,
}.isRequered;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  actAddScore: (score) => dispatch(addScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
