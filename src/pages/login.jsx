import React from 'react';
import PropTypes from 'prop-types';
import { fetchToken } from '../api/trivia';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleClick = async (e) => {
    e.preventDefault();

    const { history } = this.props;

    const token = await fetchToken();

    localStorage.setItem('token', token);

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
      </form>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
