import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../api/trivia';
import { requestApi, addNomeEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disableBtn: true,
  };

  verifyBtn = () => {
    const { name, email } = this.state;
    if (name.length !== 0 && email.length !== 0) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.verifyBtn();
    });
  };

  settingsBtn = () => {
    const { history } = this.props;
    console.log('settingsBtn history', history);
    history.push('/settings');
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { returnToken, history, returnNomeEmail } = this.props;

    console.log('handleClick history', history);

    const { name, email } = this.state;
    await returnToken();
    const { token } = this.props;
    localStorage.setItem('token', token);
    returnNomeEmail(name, email);
    history.push('/game');

    const verifyToken = 3;

    const data = await fetchQuestions();
    if (data.response_code === verifyToken) {
      history.push('/');
    }
  };

  render() {
    const { disableBtn } = this.state;
    return (
      <div
        data-testid="login-div"
      >
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disableBtn }
            onClick={ (event) => this.handleClick(event) }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.settingsBtn }
          >
            Settings
          </button>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  returnToken: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  returnToken: () => dispatch(requestApi()),
  returnNomeEmail: (nome, email) => dispatch(addNomeEmail(nome, email)),
});

const mapStateToProps = (state) => ({
  token: state.gameReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
