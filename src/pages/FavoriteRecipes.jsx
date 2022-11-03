import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';

import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import GlobalContext from '../context/GlobalContext';
import MenuButton from '../components/MenuButton';

export default function FavoriteRecipes() {
  // States
  const [defaultFavoriteRecipes, setDefaultFavoriteRecipes] = useState();
  const { favoriteRecipes, setFavoriteRecipes } = useContext(GlobalContext);

  // UseEffect Mount
  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setDefaultFavoriteRecipes(getFavoriteRecipes);
    setFavoriteRecipes(getFavoriteRecipes);
  }, [setFavoriteRecipes]);

  // Handles
  const handleFilter = ({ target: { value } }) => {
    if (value === 'all') {
      setFavoriteRecipes(defaultFavoriteRecipes);
    } else {
      const filteredRecipes = defaultFavoriteRecipes.filter((e) => e.type === value);
      setFavoriteRecipes(filteredRecipes);
    }
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
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

      <div data-testid="favorite-recipes-container">
        { favoriteRecipes && favoriteRecipes.map((recipes, index) => (
          <FavoriteRecipesCard
            key={ index }
            recipes={ recipes }
            index={ index }
          />
        )) }
      </div>
    </div>
  );
}
