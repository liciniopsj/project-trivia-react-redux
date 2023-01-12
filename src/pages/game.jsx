import React from 'react';

class Game extends React.Component {
  state = {
    name: '',
    imgSrc: '',
  };

  async componentDidMount() {
    const gravatarUrl = localStorage.getItem('gravatarUrl');
    const userName = localStorage.getItem('name');

    this.setState({
      imgSrc: gravatarUrl,
      name: userName,
    });
  }

  render() {
    const { name, imgSrc } = this.state;
    return (
      <header>
        <img
          alt="user-avatar"
          data-testid="header-profile-picture"
          src={ imgSrc }
        />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">0</h4>
      </header>
    );
  }
}

export default Game;
