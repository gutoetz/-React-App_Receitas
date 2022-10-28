import React from 'react';
import { Link } from 'react-router-dom';

function RecipesCard(infos) {
  const { cardInfo, type, name, index, idRoute, title } = infos;

  return (
    <Link to={ `/${title}/${cardInfo[idRoute]}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <h4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</h4>
        <img
          src={ cardInfo[type] }
          alt="ReceiptImg"
          data-testid={ `${index}-card-img` }
        />
      </div>
    </Link>

  );
}

export default RecipesCard;
