import React, { useState, useEffect } from 'react';
import useFetchIDMeals from '../helper/useFetchIDMeals';

function MealRevenueDetail({ id }) {
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useFetchIDMeals(id, setSelectedRevenue);

  const getIngredients = () => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object.values(selectedRevenue[0]);
      const arrayIngredients = [];
      for (let index = 9; index <= 28; index++) {
        arrayIngredients.push(filterIngredients[index]);
      }
      const allIngredients = arrayIngredients.filter((e) => e !== '');
      setIngredient(allIngredients);
    }
  };

  const getQuantity = () => {
    if (selectedRevenue.length > 0) {
      const filterQuantity = Object.values(selectedRevenue[0]);
      const arrayQuantity = [];
      for (let index = 29; index <= 48; index++) {
        arrayQuantity.push(filterQuantity[index]);
      }
      const allQuantity = arrayQuantity.filter((e) => e !== '');
      setQuantity(allQuantity);
    }
  };

  useEffect(() => getIngredients(), [selectedRevenue]);
  useEffect(() => getQuantity(), [selectedRevenue]);

  const showIngredients = () => {
    setAllIngredients(ingredient.map((e, i) => `${e}: ${quantity[i]}`));
  };

  useEffect(() => showIngredients(), [ingredient, quantity]);

  useEffect(() => {
    async function fetchData() {
      const requestAPI = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );

      const response = await requestAPI.json();
      setDrinks(response.drinks)
    }
    fetchData();
  }, [selectedRevenue]);

  console.log(drinks)

  return (
    <div>
      {selectedRevenue
        && selectedRevenue.map((revenue) => (
          <div key={ revenue.strMeal }>
            <h3 data-testid="recipe-title">{revenue.strMeal}</h3>
            <h4 data-testid="recipe-category">{revenue.strCategory}</h4>
            <img
              src={ revenue.strMealThumb }
              alt="Selected Revenue"
              data-testid="recipe-photo"
            />
            <p data-testid="instructions">
              {revenue.strInstructions}
            </p>
            {revenue.strYoutube
            && <iframe
              src={ revenue.strYoutube }
              data-testid="video"
            />}
          </div>
        ))}
      <li>Ingredients:</li>
      {allIngredients && allIngredients
        .map((e, index) => (<ul
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {e}
        </ul>))}
    </div>
  );
}

export default MealRevenueDetail;
