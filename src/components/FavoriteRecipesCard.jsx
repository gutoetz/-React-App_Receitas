import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesCard(infos) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(GlobalContext);
  const {
    index,
    recipes: {
      type,
      nationality,
      image,
      name,
      category,
      alcoholicOrNot,
      id,
    },
  } = infos;
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    setCopied(true);
  };

  const deleteFavorite = (favoriteId) => {
    const newList = favoriteRecipes
      .filter(({ id: filterID }) => filterID !== favoriteId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    setFavoriteRecipes(newList);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>

      <h6 data-testid={ `${index}-horizontal-top-text` }>{type}</h6>

      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}`}
      </p>

      { alcoholicOrNot && (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {alcoholicOrNot}
        </p>
      ) }

      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="ReceiptImg"
          data-testid={ `${index}-horizontal-image` }
          width="300px"
        />
      </Link>

      <img
        src={ blackHeartIcon }
        alt="Favorite Button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ () => deleteFavorite(id) }
        aria-hidden="true"
      />

      <img
        src={ shareIcon }
        alt="Share Button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyToClipBoard() }
        aria-hidden="true"
      />

      {copied && <p>Link copied!</p>}

    </div>
  );
}

export default FavoriteRecipesCard;
