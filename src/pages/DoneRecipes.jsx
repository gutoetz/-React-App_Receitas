import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';

function DoneRecipes() {
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
      <div data-testid="done-recipes-container">
        {doneRecipes && doneRecipes.map((recipes, index) => (
          <DoneRecipesCard key={ index } recipes={ recipes } index={ index } />
        ))}
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {};

export default DoneRecipes;
