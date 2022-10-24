import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Tela de login', () => {
  test('Se a rota padrão é /', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Se existe input de email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('Se existe input de senha', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  test('Se existe um botão de submit', () => {
    renderWithRouter(<App />);
    const submitBtn = screen.getByTestId('login-submit-btn');
    expect(submitBtn).toBeInTheDocument();
  });
});
