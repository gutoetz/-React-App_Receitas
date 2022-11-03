// import React from 'react';
// import { findByText, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from './helper/renderWithRouter';
// import LocalStorageMock from './helper/LocalStorageMock';
// import App from '../App';

// describe('Testa as telas de detalhes de drinks', () => {
//     const MOCK_VALUE = [
//         {
//           id: '178319',
//           type: 'drink',
//           nationality: '',
//           category: 'Cocktail',
//           alcoholicOrNot: 'Alcoholic',
//           name: 'Aquamarine',
//           image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
//           tags: [],
//         },
//       ];

//     test('Verifica se o texto do botão é Start Recipe caso a receita não tenha sido iniciada', async () => {
//         // global.fetch = jest.fn(async () => ({
//         //     json: async () => ({results: MOCK_VALUE}),
//         //   }));

//         const {history} = renderWithRouter(<App/>)
//         const emailInput = screen.getByRole('textbox');
//         const passWordInput = screen.getByTestId('password-input');
//         const enterButton = screen.getByTestId('login-submit-btn');
//         userEvent.type(emailInput, 'test@test.com');
//         userEvent.type(passWordInput, '12345678');
//         userEvent.click(enterButton)

//         const drinkSection = screen.getByRole('img', {  name: /imagem de drinks/i});
//         userEvent.click(drinkSection)

//         const firstDrink = await screen.findByTestId('0-recipe-card');

//         userEvent.click(firstDrink)

//         const buttonStart = screen.getByTestId('start-recipe-btn');

//         expect(buttonStart).toHaveTextContent('Start Recipe');
//         console.log(history.location.pathname)
//         userEvent.click(buttonStart);
//         console.log(history.location.pathname)

//         await waitFor(() => {
//             expect(history.location.pathname).toBe('/drinks/15997/in-progress')
//         })

//         history.push('/drinks/15997');
//         const continueRecipe = await screen.findByText('Continue Recipe')
//         expect(continueRecipe).toBeInTheDocument()

//     })
//     // test('Verifica se a lista de ingredientes é renderizada corretamente', async() => {
//     //     const {history} = renderWithRouter(<App/>)
//     //     const emailInput = screen.getByRole('textbox');
//     //     const passWordInput = screen.getByTestId('password-input');
//     //     const enterButton = screen.getByTestId('login-submit-btn');
//     //     userEvent.type(emailInput, 'test@test.com');
//     //     userEvent.type(passWordInput, '12345678');
//     //     userEvent.click(enterButton)

//     //     const drinkSection = screen.getByRole('img', {  name: /imagem de drinks/i});
//     //     userEvent.click(drinkSection)

//     //     const firstDrink = await screen.findByTestId('0-recipe-card');

//     //     userEvent.click(firstDrink)
//     //     await screen.findByTestId('recipe-photo')

//     //     const ingredientsList = screen.getByTestId('ingredientsList');

//     //    console.log(ingredientsList)

//     //     expect(ingredientsList.children.length).toBe(3)
//     // })
// })
