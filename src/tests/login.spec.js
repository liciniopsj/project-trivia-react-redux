import React from 'react';
import { screen, waitForElementToBeRemoved  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente <Login />', () => {
  it('Testa se a página contém um formulário, com dois inputs e dois botoes.', () => {
    renderWithRouterAndRedux(<App />);
    const usernameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const button = screen.getByTestId('btn-play');
    const settingsButton = screen.getByTestId('btn-settings');
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it('Testa se o botão de jogar está desabilitado e apos digitar nos inputs ele habilita.', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    expect(button).toBeDisabled();
    const usernameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(usernameInput, 'teste');
    userEvent.type(emailInput, 'teste@teste.com');
    expect(button).toBeEnabled();
  });

  it('Testa se o botão de jogar redireciona para a pagina de jogo e salva os dados no redux.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId('btn-play');
    const usernameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(usernameInput, 'teste');
    userEvent.type(emailInput, 'teste@teste.com');
    button.click();
    await waitForElementToBeRemoved(() => screen.getByTestId('input-player-name'));
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });

  it('Testa se o botão de configurações redireciona para a pagina de configurações.', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId('btn-settings');
    settingsButton.click();
    await waitForElementToBeRemoved(() => screen.getByTestId('input-player-name'));
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
});
