import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import useFetchIDMeals from '../helper/useFetchIDMeals';
import useFetchRecommendDrinks from '../helper/useFetchRecommendDrinks';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CarouselMeals from './CarouselMeals';

const copy = require('clipboard-copy');

function MealRevenueDetail({ id }) {
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [showCopied, setShowCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [embedURL, setEmbedURL] = useState('');
  // const [startButton, setStartButton] = useState('Start Recipe');

  const history = useHistory();

  useFetchIDMeals(id, setSelectedRevenue);
  useFetchRecommendDrinks(setDrinks);

  const embedVideo = useCallback(() => {
    const indexForSliceUrl = 23;
    if (selectedRevenue.length > 0) {
      const url = selectedRevenue[0].strYoutube;
      const customURL = [
        url.slice(0, indexForSliceUrl),
        '/embed', url.slice(indexForSliceUrl),
      ].join('');
      setEmbedURL(customURL);
    }
  }, [selectedRevenue]);

  useEffect(() => embedVideo(), [embedVideo]);

  const getIngredients = useCallback(() => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object.values(selectedRevenue[0]);
      const TWENTY_EIGHT = 28;
      const NINE = 9;
      const arrayIngredients = [];
      for (let index = NINE; index <= TWENTY_EIGHT; index += 1) {
        arrayIngredients.push(filterIngredients[index]);
      }
      setAllIngredients(arrayIngredients.filter((e) => e));
      setIngredient(allIngredients);
    }
  }, [allIngredients, selectedRevenue]);

  useEffect(() => getIngredients(), [getIngredients]);

  const getQuantity = useCallback(() => {
    if (selectedRevenue.length > 0) {
      const filterQuantity = Object.values(selectedRevenue[0]);
      const arrayQuantity = [];
      const FORTY_EIGHT = 48;
      const TWENTY_NINE = 29;
      for (let index = TWENTY_NINE; index <= FORTY_EIGHT; index += 1) {
        arrayQuantity.push(filterQuantity[index]);
      }
      const allQuantity = arrayQuantity.filter((e) => e);
      setQuantity(allQuantity);
    }
  }, [selectedRevenue]);

  useEffect(() => getQuantity(), [getQuantity]);

  const showIngredients = useCallback(() => {
    setAllIngredients(ingredient.map((e, i) => `${e}: ${quantity[i]}`));
  }, []);

  useEffect(() => showIngredients(), [showIngredients]);

  const verifyFavorite = useCallback(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveFavorite = allFavorites.some((e) => e.id === id);
      setIsFavorite(haveFavorite);
    }
  }, [id]);

  useEffect(() => verifyFavorite(), [verifyFavorite]);

  const showDrinks = useCallback(() => {
    const SIX = 6;
    const selectedDrinks = drinks.slice(null, SIX);
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
      {selectedRevenue
        && selectedRevenue.map((revenue) => (
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
            {revenue.strYoutube && (
              <iframe
                width="560"
                height="315"
                src={ embedURL }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write;
                  encrypted-media; gyroscope; picture-in-picture"
                data-testid="video"
                allowFullScreen
              />
            )}
          </div>
        ))}
      <li>Ingredients:</li>
      {allIngredients
        && allIngredients.map((e, index) => (
          <ul key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {e}
          </ul>
        ))}
      <h4>Recommended Drinks</h4>
      {filteredDrinks && <CarouselMeals filteredDrinks={ filteredDrinks } />}
      <button
        data-testid="start-recipe-btn"
        type="button"
        onClick={ () => redirectStart() }
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
          <button
            type="button"
            onClick={ () => showFavorite() }
            data-testid="favorite-btn"
          >
            <img src={ whiteHeartIcon } alt="White Heart Icon" />
          </button>
        ) : (
          <button
            type="button"
            onClick={ () => showFavorite() }
            data-testid="favorite-btn"
          >
            <img src={ blackHeartIcon } alt="Black Heart Icon" />
          </button>
        )}
      </div>
    </div>
  );
}

MealRevenueDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealRevenueDetail;
