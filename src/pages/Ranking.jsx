import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  handleHomeClick = () => {
    const { history } = this.props;

    history.push('/');
  };

  render() {
    return (
      <>
        <heading>
          <h1 data-testid="ranking-title">Ranking</h1>
        </heading>
        <section>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleHomeClick }
          >
            Inicio
          </button>
        </section>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape(),
}.isRequered;

export default Ranking;
