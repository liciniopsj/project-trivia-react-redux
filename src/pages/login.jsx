import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import { fetchToken } from '../api/trivia';
import fetchGravatar from '../api/gravatar';
import {
  saveGravatarLinkAction,
  saveNameAction,
  saveTokenAction,
} from '../redux/actions';

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
    const { history, dispatch } = this.props;

    const token = await fetchToken();
    const gravatar = fetchGravatar(this.hashEmail());

    localStorage.setItem('token', token);
    dispatch(saveTokenAction(token));

    dispatch(saveNameAction(name));
    dispatch(saveGravatarLinkAction(gravatar));

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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Login);
