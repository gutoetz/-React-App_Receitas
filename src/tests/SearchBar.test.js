import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type } from '@testing-library/user-event/dist/type';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Realizando os testes da SearchBar iniciando o Login', () => {
  test('Testando Search Bar', async () => {
    renderWithRouter(<App />);
    const email = 'emailtest@hotmail.com';
    const password = '1225136773';
    const input = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', {
      name: /enter/i,
    });
    userEvent.type(input, email);
    userEvent.type(passwordInput, password);
    expect(input).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
    userEvent.click(buttonLogin);
  });
});
