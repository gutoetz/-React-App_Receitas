import React, { useEffect, useState } from 'react';

import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';
import MenuButton from '../components/MenuButton';

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

      <menu>
        <MenuButton
          id="filter-by-all-btn"
          value="all"
          onClick={ handleFilter }
          textButton="All"
        />

        <MenuButton
          id="filter-by-meal-btn"
          value="meal"
          onClick={ handleFilter }
          textButton="Meals"
        />

        <MenuButton
          id="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilter }
          textButton="Drinks"
        />
      </menu>

      <div>
        { doneRecipes && doneRecipes.map((recipes, index) => (
          <DoneRecipesCard
            key={ index }
            recipes={ recipes }
            index={ index }
          />
        )) }
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {};

export default DoneRecipes;
