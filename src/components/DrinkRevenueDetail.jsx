import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchIdDrinks from '../helper/useFetchIdDrinks';
import useFetchRecommendMeals from '../helper/useFetchRecommendMeals';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CarouselMeals from './CarouselMeals';

const copy = require('clipboard-copy');

const NUMBER_SIX = 6;

function DrinkRevenueDetail({ id }) {
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [startButton, setStartButton] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useHistory();

  useFetchIdDrinks(id, setSelectedRevenue);

  useFetchRecommendMeals(setMeals);

  const getInprogress = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const continueRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newData = Object.keys(continueRecipes.drinks);
      const haveRecipe = newData.some((e) => e === id);
      setStartButton(!haveRecipe);
    }
  };

  useEffect(() => getInprogress(), []);

  const getIngredients = () => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object.entries(selectedRevenue[0]);
      const nullEntries = filterIngredients
        .filter((e) => e[0].includes('strIngredient'))
        .filter((i) => i[1] !== null);
      const nullQuantity = filterIngredients
        .filter((e) => e[0].includes('strMeasure'))
        .filter((i) => i[1] !== null);
      setAllIngredients(nullEntries.map((e, i) => {
        const quantity = nullQuantity[i] ? (`: ${nullQuantity[i][1]}`) : '';
        return `${e[1]}${quantity}`;
      }));
    }
  };

  useEffect(() => getIngredients(), [selectedRevenue]);

  const verifyFavorite = () => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveFavorite = allFavorites.some((e) => e.id === id);
      setIsFavorite(haveFavorite);
    }
  };

  useEffect(() => verifyFavorite(), []);

  const showMeals = () => {
    const selectedMeals = meals.slice(null, NUMBER_SIX);
    setFilteredMeals(selectedMeals);
  };

  useEffect(() => showMeals(), [meals]);

  function redirectStart() {
    history.push(`/drinks/${id}/in-progress`);
  }

  function shareRevenue() {
    const copyUrl = `http://localhost:3000/drinks/${id}`;
    copy(copyUrl);
    setShowCopied(true);
  }

  function inProgressRevenue() {
    const inProgress = {
      meals: {},
      drinks: {
        [selectedRevenue[0].idDrink]: allIngredients,
      },
    };
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      const progressRevenues = JSON.parse(localStorage.getItem('inProgressRecipes'));
      progressRevenues.drinks[selectedRevenue[0].idDrink] = allIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRevenues));
    }
  }

  function handleStartButton() {
    inProgressRevenue();
    redirectStart();
  }

  function showFavorite() {
    const favoriteRevenue = {
      id: selectedRevenue[0].idDrink,
      type: 'drink',
      nationality: '',
      category: selectedRevenue[0].strCategory,
      alcoholicOrNot: selectedRevenue[0].strAlcoholic,
      name: selectedRevenue[0].strDrink,
      image: selectedRevenue[0].strDrinkThumb,
    };
    let arrayFavorite = [];
    if (isFavorite === false) {
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([favoriteRevenue]),
        );
        setIsFavorite(true);
      } else {
        const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
        arrayFavorite = [...favorites, favoriteRevenue];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorite));
        setIsFavorite(true);
      }
    } else {
      arrayFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filteredRevenues = arrayFavorite.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRevenues));
      setIsFavorite(false);
    }
  }

  return (
    <div>
      {selectedRevenue
        && selectedRevenue.map((revenue) => (
          <div key={ revenue.strDrink }>
            <h3 data-testid="recipe-title">{revenue.strDrink}</h3>
            <h4 data-testid="recipe-category">{revenue.strAlcoholic}</h4>
            <img
              src={ revenue.strDrinkThumb }
              alt="Selected Revenue"
              data-testid="recipe-photo"
              width="150px"
            />
            <p data-testid="instructions">{revenue.strInstructions}</p>
          </div>
        ))}
      <li>Ingredients:</li>
      {allIngredients
        && allIngredients.map((e, index) => (
          <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {e}
          </ul>
        ))}
      <h4>Recommended Meals</h4>
      {filteredMeals && <CarouselMeals filteredMeals={ filteredMeals } />}
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => handleStartButton() }
        className="recipeDetailsButton"
      >
        {startButton ? ('Start Recipe') : ('Continue Recipe')}
      </button>
      <div>
        <button onClick={ shareRevenue } type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        {showCopied && <span>Link copied!</span>}
      </div>
      <div>
        {isFavorite === false ? (
          <button onClick={ () => showFavorite() } type="button">
            <img
              src={ whiteHeartIcon }
              alt="White Heart Icon"
              data-testid="favorite-btn"
            />
          </button>
        ) : (
          <button onClick={ () => showFavorite() } type="button">
            <img
              src={ blackHeartIcon }
              alt="Black Heart Icon"
              data-testid="favorite-btn"
            />
          </button>
        )}
      </div>
    </div>
  );
}

DrinkRevenueDetail.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DrinkRevenueDetail;
