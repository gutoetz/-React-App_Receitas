import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Tela de login', () => {
  const EMAIL_INPUT = 'email-input';
  const PASS_INPUT = 'password-input';
  const BUTTON_SUBMIT = 'login-submit-btn';

  test('Se a rota padrão é /', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Se existe input de email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    expect(emailInput).toBeInTheDocument();
  });

  test('Se existe input de senha', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(PASS_INPUT);
    expect(passwordInput).toBeInTheDocument();
  });

  test('Se existe um botão de submit', () => {
    renderWithRouter(<App />);
    const submitBtn = screen.getByTestId(BUTTON_SUBMIT);
    expect(submitBtn).toBeInTheDocument();
  });

  test('Testa se botão desativado se email e senha incorreta', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASS_INPUT);
    const submitBtn = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(emailInput, 'test.mail@com');
    userEvent.type(passwordInput, 'senha');

    expect(submitBtn).toHaveAttribute('disabled');
  });

  test('Testa se botão ativado quando email e senha correto', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASS_INPUT);
    const submitBtn = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(emailInput, 'test@mail.com');
    userEvent.type(passwordInput, '1234567');

    expect(submitBtn).not.toHaveAttribute('disabled');
  });

  test('Testa se é redirecionado ao submeter o formulário', async () => {
    renderWithRouter(<App />, '/');
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASS_INPUT);
    const submitBtn = screen.getByTestId(BUTTON_SUBMIT);

    userEvent.type(emailInput, 'test@mail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitBtn);

    const meals = await screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(meals).toBeInTheDocument();

    expect(window.location.pathname).toBe('/meals');
  });
});
