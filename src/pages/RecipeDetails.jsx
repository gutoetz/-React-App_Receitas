import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import MealRevenueDetail from '../components/MealRevenueDetail';
import DrinkRevenueDetail from '../components/DrinkRevenueDetail';

function RecipeDetails() {
  const history = useHistory();
  const [isDrink, setIsDrink] = useState(false);
  const SEVEN = 7;
  const EIGHT = 8;
  const idMeals = history.location.pathname.slice(SEVEN);
  const idDrinks = history.location.pathname.slice(EIGHT);

  const showRevenues = useCallback(() => {
    if (history.location.pathname.includes('meals')) {
      setIsDrink(false);
    } else {
      setIsDrink(true);
    }
  }, [history.location.pathname]);

  useEffect(() => showRevenues(), [showRevenues]);

  return (
    <div>
      {isDrink === false ? (
        <MealRevenueDetail id={ idMeals } />
      ) : (
        <DrinkRevenueDetail id={ idDrinks } />
      )}
    </div>
  );
}

export default RecipeDetails;
