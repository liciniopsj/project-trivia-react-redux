import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import createGravatarImage from '../api/gravatar';

class Header extends React.Component {
  render() {
    const { nome, score, email } = this.props;
    return (
      <header>
        <img
          src={ createGravatarImage(email) }
          alt={ nome }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ nome }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
