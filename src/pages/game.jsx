/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { test } from '../redux/actions';

class Game extends React.Component {
  state = {
    fetching: true,
  };

  async componentDidMount() {
    const { history, dispatch } = this.props;

    const TOKEN_LENGTH = 64;

    const sessionToken = localStorage.getItem('token');
    if (sessionToken.length !== TOKEN_LENGTH) {
      localStorage.removeItem('token');
      history.push('/');
      console.log('invalid session token! logging out');
    } else {
      await test(dispatch, sessionToken);
      this.setState({ fetching: false });
    }
  }

  render() {
    const { gravatar, username, questions } = this.props;
    const { fetching } = this.state;
    return (
      !fetching ? (
        <div>
          <header>
            <img
              alt="user-avatar"
              data-testid="header-profile-picture"
              src={ gravatar }
            />
            <h4 data-testid="header-player-name">{ username }</h4>
            <h5 data-testid="header-score">0</h5>
          </header>
          <section>
            <div key={ 0 }>
              <h6 data-testid="question-category">{ questions[0].category }</h6>
              <p data-testid="question-text">{ questions[0].question }</p>
            </div>
            <div data-testid="answer-options">
              <button
                type="button"
                key={ 4 }
                data-testid={ questions[0].testid }
              >
                { questions[0].answer }
                {
                /* TODO:
                  descobrir um jeito de renderizar todas as alternativas (respostas) da primeira
                  pergunta do array (indice 0 neste caso)

                  // Setei a posição do array para 0, pois podemos incrementar o indice na medida
                  que o usuario for passando as perguntas (clicando em alguma alternativa),
                  já que a API só vai pegar 5 questões de cada vez e podemos incrementar assim que o usuario clicar em uma
                  resposta
                */
                }
              </button>
            </div>
          </section>
        </div>
      ) : (
        <h5>Fetching API...</h5>
      ));
  }
}

const mapStateToProps = (state) => ({
  token: state.login.sessionToken,
  username: state.login.userName,
  gravatar: state.login.gravatarLink,
  questions: state.login.questions,
});

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  // questions: PropTypes.shape({  }).isRequired,
  gravatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
