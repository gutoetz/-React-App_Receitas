import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper/renderWithRouter';
import LocalStorageMock from './helper/LocalStorageMock';

import DoneRecipes from '../pages/DoneRecipes';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Teste da tela de receitas prontas', () => {
  global.localStorage = new LocalStorageMock();
  const PATH = '/done-recipes';
  const RECIPES_DIV = 'done-recipes-container';
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
  global.localStorage.setItem('doneRecipes', JSON.stringify(MOCK_VALUE));

  test('Testa se é renderizando todas as receitas salvas no localstorage', () => {
    renderWithRouter(<DoneRecipes />, PATH);
    const recipesDiv = screen.getByTestId(RECIPES_DIV);
    expect(recipesDiv.children.length).toBe(2);
  });

  test('Testa se o filtro funciona corretamente', () => {
    renderWithRouter(<DoneRecipes />, PATH);
    const recipesDiv = screen.getByTestId(RECIPES_DIV);
    const drinkFilter = screen.getByTestId('filter-by-drink-btn');
    const mealFilter = screen.getByTestId('filter-by-meal-btn');
    const allFilter = screen.getByTestId('filter-by-all-btn');

    userEvent.click(drinkFilter);
    expect(recipesDiv.children.length).toBe(1);

    userEvent.click(mealFilter);
    expect(recipesDiv.children.length).toBe(1);

    userEvent.click(allFilter);
    expect(recipesDiv.children.length).toBe(2);
  });

  test('Testa o clipboard da tela de Favorite Recipes', () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouter(<DoneRecipes />, PATH);
    const clipboard1 = screen.getByTestId('0-horizontal-share-btn');
    const clipboard2 = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(clipboard1);
    expect(navigator.clipboard.writeText)
      .toBeCalledWith('http://localhost:3000/meals/52771');

    userEvent.click(clipboard2);
    expect(navigator.clipboard.writeText)
      .toBeCalledWith('http://localhost:3000/meals/178319');
  });
});
