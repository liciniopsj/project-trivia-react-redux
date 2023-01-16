import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import fetchQuestions from '../api/trivia';

class Main extends React.Component {
  state = {
    questions: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const verifyToken = 3;
    const data = await fetchQuestions();
    if (data.response_code !== verifyToken) {
      this.setState({ questions: data.results, isLoading: false });
    } else {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  render() {
    const { questions, isLoading } = this.state;
    const { history } = this.props;
    return (
      (!isLoading)
        ? (
          <main>
            <Question questions={ questions } history={ history } />
          </main>
        )
        : (
          <main>
            <h2>
              Loading...
            </h2>
          </main>
        )
    );
  }
}

Main.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Main;
