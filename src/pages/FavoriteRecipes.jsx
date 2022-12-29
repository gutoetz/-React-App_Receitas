import React, { useState, useEffect, useContext } from 'react';
import { Paper, Button, ButtonGroup } from '@mui/material';
import FavoriteRecipesCard from '../components/FavoriteRecipesCard';
import GlobalContext from '../context/GlobalContext';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';

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
    <Paper
      sx={ {
        mb: 0.5,
        mx: 'auto',
        maxWidth: 360,
        textAlign: 'center',
        opacity: 100,
      } }
    >
      <PrimarySearchAppBar title="Favorite Recipes" />
      <ButtonGroup
        size="large"
        orientation="horizontal"
        aria-label="horizontal contained button group"
        fullWidth
        color="primary"
        sx={ {
          mt: 2,
          maxWidth: 360,
        } }
      >
        <Button
          id="filter-by-all-btn"
          value="all"
          onClick={ handleFilter }
          textButton="All"
        >
          All
        </Button>
        <Button
          id="filter-by-meal-btn"
          value="meal"
          onClick={ handleFilter }
          textButton="Meals"
        >
          Meals

        </Button>

        <Button
          id="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilter }
          textButton="Drinks"
        >
          Drinks

        </Button>
      </ButtonGroup>

      <div data-testid="favorite-recipes-container">
        { favoriteRecipes && favoriteRecipes.map((recipes, index) => (
          <FavoriteRecipesCard
            key={ index }
            recipes={ recipes }
            index={ index }
          />
        )) }
      </div>
    </Paper>
  );
}
