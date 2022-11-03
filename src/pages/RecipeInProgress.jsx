import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../style/recipeInProgress.css';

function RecipeInProgress() {
  // aux
  const { id } = useParams();
  const history = useHistory();
  const pageTitle = history.location.pathname.includes('drink') ? 'drinks' : 'meals';
  const acess = pageTitle === 'meals' ? 'Meal' : 'Drink';
  const nAcess = pageTitle === 'meals' ? 'Drink' : 'Meal';
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
          [acess]: {
            [id]: [],
          },
          [nAcess]: {},
        };
        return localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
      }
      if (progress[acess][id]) {
        return setCheckedList([...progress[acess][id]]);
      }
      progress[acess][id] = [];
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
  }, [id, pageTitle, url, acess, nAcess]);

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
      gettingLocal[acess][id] = checkedList.filter((e) => e !== usedIngredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify(gettingLocal));
    } else {
      setCheckedList([...checkedList, usedIngredient]);
      gettingLocal[acess][id] = [...checkedList, usedIngredient];
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
    <div>
      { recipe.length >= 1 && (
        <section>
          <h3 data-testid="recipe-title">{recipe[0][`str${acess}`]}</h3>
          <img
            src={ recipe[0][`str${acess}Thumb`] }
            alt="recipe-ph"
            data-testid="recipe-photo"
            width="300px"
          />
          <button type="button" data-testid="share-btn" onClick={ copyToClipBoard }>
            {copied ? (<p>Link copied!</p>) : (
              <img
                src={ shareIcon }
                alt="share"
              />
            )}

          </button>

          {favorito ? (
            <button
              type="button"
              onClick={ handleFavorite }
            >
              <img src={ blackHeartIcon } alt="coração" data-testid="favorite-btn" />
            </button>
          ) : (
            <button
              type="button"
              onClick={ handleFavorite }
            >
              <img src={ whiteHeartIcon } alt="coração" data-testid="favorite-btn" />
            </button>
          )}

          <h6 data-testid="recipe-category">{recipe[0].strCategory}</h6>
          <p data-testid="instructions">{recipe[0].strInstructions}</p>
        </section>
      )}
      <div>
        {ingredient.length > 0 && (
          ingredient.map((e, i) => (
            <label
              key={ i }
              data-testid={ `${i}-ingredient-step` }
              htmlFor={ `checkbox${i}` }
              className={ checkedList.includes(e[1])
                ? 'checkedInput' : 'nonCheckedInput' }
            >
              {e[1]}
              <input
                type="checkbox"
                id={ `checkbox${i}` }
                checked={ !!checkedList.includes(e[1]) }
                onChange={ () => handleCheck(e[1]) }
              />
            </label>
          ))
        )}
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ disabled }
        onClick={ handleFinish }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
