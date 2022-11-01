import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MealRevenueDetail from '../components/MealRevenueDetail';
import DrinkRevenueDetail from '../components/DrinkRevenueDetail';

function RecipeDetails({ type }) {
  const { id } = useParams();

  return (
    <div>
      {type === 'meals' ? (
        <MealRevenueDetail id={ id } />
      ) : (
        <DrinkRevenueDetail id={ id } />
      )}
    </div>
  );
}

export default RecipeDetails;
