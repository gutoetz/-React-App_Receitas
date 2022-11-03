import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchIDMeals from '../helper/useFetchIDMeals';
import useFetchRecommendDrinks from '../helper/useFetchRecommendDrinks';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CarouselDrinks from './CarouselDrinks';

const copy = require('clipboard-copy');

const NUMBER_SIX = 6;
const SLICE_INDEX = 23;

function MealRevenueDetail({ id }) {
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [startButton, setStartButton] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [embedURL, setEmbedURL] = useState('');

  const history = useHistory();

  useFetchIDMeals(id, setSelectedRevenue);
  useFetchRecommendDrinks(setDrinks);

  const embedVideo = useCallback(() => {
    if (selectedRevenue.length > 0) {
      const url = selectedRevenue[0].strYoutube;
      const customURL = [url
        .slice(0, SLICE_INDEX), '/embed', url
        .slice(SLICE_INDEX)].join('');
      setEmbedURL(customURL);
    }
  }, [selectedRevenue]);

  useEffect(() => embedVideo(), [embedVideo]);

  const getInprogress = useCallback(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const continueRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newData = Object.keys(continueRecipes.meals);
      const haveRecipe = newData.some((e) => e === id);
      setStartButton(!haveRecipe);
    }
  }, [id]);

  useEffect(() => getInprogress(), [getInprogress]);

  const getIngredients = useCallback(() => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object
        .entries(selectedRevenue[0]);
      const nullEntries = filterIngredients
        .filter((e) => e[0].includes('strIngredient'))
        .filter((i) => i[1] !== null && i[1] !== '');
      const nullQuantity = filterIngredients
        .filter((e) => e[0].includes('strMeasure'))
        .filter((i) => i[1] !== null && i[1] !== '');
      setAllIngredients(nullEntries
        .map((e, i) => `${e[1]}: ${nullQuantity[i][1]}`));
    }
  }, [selectedRevenue]);

  useEffect(() => getIngredients(), [getIngredients]);

  const verifyFavorite = useCallback(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveFavorite = allFavorites.some((e) => e.id === id);
      setIsFavorite(haveFavorite);
    }
  }, [id]);

  useEffect(() => verifyFavorite(), [verifyFavorite]);

  const showDrinks = useCallback(() => {
    const selectedDrinks = drinks.slice(null, NUMBER_SIX);
    setFilteredDrinks(selectedDrinks);
  }, [drinks]);

  useEffect(() => showDrinks(), [showDrinks]);

  function redirectStart() {
    history.push(`/meals/${id}/in-progress`);
  }

  function shareRevenue() {
    const copyUrl = `http://localhost:3000/meals/${id}`;
    copy(copyUrl);
    setShowCopied(true);
  }

  function inProgressRevenue() {
    const inProgress = {
      drinks: {},
      meals: {
        [selectedRevenue[0].idMeal]: allIngredients,
      },
    };
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      const progressRevenues = JSON.parse(localStorage.getItem('inProgressRecipes'));
      progressRevenues.meals[selectedRevenue[0].idMeal] = allIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRevenues));
    }
  }

  function handleStartButton() {
    inProgressRevenue();
    redirectStart();
  }

  function showFavorite() {
    const favoriteRevenue = {
      id: selectedRevenue[0].idMeal,
      type: 'meal',
      nationality: selectedRevenue[0].strArea,
      category: selectedRevenue[0].strCategory,
      alcoholicOrNot: '',
      name: selectedRevenue[0].strMeal,
      image: selectedRevenue[0].strMealThumb,
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
      { selectedRevenue && selectedRevenue.map((revenue) => (
        <div key={ revenue.strMeal }>
          <h3 data-testid="recipe-title">{revenue.strMeal}</h3>

          <h4 data-testid="recipe-category">{revenue.strCategory}</h4>

          <img
            src={ revenue.strMealThumb }
            alt="Selected Revenue"
            data-testid="recipe-photo"
            width="150px"
          />

          <p data-testid="instructions">{revenue.strInstructions}</p>

          { revenue.strYoutube && (
            <iframe
              width="560"
              height="315"
              src={ embedURL }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; yroscope; picture-in-picture"
              data-testid="video"
              allowFullScreen
            />
          ) }
        </div>
      )) }

      <ul>
        Ingredients:

        { allIngredients && allIngredients.map((e, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {e}
          </li>
        )) }
      </ul>

      <div>
        <h4>Recommended Drinks</h4>

        { filteredDrinks && <CarouselDrinks filteredDrinks={ filteredDrinks } /> }
      </div>

      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => handleStartButton() }
        className="recipeDetailsButton"
      >
        {startButton ? ('Start Recipe') : ('Continue Recipe')}
      </button>

      <div>
        <button
          onClick={ shareRevenue }
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="shareIcon" />
        </button>

        {showCopied && <span>Link copied!</span>}
      </div>

      <div>
        { isFavorite === false ? (
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
        ) }
      </div>
    </div>
  );
}

MealRevenueDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealRevenueDetail;
