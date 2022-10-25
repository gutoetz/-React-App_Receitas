import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import App from '../App';

const mock = [
  {
    idDrink: '11009',
    strDrink: 'Moscow Mule',
    strDrinkAlternate: null,
    strTags: 'IBA,ContemporaryClassic',
    strVideo: null,
    strCategory: 'Punch / Party Drink',
    strIBA: 'Contemporary Classics',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Copper Mug',
    strInstructions: 'Combine vodka and ginger beer in a highball glass filled with ice. Add lime juice. Stir gently. Garnish.',
    strInstructionsES: null,
    strInstructionsDE: 'Mischen Sie Wodka und Ingwerbier in einem mit Eis gefüllten Highball-Glas. Limettensaft hinzufügen. Vorsichtig umrühren. Garnieren.',
    strInstructionsFR: null,
    strInstructionsIT: 'Unisci la vodka e la ginger beer in un bicchiere highball pieno di ghiaccio.\r\nAggiungi il succo di lime.\r\nMescola delicatamente.',
    'strInstructionsZH-HANS': null,
    'strInstructionsZH-HANT': null,
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg',
    strIngredient1: 'Vodka',
    strIngredient2: 'Lime juice',
    strIngredient3: 'Ginger ale',
    strIngredient4: null,
    strIngredient5: null,
    strIngredient6: null,
    strIngredient7: null,
    strIngredient8: null,
    strIngredient9: null,
    strIngredient10: null,
    strIngredient11: null,
    strIngredient12: null,
    strIngredient13: null,
    strIngredient14: null,
    strIngredient15: null,
    strMeasure1: '2 oz ',
    strMeasure2: '2 oz ',
    strMeasure3: '8 oz ',
    strMeasure4: null,
    strMeasure5: null,
    strMeasure6: null,
    strMeasure7: null,
    strMeasure8: null,
    strMeasure9: null,
    strMeasure10: null,
    strMeasure11: null,
    strMeasure12: null,
    strMeasure13: null,
    strMeasure14: null,
    strMeasure15: null,
    strImageSource: 'https://commons.wikimedia.org/wiki/File:Moscow_Mule_at_Rye,_San_Francisco.jpg',
    strImageAttribution: 'Will Shenton\r\n',
    strCreativeCommonsConfirmed: 'Yes',
    dateModified: '2017-09-02 17:49:48',
  },
];
describe('Realizando os testes da SearchBar iniciando o Login', () => {
  const searchTopBtnTestid = 'search-top-btn';

  beforeEach(() => {
    global.alert = jest.fn();
  });
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
    global.fetch = jest.fn(async () => ({
      json: async () => ({ drinks: null }),
    }));
    renderWithRouter(<Drinks />, '/Drinks');

    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const nameR = screen.getByRole('radio', {
      name: /name/i,
    });
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(nameR);
    userEvent.type(input, 'daassdasdas');
    expect(nameR).toBeChecked();
    expect(input.value).toBe('daassdasdas');
    expect(nameR).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);
    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1), { timeout: 8000 });
  }, 10000);

  test('Testando Search Bar na aba drinks', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ drinks: mock }),
    }));
    const { history } = renderWithRouter(<App />, '/Drinks');

    const searchTopBtn = screen.getByTestId(searchTopBtnTestid);
    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const nameR = screen.getByRole('radio', {
      name: /name/i,
    });
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', {
      name: /search/i,
    });

    userEvent.click(nameR);
    userEvent.type(input, 'moscow');
    expect(nameR).toBeChecked();
    expect(input.value).toBe('moscow');
    expect(nameR).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
    userEvent.click(buttonSearch);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/11009'), { timeout: 8000 });
  }, 10000);
});
