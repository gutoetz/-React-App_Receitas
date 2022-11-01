import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function CarouselCard({ filteredDrinks }) {
  return (
    <Carousel>
      {filteredDrinks.map((drink, index) => (
        <Carousel.Item key={ index }>
          <div data-testid={ `${index}-recommendation-card` }>
            <img
              src={ drink.strDrinkThumb }
              width="250px"
              height="250px"
            />
            <div data-testid={ `${index}-recommendation-title` }>
              {drink.strDrink}
            </div>
          </div>
        </Carousel.Item>))}
    </Carousel>
  );
}

Carousel.propTypes = {
  filteredDrinks: PropTypes.arrayOf({}).isRequired,
};
