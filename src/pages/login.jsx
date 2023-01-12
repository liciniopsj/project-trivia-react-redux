import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { fetchToken } from '../api/trivia';
import fetchGravatar from '../api/gravatar';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  hashEmail = () => {
    const { email } = this.state;

    const emailHash = MD5(email).toString();
    return emailHash;
  };

  handleSettings = () => {
    const { history } = this.props;

    history.push('/settings');
  };

  handleClick = async (e) => {
    e.preventDefault();

    const { name } = this.state;
    const { history } = this.props;

    const token = await fetchToken();
    const gravatar = await fetchGravatar(this.hashEmail());

    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('gravatarUrl', gravatar);

    history.push('/game');
  };

  verifyButton = () => {
    const { name, email } = this.state;

    if (name.length !== 0 && email.length !== 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.verifyButton());
  };

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <form onSubmit={ this.handleClick }>
        <label htmlFor="name-input">
          Nome
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name-input"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>
        <br />
        <label htmlFor="email-input">
          E-mail
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            id="email-input"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettings }
        >
          Settings
        </button>
      </form>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;
