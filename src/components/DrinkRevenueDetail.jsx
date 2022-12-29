import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, ButtonGroup, CardMedia, Paper, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import useFetchIdDrinks from '../helper/useFetchIdDrinks';
import useFetchRecommendMeals from '../helper/useFetchRecommendMeals';
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

  const getInprogress = useCallback(() => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const continueRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newData = Object.keys(continueRecipes.drinks);
      const haveRecipe = newData.some((e) => e === id);
      setStartButton(!haveRecipe);
    }
  }, [id]);

  useEffect(() => getInprogress(), [getInprogress]);

  const getIngredients = useCallback(() => {
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

  const showMeals = useCallback(() => {
    const selectedMeals = meals.slice(null, NUMBER_SIX);
    setFilteredMeals(selectedMeals);
  }, [meals]);

  useEffect(() => showMeals(), [showMeals]);

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
        [selectedRevenue[0].idDrink]: [],
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
    <Paper
      sx={ {
        mb: 0.5,
        mx: 'auto',
        maxWidth: 360,
        textAlign: 'center',
        p: 0.5,
        opacity: 100,
      } }
    >
      { selectedRevenue && selectedRevenue.map((revenue) => (
        <Box key={ revenue.strDrink } flexDirection="column" alignSelf="space-evenly">
          <Typography component="h3" variant="h4" data-testid="recipe-title">
            {revenue.strDrink}
          </Typography>

          <Typography
            data-testid="recipe-category"
            component="h4"
            variant="h6"
          >
            {revenue.strAlcoholic}
          </Typography>

          <CardMedia
            component="img"
            height="140"
            image={ revenue.strDrinkThumb }
            alt="Selected Revenue"
            data-testid="recipe-photo"
            fullWidth
            sx={ { my: 1 } }
          />
          <Paper
            elevation={ 1 }
            sx={ {
              p: 1,
              my: 2.5,
              textAlign: 'justify',
            } }
          >
            <Typography
              variant="body1"
              gutterBottom
              data-testid="instructions"
            >
              {revenue.strInstructions}
            </Typography>
          </Paper>
        </Box>
      )) }
      <Paper
        elevation={ 1 }
        sx={ {
          p: 1,
          my: 2.5,
          textAlign: 'center',
        } }
      >
        {' '}
        <Typography
          component="h5"
          variant="h6"
          data-testid="recipe-ticategorytle"
          sx={ { mt: 1.5, mb: 1 } }
        >
          Ingredients
        </Typography>
        <List
          sx={ {
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
            mb: 3.5,
          } }
        >
          { allIngredients && allIngredients.map((ingredient, index) => (
            <ListItem
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <ListItemText primary={ ingredient } />
            </ListItem>
          ))}
        </List>
      </Paper>

      <div>
        <Typography
          component="h5"
          variant="h6"
          data-testid="recipe-ticategorytle"
          sx={ { mt: 1.5, mb: 1 } }
        >
          Recommended Meals
        </Typography>
        { filteredMeals && <CarouselMeals filteredMeals={ filteredMeals } /> }
      </div>
      <ButtonGroup
        size="large"
        orientation="vertical"
        aria-label="vertical contained button group"
        fullWidth
        color="primary"
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
            <FavoriteBorderOutlinedIcon
              alt="White Heart Icon"
              data-testid="favorite-btn"
            />
          </Button>
        ) : (
          <Button
            onClick={ () => showFavorite() }
            variant="contained"
          >
            <FavoriteIcon
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
          {showCopied ? (
            'Link copied!'
          ) : (
            <ShareIcon alt="shareIcon" />
          )}
        </Button>

      </ButtonGroup>
    </Paper>
  );
}

DrinkRevenueDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DrinkRevenueDetail;
