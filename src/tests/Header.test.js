import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper/renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const searchTopBtnTestid = 'search-top-btn';
const profileTopBtnTestid = 'profile-top-btn';
const pageTitleTestid = 'page-title';

const contextValue = {
  searchType: 'lasanha',
  revenues: 'vegana',
  selectSearchType: jest.fn(),
  handleSearchType: jest.fn(),
  handleSearchInput: jest.fn(),
};

describe('Componente "<Header />"', () => {
  test('Rota "/meals": possui o header com o título "Meals" e os ícones de perfil e pesquisa', () => {
    renderWithRouter(<Meals />, '/meals');
    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    const profileTopBtn = screen.getByTestId(profileTopBtnTestid);
    const pageTitle = screen.getByTestId(pageTitleTestid);

    expect(searchTopBtn).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/meals/i);
  });

  test('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', () => {
    renderWithRouter(<Drinks />, '/drinks');
    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    const profileTopBtn = screen.getByTestId(profileTopBtnTestid);
    const pageTitle = screen.getByTestId(pageTitleTestid);

    expect(searchTopBtn).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/drinks/i);
  });

  test('Rota "/profile": possui o header com o título "Profile" e o ícones de perfil', () => {
    renderWithRouter(<Profile />, '/profile');
    const profileTopBtn = screen.getByTestId(profileTopBtnTestid);
    const pageTitle = screen.getByTestId(pageTitleTestid);

    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/profile/i);
  });

  test('Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícones de perfil', () => {
    renderWithRouter(<DoneRecipes />, '/done-recipes');
    const profileTopBtn = screen.getByTestId(profileTopBtnTestid);
    const pageTitle = screen.getByTestId(pageTitleTestid);

    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/done recipes/i);
  });

  test('Rota "/favorite-recipes": possui o header com o título "Done Recipes" e o ícones de perfil', () => {
    renderWithRouter(<FavoriteRecipes />, '/favorite-recipes');
    const profileTopBtn = screen.getByTestId(profileTopBtnTestid);
    const pageTitle = screen.getByTestId(pageTitleTestid);

    expect(profileTopBtn).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/favorite recipes/i);
  });

  test('Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
    const { history } = renderWithRouter(<Drinks />, '/drinks');
    const profileTopBtn = screen.getByTestId(profileTopBtnTestid);

    userEvent.click(profileTopBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });

  /*
  NOTA: não consegui testar a se barra de busca aparece após clicar no botão de busca por conta do Context API,
  acho que precisa de um mock no provider e não consegui fazer
  */

  test('Ao clicar no botão de busca, a barra de busca deve aparecer. O mesmo serve para escondê-la.', () => {
    renderWithRouter(<Drinks />, '/drinks', contextValue);
    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);

    userEvent.click(searchTopBtn);
    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchTopBtn);
    expect(searchInput).not.toBeInTheDocument();
  });
});
