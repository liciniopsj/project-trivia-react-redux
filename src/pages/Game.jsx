import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Main from '../components/Main';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Main history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Game;
