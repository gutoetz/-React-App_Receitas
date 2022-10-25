import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

global.alert = jest.fn();
describe('Realizando os testes da SearchBar iniciando o Login', () => {
  const searchTopBtnTestid = 'search-top-btn';

  test('Testando Search Bar na aba meals', async () => {
    renderWithRouter(<Meals />, '/meals');

    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const ingredientR = screen.getByText(/ingredient/i);
    const nameR = screen.getByText(/name/i);
    const firstLetterR = screen.getByText(/first letter/i);
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(ingredientR);
    userEvent.type(input, 'salt');

    expect(ingredientR).toBeInTheDocument();
    expect(nameR).toBeInTheDocument();
    expect(firstLetterR).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);

    const apamBalik = await screen.findByRole('heading', {
      name: /apam balik/i,
    });
    expect(apamBalik).toBeInTheDocument();
  });

  test('Testando Search Bar na aba drinks', async () => {
    renderWithRouter(<Drinks />, '/Drinks');

    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const ingredientR = screen.getByText(/ingredient/i);
    const nameR = screen.getByText(/name/i);
    const firstLetterR = screen.getByText(/first letter/i);
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(nameR);
    userEvent.type(input, 'mojito');

    expect(ingredientR).toBeInTheDocument();
    expect(nameR).toBeInTheDocument();
    expect(firstLetterR).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);

    const mojitoExtra = await screen.findByRole('heading', {
      name: /Mojito Extra/i,
    });
    expect(mojitoExtra).toBeInTheDocument();
  });

  test('Testando Alert da aba drinks', async () => {
    renderWithRouter(<Drinks />, '/Drinks');

    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const firstLetterR = screen.getByText(/first letter/i);
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(firstLetterR);
    userEvent.type(input, 'aa');

    expect(firstLetterR).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);

    expect(global.alert).toHaveBeenCalled();
  });

  test('Testando Alert da aba drinks p2', async () => {
    renderWithRouter(<Drinks />, '/Drinks');

    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const nameR = screen.getByText(/name/i);
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(nameR);
    userEvent.type(input, 'dasdasdas');

    expect(nameR).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
  });
});
