import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

  
export default function CarouselMeals({filteredMeals}) {
    return (
      <Carousel>
         {filteredMeals.map((meal, index) => (
          <Carousel.Item key={index}>
          <div data-testid={`${index}-recommendation-card`}>
            <img src={meal.strMealThumb} 
            width='250px' 
            height='250px'
            />
            <div data-testid={`${index}-recommendation-title`}>
              {meal.strMeal}
            </div>
          </div>
          </Carousel.Item>))}
      </Carousel>
  );
}

CarouselMeals.propTypes = {
    filteredDrinks: PropTypes.arrayOf({}).isRequired
}