import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.css';

export default function CarouselMeals({ filteredMeals }) {
  return (
    <Carousel variant="dark">
      { filteredMeals.map((meal, index) => (
        <Carousel.Item key={ index }>
          <div data-testid={ `${index}-recommendation-card` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              width="250px"
              height="250px"
            />
            <div data-testid={ `${index}-recommendation-title` }>
              {meal.strMeal}
            </div>
          </div>
        </Carousel.Item>)) }
    </Carousel>
  );
}

CarouselMeals.propTypes = {
  filteredMeals: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func,
  })).isRequired,
};
