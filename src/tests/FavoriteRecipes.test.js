import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import LocalStorageMock from './helper/LocalStorageMock';
import FavoriteRecipes from '../pages/FavoriteRecipes';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testes da tela de receitas favoritas', () => {
  global.localStorage = new LocalStorageMock();
  const PATH = '/favorite-recipes';
  const FAVORITE_DIV = 'favorite-recipes-container';
  const MOCK_VALUE = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  global.localStorage.setItem('favoriteRecipes', JSON.stringify(MOCK_VALUE));

  test('Testa se é renderizando todas as receitas salvas no localstorage', () => {
    renderWithRouter(<FavoriteRecipes />, PATH);
    const favoriteDiv = screen.getByTestId(FAVORITE_DIV);
    expect(favoriteDiv.children.length).toBe(2);
  });

  test('Testa se o filtro funciona corretamente', () => {
    renderWithRouter(<FavoriteRecipes />, PATH);
    const favoriteDiv = screen.getByTestId(FAVORITE_DIV);
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const allFilter = screen.getByTestId('filter-by-all-btn');

    userEvent.click(drinkFilter);
    expect(favoriteDiv.children.length).toBe(1);

    userEvent.click(mealFilter);
    expect(favoriteDiv.children.length).toBe(1);

    userEvent.click(allFilter);
    expect(favoriteDiv.children.length).toBe(2);
  });

  test('Testa o clipboard da tela de Favorite Recipes', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouter(<FavoriteRecipes />, PATH);
    const clipboard1 = screen.getByTestId('0-horizontal-share-btn');
    const clipboard2 = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(clipboard1);
    expect(navigator.clipboard.writeText)
      .toBeCalledWith('http://localhost:3000/meals/52771');

    userEvent.click(clipboard2);
    expect(navigator.clipboard.writeText)
      .toBeCalledWith('http://localhost:3000/meals/178319');
  });

  test('Testa se clicar em desfavoritar irá sumir da tela e localstorage', () => {
    renderWithRouter(<FavoriteRecipes />, PATH);
    const favoriteBtn2 = screen.getByTestId('1-horizontal-favorite-btn');
    const favoriteDiv = screen.getByTestId(FAVORITE_DIV);

    userEvent.click(favoriteBtn2);
    expect(favoriteDiv.children.length).toBe(1);

    const favoriteBtn1 = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn1);
    expect(favoriteDiv.children.length).toBe(0);
  });
});
