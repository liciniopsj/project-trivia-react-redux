import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends React.Component {
  handlePlayAgainClick = () => {
    const { history } = this.props;

    history.push('/');
  };

  handleRankingClick = () => {
    const { history } = this.props;

    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const MIN_AFIRMATIONS = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {assertions < MIN_AFIRMATIONS ? 'Could be better...' : 'Well Done!'}
        </p>
        <section>
          <p>Total Score:</p>
          <p data-testid="feedback-total-score">{ score }</p>
          <p>Questions answered corretly:</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgainClick }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleRankingClick }
          >
            Ranking
          </button>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
