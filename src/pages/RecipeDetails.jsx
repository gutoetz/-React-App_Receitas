import React from 'react';
import { useHistory } from 'react-router-dom';
import MealRevenueDetail from '../components/MealRevenueDetail';

function RecipeDetails() {
  const history = useHistory();
  const id = history.location.pathname.slice(7);

  return (
    <div>
      <MealRevenueDetail id={ id } />
    </div>
  );
}

export default RecipeDetails;
