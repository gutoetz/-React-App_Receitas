/* eslint-disable max-lines */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, ButtonGroup, CardMedia, Paper, Typography } from '@mui/material';
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
        [selectedRevenue[0].idMeal]: [],
      },
    };
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      const progressRevenues = JSON.parse(localStorage.getItem('inProgressRecipes'));
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
    <Paper
      sx={ {
        mb: 0.5,
        mx: 'auto',
        maxWidth: 360,
        textAlign: 'center',
        p: 0.5,
        backgroundColor: '#870000',
        opacity: 100,
      } }
    >
      { selectedRevenue && selectedRevenue.map((revenue) => (
        <Box key={ revenue.strMeal } flexDirection="column" alignSelf="space-evenly">
          <Typography component="h3" variant="h3" data-testid="recipe-title">
            {revenue.strMeal}
          </Typography>

          <Typography component="h4" variant="h4" data-testid="recipe-ticategorytle">
            {revenue.strCategory}
          </Typography>

          <CardMedia
            component="img"
            height="140"
            image={ revenue.strMealThumb }
            alt={ revenue.strMeal }
            data-testid="recipe-photo"
            fullWidth
            sx={ { my: 1 } }
          />

          <Paper
            elevation={ 24 }
            variant="outlined"
            sx={ { mx: 1,
              px: 0.5,
              my: 2,
              textAlign: 'justify',
              backgroundColor: '#fbe9e7',
            } }
          >
            <Typography
              component="h5"
              variant="h5"
              data-testid="recipe-ticategorytle"
              sx={ { mt: 1.5, mb: 1, textAlign: 'center' } }
            >
              Instructions
            </Typography>

            <Typography
              variant="body1"
              gutterBottom
              data-testid="instructions"
            >
              {revenue.strInstructions}
            </Typography>
          </Paper>

          { revenue.strYoutube && (
            <iframe
              src={ embedURL }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; yroscope; picture-in-picture"
              data-testid="video"
              allowFullScreen
            />
          ) }
        </Box>
      )) }

      <ul style={ { listStyleType: 'none' } }>
        <Typography
          component="h5"
          variant="h5"
          data-testid="recipe-ticategorytle"
          sx={ { mt: 1.5, mb: 1 } }
        >
          Ingredients
        </Typography>

        { allIngredients && allIngredients.map((e, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {e}
          </li>
        )) }
      </ul>

      <div>
        <Typography
          component="h5"
          variant="h5"
          data-testid="recipe-ticategorytle"
          sx={ { mt: 1.5, mb: 1 } }
        >
          Recommended Drinks
        </Typography>

        { filteredDrinks && <CarouselDrinks filteredDrinks={ filteredDrinks } /> }
      </div>

      <ButtonGroup
        size="large"
        orientation="vertical"
        aria-label="vertical contained button group"
        fullWidth
        color="secondary"
        sx={ {
          mt: 2,
          maxWidth: 360,
        } }
      >
        <Button
          variant="contained"
          data-testid="start-recipe-btn"
          onClick={ () => handleStartButton() }
          className="recipeDetailsButton"
        >
          {startButton ? ('Start Recipe') : ('Continue Recipe')}
        </Button>

        { isFavorite === false ? (
          <Button
            variant="contained"
            onClick={ () => showFavorite() }
          >
            <img
              src={ whiteHeartIcon }
              alt="White Heart Icon"
              data-testid="favorite-btn"
            />
          </Button>
        ) : (
          <Button
            onClick={ () => showFavorite() }
            variant="contained"
          >
            <img
              src={ blackHeartIcon }
              alt="Black Heart Icon"
              data-testid="favorite-btn"
            />
          </Button>
        ) }
        <Button
          variant="contained"
          data-testid="share-btn"
          fullWidth
          onClick={ () => shareRevenue() }
        >
          <img src={ shareIcon } alt="shareIcon" />
        </Button>

        {showCopied && <span>Link copied!</span>}
      </ButtonGroup>
    </Paper>
  );
}

MealRevenueDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default MealRevenueDetail;
