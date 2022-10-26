import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper/renderWithRouter';

import LocalStorageMock from './helper/LocalStorageMock';
import App from '../App';
import Profile from '../pages/Profile';

describe('Tela de Login', () => {
  test('Testa se ao clicar em Done Recipes é redirecionado', () => {
    const { history } = renderWithRouter(<Profile />, '/profile');
    const done = screen.getByTestId('profile-done-btn');
    userEvent.click(done);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testa se ao clicar em Favorite Recipes é redirecionado', () => {
    const { history } = renderWithRouter(<Profile />, '/profile');
    const favorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se ao clicar em logout irá limpar o localStorage', () => {
    global.localStorage = new LocalStorageMock();

    renderWithRouter(<App />, '/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');

    const EMAIL = 'example@mail.com';

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitBtn);

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const logout = screen.getByTestId('profile-logout-btn');
    const { email: emailSalvo } = JSON.parse(global.localStorage.getItem('user'));

    expect(emailSalvo).toBe('example@mail.com');

    userEvent.click(logout);

    expect(global.localStorage.getItem('user')).toBe(null);
  });
});
