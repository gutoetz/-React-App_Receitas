import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useFetchIdDrinks from '../helper/useFetchIdDrinks';
// import useFetchRecommendMeals from '../helper/useFetchRecommendMeals';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CarouselMeals from './CarouselMeals';

const copy = require('clipboard-copy');

function DrinkRevenueDetail({ id }) {
  const [selectedRevenue, setSelectedRevenue] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  // const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [showCopied, setShowCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useHistory();

  useFetchIdDrinks(id, setSelectedRevenue);
  console.log(selectedRevenue);

  useFetchRecommendMeals(setMeals);

  const getIngredients = useCallback(() => {
    if (selectedRevenue.length > 0) {
      const filterIngredients = Object.values(selectedRevenue[0]);
      const SEVENTEEN = 17;
      const THIRTY_ONE = 31;
      const arrayIngredients = [];
      for (let index = SEVENTEEN; index <= THIRTY_ONE; index += 1) {
        arrayIngredients.push(filterIngredients[index]);
      }
      setAllIngredients(arrayIngredients.filter((e) => e));
      setIngredient(allIngredients);
    }
  }, [selectedRevenue, allIngredients]);

  useEffect(() => getIngredients(), [getIngredients]);

  const getQuantity = useCallback(() => {
    if (selectedRevenue.length > 0) {
      const filterQuantity = Object.values(selectedRevenue[0]);
      const THIRTY_TWO = 32;
      const FORTY_SIX = 46;
      const arrayQuantity = [];
      for (let index = THIRTY_TWO; index <= FORTY_SIX; index += 1) {
        arrayQuantity.push(filterQuantity[index]);
      }
      const allQuantity = arrayQuantity.filter((e) => e);
      setQuantity(allQuantity);
    }
  }, [selectedRevenue]);

  useEffect(() => getQuantity(), [getQuantity]);

  const showIngredients = useCallback(() => {
    setAllIngredients(ingredient.map((e, i) => `${e}: ${quantity[i]}`));
  }, [ingredient, quantity]);

  useEffect(() => showIngredients(), [showIngredients]);

  const verifyFavorite = useCallback(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const haveFavorite = allFavorites.some((e) => e.id === id);
      setIsFavorite(haveFavorite);
    }
  }, [id]);

  useEffect(() => verifyFavorite(), [verifyFavorite]);

  const showMeals = useCallback(() => {
    const SIX = 6;
    const selectedMeals = meals.slice(null, SIX);
    setFilteredMeals(selectedMeals);
  }, []);

  useEffect(() => showMeals(), [showMeals]);

  useEffect(() => showMeals(), [meals]);

  function redirectStart() {
    history.push(`/drinks/${id}/in-progress`);
  }

  function shareRevenue() {
    const copyUrl = `http://localhost:3000/drinks/${id}`;
    copy(copyUrl);
    setShowCopied(true);
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

DrinkRevenueDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinkRevenueDetail;
