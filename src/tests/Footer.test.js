import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Footer from '../components/Footer';

describe('Testa o componente Footer', () => {
  it('Test se a img de drink faz o link com a rota /drinks', () => {
    renderWithRouter(<Footer />, '/Drinks');
    const drinkLink = screen.getByTestId(/drinks-bottom-btn/i);
    expect(drinkLink).toBeInTheDocument();
    userEvent.click(drinkLink);
  });

  it('Test se a img de meal faz o link com a rota /meals', () => {
    renderWithRouter(<Footer />, '/Meals');
    const mealLink = screen.getByTestId(/meals-bottom-btn/i);
    expect(mealLink).toBeInTheDocument();
    userEvent.click(mealLink);
  });
});
