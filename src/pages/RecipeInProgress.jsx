import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { CardMedia, Paper, Typography, Button, ButtonGroup } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckboxList from '../components/CheckboxList';

function RecipeInProgress() {
  // aux
  const { id } = useParams();
  const history = useHistory();
  const pageTitle = history.location.pathname.includes('drink') ? 'drinks' : 'meals';
  const acess = pageTitle === 'meals' ? 'Meal' : 'Drink';
  const nPageTitle = pageTitle === 'meals' ? 'drinks' : 'meals';
  const url = pageTitle === 'meals' ? 'themealdb' : 'thecocktaildb';

  // states
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [disabled, setDisabled] = useState(true);
  // didMount
  useEffect(() => {
    async function fetching() {
      const data = await fetch(`https://www.${url}.com/api/json/v1/1/lookup.php?i=${id}`);
      const jsonData = await data.json();
      setRecipe(jsonData[pageTitle]);
    }
    function gettingProgress() {
      const progress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
      if (progress === null || progress.length === 0) {
        const progressObject = {
          [pageTitle]: {
            [id]: [],
          },
          [nPageTitle]: {},
        };
        return localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
      }
      if (progress[pageTitle][id]) {
        return setCheckedList([...progress[pageTitle][id]]);
      }
      progress[pageTitle][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
    }
    const getfavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (getfavorites.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavorito(getfavorites.some((e) => e.id === id));
    }
    fetching();
    gettingProgress();
  }, [id, pageTitle, url, acess, nPageTitle]);

  // update
  useEffect(() => {
    if (recipe.length > 0) {
      const recipeIngredients = Object.entries(recipe[0]);
      const filteredRecipes = recipeIngredients
        .filter((e) => e[0].includes('strIngre'))
        .filter((e) => e[1] !== '' && e[1] !== null);
      setIngredient(filteredRecipes);
    }
  }, [recipe]);
  useEffect(() => {
    if (checkedList.length === ingredient.length) setDisabled(false);
    else { setDisabled(true); }
  }, [checkedList, ingredient]);

  // functions
  const handleCheck = (usedIngredient) => {
    const gettingLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (checkedList.includes(usedIngredient)) {
      setCheckedList(checkedList.filter((e) => e !== usedIngredient));
      gettingLocal[pageTitle][id] = checkedList.filter((e) => e !== usedIngredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(gettingLocal));
    } else {
      setCheckedList([...checkedList, usedIngredient]);
      gettingLocal[pageTitle][id] = [...checkedList, usedIngredient];
      localStorage.setItem('inProgressRecipes', JSON.stringify(gettingLocal));
    }
  };

  const handleFavorite = () => {
    const nationality = acess === 'Meal' ? recipe[0].strArea : '';
    const alcoholic = acess === 'Drink' ? recipe[0].strAlcoholic : '';
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorito(!favorito);
    const newFavorite = {
      id,
      type: acess.toLowerCase(),
      nationality,
      category: recipe[0].strCategory,
      alcoholicOrNot: alcoholic,
      name: recipe[0][`str${acess}`],
      image: recipe[0][`str${acess}Thumb`],
    };
    if (favorites.length === 0) {
      return localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
    if (favorites.some((e) => e.id === id)) {
      favorites = favorites
        .filter((el) => el.id !== id);
      return localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, newFavorite]));
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${pageTitle}/${id}`);
    setCopied(true);
  };

  const handleFinish = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const nationality = acess === 'Meal' ? recipe[0].strArea : '';
    const alcoholic = acess === 'Drink' ? recipe[0].strAlcoholic : '';
    const tags = acess === 'Meal' ? recipe[0].strTags.split(',') : [];
    const newRecipe = {
      id,
      nationality,
      name: recipe[0][`str${acess}`],
      category: recipe[0].strCategory,
      image: recipe[0][`str${acess}Thumb`],
      tags,
      alcoholicOrNot: alcoholic,
      type: acess.toLowerCase(),
      doneDate: new Date(),
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...getDone, newRecipe]));
    history.push('/done-recipes');
  };

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
      { recipe.length >= 1 && (
        <section>
          <Typography
            component="h4"
            variant="h4"
            data-testid="recipe-title"
          >
            {recipe[0][`str${acess}`]}
          </Typography>
          <Typography
            variant="h6"
            data-testid="recipe-category"
          >
            {recipe[0].strCategory}

          </Typography>
          <CardMedia
            component="img"
            height="140"
            image={ recipe[0][`str${acess}Thumb`] }
            alt="recipe-ph"
            data-testid="recipe-photo"
            fullWidth
            sx={ { my: 1 } }
          />
          <ButtonGroup
            size="large"
            orientation="horizontal"
            aria-label="horizontal contained button group"
            fullWidth
            color="primary"
            sx={ {
              mt: 2,
              maxWidth: 360,
            } }
          >
            <Button
              variant="contained"
              data-testid="favorite-btn"
              fullWidth
              onClick={ handleFavorite }
            >
              {favorito ? (
                <FavoriteIcon alt="coração" />
              ) : (
                <FavoriteBorderOutlinedIcon alt="coração" />
              )}
            </Button>
            <Button
              variant="contained"
              data-testid="share-btn"
              fullWidth
              onClick={ () => copyToClipBoard() }
            >
              {copied ? ('Link copied!') : (
                <ShareIcon alt="shareIcon" />
              )}
            </Button>
          </ButtonGroup>
          <Paper>
            <CheckboxList
              handleCheck={ handleCheck }
              checkedList={ checkedList }
              ingredient={ ingredient }
            />
          </Paper>
          <Paper
            elevation={ 1 }
            sx={ {
              p: 1,
              my: 2.5,
              textAlign: 'justify',
            } }
          >
            <Typography
              component="h5"
              variant="h6"
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
              {recipe[0].strInstructions}
            </Typography>
          </Paper>
        </section>
      )}
      <Button
        variant="contained"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ handleFinish }
        sx={ { mb: 2 } }
      >
        Finish Recipe
      </Button>
    </Paper>
  );
}

export default RecipeInProgress;
