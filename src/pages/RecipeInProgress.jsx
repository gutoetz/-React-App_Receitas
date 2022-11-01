import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const pageTitle = history.location.pathname.includes('drink') ? 'drinks' : 'meals';
  const acess = pageTitle === 'meals' ? 'Meal' : 'Drink';
  const url = pageTitle === 'meals' ? 'themealdb' : 'thecocktaildb';
  console.log(recipe);
  useEffect(() => {
    async function fetching() {
      const data = await fetch(`https://www.${url}.com/api/json/v1/1/lookup.php?i=${id}`);
      const jsonData = await data.json();
      setRecipe(jsonData[pageTitle]);
    }
    fetching();
  }, [id, pageTitle, url]);
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
          <button type="button" data-testid="share-btn">
            <img
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button type="button" data-testid="favorite-btn">Favorite Recipe</button>
          <h6 data-testid="recipe-category">{recipe[0].strCategory}</h6>
          <p data-testid="instructions">{recipe[0].strInstructions}</p>
          <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
        </section>
      )}

    </div>
  );
}

export default RecipeInProgress;
