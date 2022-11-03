import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import MealRevenueDetail from '../components/MealRevenueDetail';
import DrinkRevenueDetail from '../components/DrinkRevenueDetail';

function RecipeDetails({ type }) {
  const { id } = useParams();

  return (
    type === 'meals'
      ? <MealRevenueDetail id={ id } />
      : <DrinkRevenueDetail id={ id } />
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
