import React, { useEffect, useState } from 'react';
import { Paper, Button, ButtonGroup } from '@mui/material';
import DoneRecipesCard from '../components/DoneRecipesCard';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';

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
    <Paper
      sx={ {
        mb: 0.5,
        mx: 'auto',
        maxWidth: 360,
        textAlign: 'center',
        opacity: 100,
      } }
    >
      <PrimarySearchAppBar title="Done Recipes" />

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

      <Paper>
        { doneRecipes && doneRecipes.map((recipes, index) => (
          <DoneRecipesCard
            key={ index }
            recipes={ recipes }
            index={ index }
          />
        )) }
      </Paper>
    </Paper>
  );
}

DoneRecipes.propTypes = {};

export default DoneRecipes;
