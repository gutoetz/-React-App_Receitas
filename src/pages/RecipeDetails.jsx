import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
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

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
