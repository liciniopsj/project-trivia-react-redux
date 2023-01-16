import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { mockedState01, mockedState02 } from './helpers/mockedGlobalState';

describe('Testa o componente <Feedback />', () => {
  it('Atesta a presença dos componentes de Feedback', () => {
    renderWithRouterAndRedux(<App />, mockedState01, '/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    const totalScore = screen.getByTestId('feedback-total-score');
    const assertionsTotal = screen.getByTestId('feedback-total-question');
    const playAgainBtn = screen.getByRole('button', { name: /play again/i });
    const rankingBtn = screen.getByRole('button', { name: /ranking/i });


    expect(feedbackText).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
    expect(assertionsTotal).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
  });
  it('Testa elementos de feedback em estado inicial ou quando nenhuma pergunta é respondida', () => {
  renderWithRouterAndRedux(<App />, mockedState01, '/feedback');

  const feedbackText = screen.getByTestId('feedback-text');
  const totalScore = screen.getByTestId('feedback-total-score');
  const assertionsTotal = screen.getByTestId('feedback-total-question');

  expect(totalScore.textContent).toBe('0');
  expect(assertionsTotal.textContent).toBe('0');
  expect(feedbackText.textContent).toBe('Could be better...');
  });
  it('Testa se texto de feedback alterna para \"Well Done!\"', () => {
  renderWithRouterAndRedux(<App />, mockedState02, '/feedback');

  const feedbackText = screen.getByTestId('feedback-text');
  const totalScore = screen.getByTestId('feedback-total-score');
  const assertionsTotal = screen.getByTestId('feedback-total-question');

  expect(totalScore.textContent).toBe('153');
  expect(assertionsTotal.textContent).toBe('3');
  expect(feedbackText.textContent).toBe('Well Done!');
  });
  it('Testa o Botão Ranking de feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />, mockedState02, '/feedback');

    const rankingBtn = screen.getByRole('button', { name: /ranking/i });

    userEvent.click(rankingBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
  it('Testa o Botão Play Again de feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />, mockedState02, '/feedback');

    const playAgainBtn = screen.getByRole('button', { name: /play again/i });

    userEvent.click(playAgainBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
