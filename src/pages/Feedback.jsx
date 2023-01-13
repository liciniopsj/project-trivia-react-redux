import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends React.Component {
  handleClick = () => {
    const { history } = this.props;

    history.push('/');
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
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
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
}.isRequered;

export default connect(mapStateToProps)(Feedback);
