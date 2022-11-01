import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchIDMeals from '../helper/useFetchIDMeals';
import useFetchRecommendDrinks from '../helper/useFetchRecommendDrinks';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CarouselCard from './Carousel';

const copy = require('clipboard-copy');

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

  useEffect(() => getIngredients(), [selectedRevenue]);
  useEffect(() => embedVideo(), [selectedRevenue]);
  useEffect(() => verifyFavorite(id), []);
  useEffect(() => showDrinks(), [drinks]);
  useEffect(() => getInprogress(), []);

  const embedVideo = () => {
    if (selectedRevenue.length > 0) {
      const url = selectedRevenue[0].strYoutube;
      const customURL = [url.slice(0, 23), '/embed', url.slice(23)].join('');
      setEmbedURL(customURL);
    }
  };

  const getInprogress = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const continueRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newData = Object.keys(continueRecipes.meals);
      const haveRecipe = newData.some((e) => e === id);
      setStartButton(!haveRecipe);
    }
  };

  const getIngredients = () => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object.entries(selectedRevenue[0]);
      const nullEntries = filterIngredients.filter((e) => e[0].includes('strIngredient')).filter((i) => i[1] !== null && i[1] !== '');
      const nullQuantity = filterIngredients.filter((e) => e[0].includes('strMeasure')).filter((i) => i[1] !== null && i[1] !== '');
      setAllIngredients(nullEntries.map((e, i) => `${e[1]}: ${nullQuantity[i][1]}`));
    }
  };

  const verifyFavorite = (id) => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveFavorite = allFavorites.some((e) => e.id === id);
      setIsFavorite(haveFavorite);
    }
  };

  const showDrinks = () => {
    const selectedDrinks = drinks.slice(null, 6);
    setFilteredDrinks(selectedDrinks);
  };

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

  function showFavorite(id) {
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
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
      {filteredDrinks && <CarouselCard filteredDrinks={ filteredDrinks } />}
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
          <button onClick={ () => showFavorite(id) }>
            <img src={ whiteHeartIcon } alt="White Heart Icon" data-testid="favorite-btn" />
          </button>
        ) : (
          <button onClick={ () => showFavorite(id) }>
            <img src={ blackHeartIcon } alt="Black Heart Icon" data-testid="favorite-btn" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MealRevenueDetail;
