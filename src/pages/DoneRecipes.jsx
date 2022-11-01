import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';

function DoneRecipes() {
  // const mock = [
  //   {
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '23/06/2020',
  //     tags: ['Pasta', 'Curry'],
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot:  'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     doneDate: '23/06/2020',
  //     tags: [],
  //   },
  // ];
  // States
  const [doneRecipes, setDoneRecipes] = useState();
  const [defaultDoneRecipes, setDefaultDoneRecipes] = useState();
  // UseEffect Mount
  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(getDoneRecipes);
    setDefaultDoneRecipes(getDoneRecipes);
  }, []);
  // Handles
  const handleFilter = ({ target: { value } }) => {
    if (value === 'all') {
      setDoneRecipes(defaultDoneRecipes);
    } else {
      const filteredRecipes = defaultDoneRecipes.filter((e) => e.type === value);
      setDoneRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          value="meal"
          onClick={ handleFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>
      <div>
        {doneRecipes && doneRecipes.map((recipes, index) => (
          <DoneRecipesCard key={ index } recipes={ recipes } index={ index } />
        ))}
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {};

export default DoneRecipes;
