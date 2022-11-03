import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <section>
      <h1 data-testid="recipe-category">{recipe.category}</h1>

      <h2 data-testid="recipe-title">{recipe.name}</h2>

      <img src={ recipe.image } alt={ recipe.name } data-testid="recipe-photo" />

      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '5px',
        } }
      >
        <img
          src={ shareIcon }
          alt="Share"
          data-testid="share-btn"
          onClick={ () => {} }
          aria-hidden="true"
        />

        <img
          src={ whiteHeartIcon }
          alt="Favorite"
          data-testid="favorite-btn"
          onClick={ () => {} }
          aria-hidden="true"
        />
      </div>

      <p data-testid="instructions">
        {recipe.instructions}
      </p>
    </section>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
