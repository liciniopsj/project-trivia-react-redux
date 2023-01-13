import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Main from '../components/Main';

class Feedback extends React.Component {
  render() {
    const { history, assertions } = this.props;
    const MIN_AFIRMATIONS = 3;
    return (
      <>
        <Header />
        <Main history={ history } />
        <p data-testid="feedback-text">
          {assertions < MIN_AFIRMATIONS ? 'Could be better...' : 'Well Done!'}
        </p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape(),
}.isRequered;

export default connect(mapStateToProps)(Feedback);
