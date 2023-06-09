import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/css/bootstrap.css';

export default function CarouselDrinks({ filteredDrinks }) {
  return (
    <Carousel variant="dark">
      { filteredDrinks.map((drink, index) => (
        <Carousel.Item key={ index }>
          <div data-testid={ `${index}-recommendation-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              width="250px"
              height="250px"
            />
            <div data-testid={ `${index}-recommendation-title` }>
              {drink.strDrink}
            </div>
          </div>
        </Carousel.Item>)) }
    </Carousel>
  );
}

CarouselDrinks.propTypes = {
  filteredDrinks: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func,
  })).isRequired,
};
